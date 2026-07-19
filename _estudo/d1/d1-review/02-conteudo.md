---
layout: dossie
titulo: "Domain 1 Review: Criação de arquiteturas seguras"
dominio: d1
aula: d1-review
tipo: review
fonte: "Skill Builder — Domain 1 Review (SAA-C03 PT-BR)"
processado: 2026-07-19
cards: 53
artefato: 02-conteudo
secao: Conteúdo de estudo
ordem: 2
---

> **Tipo: Review** — a aula define escopo, não ensina. Este arquivo é enxuto por isso.
> As respostas que a aula deixou em aberto foram completadas pela documentação AWS e estão
> marcadas com `[doc]`; a fonte de cada uma está no fim.

## Contexto

A AWS recomenda segurança em **cada estágio, nível e camada** da arquitetura, não só nas
questões marcadas como "de segurança". No exame isso vira regra de desempate: **quando duas
alternativas atendem ao requisito funcional, a mais segura é a correta.**

Três declarações de tarefa: **1.1** acesso seguro aos recursos · **1.2** cargas e aplicações
seguras · **1.3** controles de segurança de dados.

---

## 1.1 — Acesso seguro aos recursos

### Conta e usuário raiz
- Toda conta nasce com **um usuário raiz de permissões totais que NÃO podem ser alteradas**.
  Não existe "limitar o root" — comprometê-lo compromete todo o ambiente, sem contenção.
- Mitigações: **MFA** no raiz e **não usá-lo no dia a dia**, criando identidades IAM limitadas.
- **Gancho:** "seguindo as práticas recomendadas" + operação rotineira → alternativa que usa o
  raiz está errada por definição.

### Níveis de resiliência (armadilha recorrente)
| IAM | VPC | Subnet |
|---|---|---|
| **Global** | **Regional** | **Zonal (AZ)** |

### Identidades
- **Usuários, grupos e roles nascem sem nenhuma permissão** — *deny by default*.
- **Menor privilégio:** seu efeito declarado é **limitar o alcance do impacto** de um
  incidente. Credencial vazada com escopo estreito compromete pouco.

### Políticas
| | **Identidade** | **Recurso** |
|---|---|---|
| Anexada a | usuário, grupo, role | bucket S3, fila SQS, endpoint VPC, chave KMS |
| Responde | *quais recursos* eu acesso | *quem* acessa este recurso |
| `Principal` | **ausente** | **presente** — é o diferenciador estrutural |

Nível exigido: **ler e interpretar** políticas, não escrever avançadas.

O encerramento cobra a distinção entre **quatro** tipos. `[doc]` A AWS documenta nove ao
todo, mas estes são os que o exame usa:

| Tipo | Anexada a | Papel |
|---|---|---|
| **Identidade** | usuário, grupo, role | **concede** o que a identidade pode fazer |
| **Recurso** | o recurso (bucket, fila, chave) | **concede** e define **quem** acessa — tem `Principal` |
| **Permissions boundary** | usuário ou role | **teto** do que a política de identidade pode conceder — não concede nada |
| **SCP** | conta ou OU na organização | **teto** da conta inteira — não concede nada |

**A divisão que importa:** identidade e recurso **concedem**; boundary e SCP apenas
**limitam**. Alternativa que diz "use uma SCP para dar acesso ao time X" está errada por
construção.

`[doc]` Na mesma conta, identidade e recurso se **somam** (união): basta uma das duas
permitir. Já boundary e SCP se **intersectam**: precisam permitir junto com a de identidade.

**[doc] Lógica de avaliação, na ordem:**
1. **Negação implícita** — tudo é negado por padrão.
2. **Negação explícita em qualquer política vence tudo.** Nenhum `Allow` a reverte.
3. Sem deny explícito, basta **um** `Allow` aplicável.
4. Com **SCP**, o resultado é a **interseção**: a ação precisa ser permitida pela política de
   identidade **e** pela SCP. **SCP nunca concede permissão — só limita o teto.**
5. **Permissions boundary** também é interseção com a política de identidade.

### Credenciais e federação
- **Hardcode de credenciais: nunca.** Usar roles, inclusive atribuídas a serviços AWS.
- **STS** emite credenciais temporárias — dentro da conta, entre contas e em federação.
  **[doc]** `AssumeRole` até **12 h**; `GetSessionToken` até **36 h** (1 h para o raiz).
- **Federação:** usuários com identidade no diretório corporativo ou IdP de terceiros recebem
  permissões via **role do IAM**. Cobra-se configurar **Active Directory** para federar.
- **Gancho:** "usuários já existem no diretório corporativo" → role + federação + STS.
  Criar usuários IAM permanentes é a alternativa errada.

**Role vs. usuário do IAM** — pergunta direta do encerramento. `[doc]`

| | **Role** | **Usuário** |
|---|---|---|
| Credencial | **temporária**, expira sozinha | **longo prazo** (senha, access key) |
| Vinculada a | ninguém — é **assumível** por quem precisar | uma pessoa específica |
| Revogação | automática ao expirar | manual |

A recomendação da AWS é categórica: **pessoas devem assumir role via federação**; usuário IAM
fica reservado a **cargas que não conseguem usar role**. No exame, se a alternativa cria
usuário IAM para gente ou para serviço da AWS, está errada.

**AWS Directory Service** — a aula pede os casos de uso. `[doc]`

| Opção | Quando |
|---|---|
| **AWS Managed Microsoft AD** | AD de verdade na AWS: cargas Windows, RDS for SQL Server, FSx, relação de confiança com o AD on-premises, **mais de 5.000 usuários** |
| **AD Connector** | **proxy** para o AD on-premises existente — **não guarda nada na nuvem**; você segue administrando o AD onde ele está |
| **Simple AD** | compatibilidade básica, **até 5.000 usuários**, baixo custo |

⚠️ **Simple AD deixa de aceitar novos clientes em 30/07/2026** `[doc]` — dias após esta
data de estudo. Continua no escopo do exame, mas não é escolha para projeto novo.

**Discriminador:** "manter a administração do AD on-premises, sem replicar nada para a
nuvem" → **AD Connector**. "Preciso de trust com o domínio on-premises" → **Managed
Microsoft AD**.

### Governança multi-conta
O encerramento pergunta qual serviço aplica menor privilégio em ambiente multi-conta,
oferecendo três candidatos. Os três atuam, em camadas diferentes:

| Serviço | O que faz pelo menor privilégio | Concede permissão? |
|---|---|---|
| **Organizations** + **SCP** | define o **teto** de permissões das contas | **Não** — só limita |
| **Control Tower** | provisiona a landing zone com **guardrails** já aplicados `[doc]` | Não — automatiza a governança |
| **Service Catalog** | publica **produtos aprovados**; o **launch role** provisiona os recursos, de modo que o usuário final **não precisa de permissão sobre eles** `[doc]` | Indiretamente, via launch role |

**A resposta canônica para "limitar permissões em multi-conta" é Organizations com SCP** —
é o único que impõe um teto que a conta-membro não contorna. Service Catalog resolve outro
problema: deixar o time provisionar infraestrutura **sem** conceder as permissões
subjacentes. Se o enunciado falar em *provisionar recursos padronizados sem dar acesso
amplo*, é Service Catalog.

### Rastreabilidade e monitoramento
**Rastreabilidade** = monitorar, alertar e auditar ações e alterações **em tempo real**, com
coleta de registros e métricas integrada a sistemas que investigam e agem automaticamente.

Os três nomeados na aula, e o que cada um responde:

| Serviço | Responde |
|---|---|
| **AWS CloudTrail** | *quem chamou qual API, quando* — auditoria de chamadas |
| **Amazon CloudWatch** | *como está se comportando* — métricas, logs e alarmes |
| **VPC Flow Logs** | *que tráfego entrou e saiu* — nas ENIs da VPC |

O instrutor pede explicitamente que você conheça **outros além desses três**. `[doc]` Os que
mais aparecem no exame: **AWS Config** (conformidade da *configuração* dos recursos e seu
histórico), **GuardDuty** (detecção de ameaças), **Security Hub** (agregação de achados),
**IAM Access Analyzer** (acesso externo indevido), **Inspector** (vulnerabilidades),
**Detective** (investigação) e **Macie** (dados sigilosos).

**Discriminador que cai:** CloudTrail registra a **chamada**; Config registra o **estado** do
recurso e como ele mudou. "Quem alterou o security group?" → CloudTrail. "Este bucket já
esteve público em algum momento?" → Config.

**Gancho:** "impor padrão que o admin da conta-membro não contorne" → SCP.

---

## 1.2 — Cargas e aplicações seguras

### VPC padrão vs. personalizada
**[doc]** A diferença que o exame cobra está na **NACL**:

| | Default VPC | VPC personalizada |
|---|---|---|
| **NACL** | regra 100 **ALLOW all** — permite tudo | só a regra `*` **DENY** — **nega tudo** até você criar regras |
| **Security group padrão** | permite tráfego entre membros do próprio SG; nega o resto | idem |

A regra `*` DENY existe em ambas e **não pode ser removida**.

### Filtros de rede
| | **Security Group** | **Network ACL** |
|---|---|---|
| Nível | instância / ENI | subnet |
| Estado | **Stateful** — retorno liberado automaticamente | **Stateless** — exige regra de retorno explícita |
| Regras | **só permitir** | permitir **e negar** |
| Avaliação | todas as regras | **ordem numérica, 1–32766, para na primeira correspondência** |

**[doc]** Como a NACL é stateless, o tráfego de retorno precisa de regra para as **portas
efêmeras** — 1024-65535 cobre os casos comuns.

### Segmentação
- **Subnet** é onde os recursos rodam; acrescenta estrutura à VPC.
- **[doc]** O que torna uma subnet **pública** é ter **rota para um Internet Gateway** na
  tabela de rotas — não é propriedade da subnet.
- Componentes a dominar **em conjunto**: security groups, NACLs, tabelas de rota, NAT gateways.

### Conectividade privada
| Opção | Uso | Armadilha |
|---|---|---|
| **VPC Endpoint** | alcançar serviço AWS **sem IGW nem NAT** | tráfego não sai para a internet |
| **PrivateLink** | expor **um serviço** a dezenas/centenas de VPCs | — |
| **VPC Peering** | integração entre poucas VPCs | **sobrecarga de gerenciamento** ao escalar e **expõe as demais apps** da VPC |
| **Transit Gateway** | hub-and-spoke para muitas VPCs | — |

**Cenário-tipo da aula:** tráfego vem de on-premises por VPN até servidores em subnet privada,
que devem seguir protegidos da internet pública — a configuração precisa liberar o fluxo nos
níveis de **VPC, subnet e instância** sem abrir caminho para a internet. Requisito de
conectividade e de isolamento chegam sempre juntos.

### Direct Connect vs. Site-to-Site VPN vs. Client VPN
**[doc]**

| | **Site-to-Site VPN** | **Direct Connect** | **Client VPN** |
|---|---|---|---|
| Meio | internet pública, IPsec | **circuito físico dedicado** | internet, usuário final |
| Banda | **1,25 Gbps** por túnel (opção de 5 Gbps) | **1, 10 ou 100 Gbps** dedicado; hosted de 50 Mbps a 10 Gbps | — |
| Latência | variável (depende da internet) | **consistente**, sub-10 ms | — |
| Provisionamento | minutos | semanas (circuito físico) | minutos |
| Redundância | **2 túneis** por conexão | exige segunda conexão | — |
| Escolha quando | subir rápido, baixo custo, backup | banda alta, latência consistente, exigência regulatória de circuito privado | acesso remoto de **indivíduos** |

Padrão recomendado: **Direct Connect + VPN como backup** — dedicado com fallback criptografado.

### Proteção de aplicação
| Serviço | Trata | Escopo |
|---|---|---|
| **WAF** | camada 7 — **injeção SQL**, XSS | **só ALB, API Gateway e CloudFront** |
| **Shield** | **DDoS** (camadas 3/4) | recursos de borda |
| **GuardDuty** | **atividade** maliciosa na conta | — |
| **Macie** | **dados** — descobre e classifica **PII no S3** com ML | **S3** |

**[doc] Shield Standard vs. Advanced:**

| | Standard | Advanced |
|---|---|---|
| Custo | **grátis**, automático para todos | **US$ 3.000/mês** por organização + transferência, **compromisso de 1 ano** |
| Cobre | ataques comuns de camada 3/4 (SYN/UDP flood, reflexão) | EC2, ELB, CloudFront, Global Accelerator, Route 53 |
| Extras | — | monitoramento contínuo do tráfego, visibilidade quase em tempo real, integração com WAF, **DDoS cost protection** (créditos pelo custo do escalonamento durante ataque), **acesso 24/7 ao Shield Response Team** (planos Business/Enterprise) |

**Gancho:** "proteção contra o custo do escalonamento durante um DDoS" ou "acesso à equipe de
resposta" → só **Advanced** entrega isso.

**PII** = nome, endereço, e-mail, CPF, carteira de motorista, passaporte, data de nascimento,
conta bancária, cartão de crédito.

**Cognito:** **user pool** autentica (diretório da aplicação); **identity pool** entrega
**credenciais AWS temporárias** via STS. A aula avisa que haverá questões de cenário.

**Secrets Manager vs. Parameter Store:** o Secrets Manager **força a alternância dos segredos
em intervalo determinado de dias**. **A palavra "rotação" no enunciado decide a questão.**
Sem rotação e com pressão de custo → Parameter Store.

---

## 1.3 — Controles de segurança de dados

### Criptografia — os dois tipos
| | **Em repouso** | **Em trânsito** |
|---|---|---|
| Protege contra | acesso não autorizado e **roubo** | interceptação na transferência |
| Partes envolvidas | geralmente **uma** | **duas ou mais** |

### Vocabulário
**Texto simples** — dado **não criptografado**; *nem sempre é texto* (pode ser imagem,
documento, aplicação). **Algoritmo** — recebe texto simples **e chave**, produz o cifrado.
**Chave** — essencialmente uma senha. **Texto cifrado** — a saída.

**[doc] Simétrica vs. assimétrica:**

| | Simétrica | Assimétrica |
|---|---|---|
| Chaves | **uma só** cifra e decifra | **par** pública/privada |
| Velocidade | rápida | lenta |
| Uso | volume de dados | troca de chaves, assinatura digital |
| **Rotação automática no KMS** | **sim** | **não** |

### KMS vs. CloudHSM
**[doc]**

| | **KMS** | **CloudHSM** |
|---|---|---|
| Tenancy | **multi-tenant** gerenciado | **single-tenant dedicado** |
| Integração com serviços AWS | ampla e nativa | limitada |
| Custo e operação | menor, gerenciado | maior, hardware dedicado |
| Interfaces | API AWS | **PKCS #11, JCE**, algoritmos especializados |
| **Escolha quando** | caso geral — é o padrão do exame | exigirem HSM **sob seu controle**, PKCS#11/JCE, ou cripto especializada |

**Usar os dois juntos:** o CloudHSM pode servir de **custom key store** do KMS — as chaves são
geradas no seu cluster e **nunca saem dos HSMs em texto claro**, mas você mantém a integração
do KMS.

`[doc]` **Nuance atual:** o argumento clássico "CloudHSM porque preciso de FIPS 140-2 Nível 3"
**caducou** — o KMS já é **FIPS 140-3 Nível 3**. O SAA-C03 pode ainda testar o enquadramento
antigo; hoje o discriminador honesto é **single-tenancy sob controle do cliente** e
**PKCS#11/JCE**, não o FIPS.

**[doc] Rotação de chaves no KMS:** automática a cada **365 dias** por padrão, configurável
entre **90 e 2560 dias**. **Só para chaves simétricas** — assimétricas, HMAC, material
importado e custom key store exigem **rotação manual**. Chaves gerenciadas pela AWS rotacionam
anualmente.

### ACM
Criptografia **em trânsito**. **[doc] Renovação gerenciada:** o ACM renova automaticamente
**60 dias antes do vencimento**, sob duas condições — o certificado precisa estar **em uso por
um serviço AWS** e, na validação por DNS, os **registros CNAME fornecidos pelo ACM devem
permanecer publicados**. Removeu o CNAME, a renovação falha. Alertas em 30, 15, 7, 3 e 1 dia.

### Criptografia no S3
**Client-side** — cifra **antes de os dados chegarem ao S3**; você controla tudo.
**Server-side** — trafega por **HTTPS** e o próprio S3 cifra na chegada:

| **SSE-C** | **SSE-S3** | **SSE-KMS** |
|---|---|---|
| chave **fornecida pelo cliente** | chave **gerenciada pelo S3** | chave do **KMS** |

**Gancho:** "auditar cada uso da chave" ou "controlar a política da chave" → **SSE-KMS**.
"Sem gerenciar nada" → SSE-S3.

### Conformidade
Segurança e conformidade são **responsabilidade compartilhada**.
**AWS Artifact** — portal de **autoatendimento** para baixar documentação de conformidade e
acordos sob demanda. **Gancho:** "o auditor pediu o relatório SOC/PCI". Não é operacional.

**CAF, perspectiva de segurança — 5 capacidades:** IAM · controles de detecção · segurança de
infraestrutura · proteção de dados · resposta a incidentes.

**Três passos:** (1) saber quais dados existem, como são armazenados e **quem tem acesso**;
(2) **classificar** — "nem todos os dados são criados da mesma forma"; (3) **defesa em
profundidade** — sobrepor controles **preventivos** e **de detecção**.

### Cenários resolvidos na aula
- Dados gerados em instância com volume EBS, preservando durabilidade → **volume EBS
  criptografado**, por ser o **menor esforço**. O critério "menor esforço operacional" é
  recorrente e costuma eliminar a alternativa que move dados entre serviços.
- **Lifecycle vs. Intelligent-Tiering:** Lifecycle quando o padrão de acesso é **previsível**
  (regra por idade); Intelligent-Tiering quando é **imprevisível** — move automaticamente,
  cobrando taxa de monitoramento.
- Granularidade: o S3 permite controlar segurança **por caminho ou objeto**, não só por bucket.

⚠️ **Criptografia e desempenho:** a aula manda estudar quais serviços sofrem impacto (cita RDS
+ KMS e leitura do S3) mas **não fornece nenhum valor**. Sem número confiável para memorizar.

### Armazenamento e DR
**Armazenamento na nuvem** — provedor **gerencia e opera** o armazenamento como serviço.
Benefícios: sem hardware, sem provisionamento, **sem despesa de capital**; implantação rápida;
ciclo de vida automatizado com **bloqueio de dados para conformidade**.

**5 requisitos:** durabilidade, disponibilidade, segurança, regulamentação/governança,
funcionais. **3 tipos de dados:** objeto, arquivo, bloco.
**5 usos:** backup e recuperação · teste e desenvolvimento · migração · conformidade · big
data e data lakes.

**As 4 estratégias de DR**, em ordem de custo e complexidade:
**Backup & Restore → Pilot Light → Warm Standby → Multi-Site Active/Active.**
As três primeiras são **ativo/passivo**: o ambiente passivo **não atende tráfego até um evento
de failover**.

**Critério de escolha, conforme a definição de desastre:**
- Perda de **um data center físico**, carga já bem arquitetada e altamente disponível →
  **Backup & Restore basta**.
- Perda de uma **Região inteira** **ou** exigência regulatória → Pilot Light, Warm Standby ou
  Multi-Site.

**RPO:** a **frequência do backup** determina o ponto de recuperação alcançável. O backup
também precisa permitir restaurar ao ponto no tempo em que foi feito.
⚠️ RTO não é mencionado na aula.

**Mecanismos nativos:** snapshot em EBS, RDS, Aurora, Redshift, Neptune · backup em DynamoDB e
DocumentDB · EFS via AWS Backup. **O S3 é a exceção: usa Cross-Region Replication (CRR)** —
cópia **assíncrona e contínua** para a Região de DR.

**AWS Backup** centraliza configuração, agendamento e monitoramento: EBS, EC2, RDS/Aurora,
DynamoDB, EFS, Storage Gateway, FSx (Windows e Lustre), **com cópia entre Regiões**.
**Gancho:** "backup centralizado de vários serviços" → AWS Backup, não a soma dos nativos.

**Ambientes híbridos** → **AWS Storage Gateway**.

---

## Encerramento: o checklist do instrutor

O módulo de fechamento não traz conteúdo novo — traz a **lista do que você precisa saber
antes de ir para o Domínio 2**. Trate como autoavaliação: se não responde de cabeça, volte
à seção correspondente.

1. Que serviços aplicam menor privilégio em ambiente **multi-conta**? → Organizations/SCP,
   Control Tower, Service Catalog — cada um em sua camada.
2. Quando usar **role** e quando usar **usuário** do IAM?
3. Diferença entre política de **identidade**, de **recurso**, **permissions boundary** e
   **SCP** — quais concedem e quais só limitam.
4. Como as políticas são avaliadas quando há **allow e deny sobrepostos**?
5. Quais as formas de **federar** na AWS; casos de uso do **AWS SSO** e do
   **AWS Directory Service**.
6. Que serviços de **monitoramento** existem **além de** CloudTrail, CloudWatch e VPC Flow Logs?
7. Como montar uma **VPC com os controles de segurança** adequados.
8. Casos de uso e capacidades de **Shield, WAF, Secrets Manager e Parameter Store**.
9. Como proteger dados **em trânsito e em repouso**; quando **KMS** e quando **CloudHSM**.

A frase que resume a estratégia de prova, dita pelo próprio instrutor:

> **Conseguir escolher entre dois serviços diferentes a partir do enunciado é o que vai te
> fazer passar na certificação.**

É a justificativa de por que os cards priorizam `disc` e `cen` sobre `def`: o exame quase
nunca pergunta o que um serviço faz — pergunta qual dos plausíveis atende à restrição.

---

## Como isto se conecta ao que já estudei

Primeira aula processada. Ganchos para as próximas:
- Níveis de resiliência (IAM global / VPC regional / subnet zonal) → toda questão de alta
  disponibilidade no **D2**.
- **DR e as 4 estratégias** → aprofundadas no **D2**.
- **Lifecycle vs. Intelligent-Tiering** → decisão de custo, **D4**.
- **Criptografia e desempenho** → **D3**.

## Lacunas remanescentes
- ⚠️ Impacto quantitativo da criptografia em desempenho: sem valores publicados utilizáveis.
- ⚠️ RTO por estratégia de DR — a aula só trata RPO.

*(Resolvidas em 19/07/2026 com a transcrição correta do módulo 5: os serviços de
monitoramento passaram a ser nomeados, e Organizations, Control Tower e Service Catalog
ganharam diferenciação.)*

## Fontes das respostas `[doc]`

- [Lógica de avaliação de políticas do IAM](https://docs.aws.amazon.com/IAM/latest/UserGuide/reference_policies_evaluation-logic.html) · [SCPs](https://docs.aws.amazon.com/organizations/latest/userguide/orgs_manage_policies_scps.html)
- [AssumeRole](https://docs.aws.amazon.com/STS/latest/APIReference/API_AssumeRole.html) · [GetSessionToken](https://docs.aws.amazon.com/STS/latest/APIReference/API_GetSessionToken.html)
- [NACL padrão](https://docs.aws.amazon.com/vpc/latest/userguide/default-network-acl.html) · [NACL personalizada](https://docs.aws.amazon.com/vpc/latest/userguide/custom-network-acl.html) · [Noções de NACL](https://docs.aws.amazon.com/vpc/latest/userguide/nacl-basics.html)
- [Recursos do AWS Shield](https://aws.amazon.com/shield/features/) · [FAQ do Shield](https://aws.amazon.com/shield/faqs/) · [Preço do Shield](https://aws.amazon.com/shield/pricing/)
- [Rotação de chaves do KMS](https://docs.aws.amazon.com/kms/latest/developerguide/rotate-keys.html) · [Escolha de serviço de criptografia](https://docs.aws.amazon.com/decision-guides/latest/cryptography-on-aws-how-to-choose/guide.html) · [O que é o CloudHSM](https://docs.aws.amazon.com/cloudhsm/latest/userguide/introduction.html) · [KMS e FIPS 140-3 Nível 3](https://aws.amazon.com/blogs/security/aws-kms-now-fips-140-2-level-3-what-does-this-mean-for-you/)
- [Renovação gerenciada no ACM](https://docs.aws.amazon.com/acm/latest/userguide/managed-renewal.html) · [Renovação com validação por DNS](https://docs.aws.amazon.com/acm/latest/userguide/dns-renewal-validation.html)
- [Tipos de política do IAM](https://docs.aws.amazon.com/IAM/latest/UserGuide/access_policies.html) · [Identidade vs. recurso](https://docs.aws.amazon.com/IAM/latest/UserGuide/access_policies_identity-vs-resource.html) · [Permissions boundaries](https://docs.aws.amazon.com/IAM/latest/UserGuide/access_policies_boundaries.html)
- [Role vs. usuário e credenciais temporárias](https://docs.aws.amazon.com/IAM/latest/UserGuide/id_credentials_temp.html) · [Boas práticas do IAM](https://docs.aws.amazon.com/IAM/latest/UserGuide/best-practices.html)
- [Opções do Directory Service](https://docs.aws.amazon.com/whitepapers/latest/active-directory-domain-services/directory-services-options-in-aws.html) · [Fim de novas assinaturas do Simple AD](https://docs.aws.amazon.com/directoryservice/latest/admin-guide/simple-ad-availability-change.html)
- [Visão geral do Service Catalog](https://docs.aws.amazon.com/servicecatalog/latest/adminguide/introduction.html)
- [Direct Connect](https://docs.aws.amazon.com/whitepapers/latest/aws-vpc-connectivity-options/aws-direct-connect.html) · [Direct Connect + VPN](https://docs.aws.amazon.com/whitepapers/latest/aws-vpc-connectivity-options/aws-direct-connect-site-to-site-vpn.html) · [FAQ do AWS VPN](https://aws.amazon.com/vpn/faqs/)
