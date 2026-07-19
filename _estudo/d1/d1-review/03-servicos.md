---
layout: dossie
titulo: "Domain 1 Review: Criação de arquiteturas seguras"
dominio: d1
aula: d1-review
tipo: review
fonte: "Skill Builder — Domain 1 Review (SAA-C03 PT-BR)"
processado: 2026-07-19
cards: 77
artefato: 03-servicos
secao: Serviços AWS
ordem: 3
---

Marcações: sem rótulo = veio da transcrição · `†` = [fora da transcrição] ·
`[doc]` = confirmado na documentação AWS (fontes em `02-conteudo.md`) · `⚠️` = lacuna aberta.

## Identidade e acesso

| Serviço | O que é | Papel nesta aula | Quando usar | Quando NÃO usar (alternativa) | Limites / números | Tags Anki |
|---|---|---|---|---|---|---|
| **AWS IAM** | Controle de quem pode fazer o quê nos recursos AWS | Base da tarefa 1.1 | Sempre — identidades e permissões dentro da conta | Identidades já existentes fora da AWS → federação via role | **Serviço global**; identidades nascem **sem permissões** | `d1 IAM def` |
| **AWS STS** | Emite credenciais temporárias | Assumir roles dentro e entre contas | Acesso temporário, cross-account, federação | Acesso permanente de carga interna → role atribuída ao serviço | **AssumeRole 12 h**; GetSessionToken 36 h `[doc]` | `d1 STS num` |
| **Amazon Cognito** | Identidade para aplicações; SSO e federação de IDs | Citado como fonte provável de questão de cenário | Autenticar usuários de app web/mobile e dar credenciais AWS | Federação de funcionários corporativos → IAM Identity Center / AD † | user pools vs. identity pools | `d1 Cognito disc` |
| **AWS Single Sign-On** | Acesso centralizado a múltiplas contas/apps | Citado na lista de integração de segurança | Funcionários acessando várias contas AWS | Usuários finais de aplicação → Cognito † | Hoje chamado IAM Identity Center † | `d1 SSO def` |
| **AWS Directory Service** | Active Directory gerenciado ou proxy para o seu | Casos de uso cobrados no encerramento | **Managed Microsoft AD**: trust com on-premises, +5.000 usuários, cargas Windows `[doc]` | Só federar console → SSO † | **AD Connector** é proxy e não guarda nada na nuvem; **Simple AD** até 5.000 usuários, sem novos clientes a partir de 30/07/2026 `[doc]` | `d1 DirectoryService disc` |
| **AWS Organizations** | Gestão de múltiplas contas | Estratégia de segurança multi-conta | Aplicar o **teto** de permissões via SCP | Conta única | Container das contas; habilita SCP | `d1 Organizations disc` |
| **AWS Control Tower** | Landing zone multi-conta governada | Impor padrões de segurança | **Provisionar** o ambiente multi-conta com guardrails prontos `[doc]` | Já existe Organizations maduro † | Automatiza a governança, não concede | `d1 ControlTower disc` |
| **AWS Service Catalog** | Catálogo de produtos aprovados (CloudFormation) | Terceiro candidato do encerramento para menor privilégio | Time provisiona recursos padronizados **sem ter permissão sobre eles** — o **launch role** provisiona `[doc]` | Impor teto de permissões → SCP | Portfólios + launch constraints | `d1 ServiceCatalog cen` |
| **SCP** | Política que limita o **máximo** de permissões de contas na organização | Impor padrões que a conta-membro não contorna | Teto de permissão organizacional | Conceder permissão — SCP **não concede**, só limita † | Aplica-se a Organizations | `d1 SCP disc` |

## Monitoramento e rastreabilidade

| Serviço | O que é | Papel nesta aula | Quando usar | Quando NÃO usar (alternativa) | Limites / números | Tags Anki |
|---|---|---|---|---|---|---|
| **AWS CloudTrail** | Auditoria de chamadas de API | Nomeado no encerramento | "**Quem** chamou qual API e quando" | Saber o **estado** do recurso → Config | Registra a chamada, não o estado | `d1 CloudTrail disc` |
| **Amazon CloudWatch** | Métricas, logs e alarmes | Nomeado no encerramento | Comportamento e desempenho; alarmes | Auditar autoria de mudança → CloudTrail | — | `d1 CloudWatch disc` |
| **VPC Flow Logs** | Registro do tráfego nas ENIs | Nomeado no encerramento | "Que tráfego entrou/saiu da VPC" | Chamada de API → CloudTrail | Nível de ENI, subnet ou VPC † | `d1 VPCFlowLogs disc` |
| **AWS Config** | Conformidade e histórico de **configuração** | Um dos "outros além dos três" `[doc]` | "Este bucket já esteve público?"; conformidade contínua | Autoria da chamada → CloudTrail | Estado e histórico do recurso | `d1 Config disc` |
| **AWS Security Hub** | Agrega achados de segurança | Um dos "outros" `[doc]` | Painel único de achados de vários serviços | Detectar por si → GuardDuty | — | `d1 SecurityHub def` |
| **IAM Access Analyzer** | Detecta acesso externo indevido | Um dos "outros" `[doc]` | "Algum recurso está exposto para fora da conta?" | — | — | `d1 AccessAnalyzer cen` |

## Rede e isolamento

| Serviço | O que é | Papel nesta aula | Quando usar | Quando NÃO usar (alternativa) | Limites / números | Tags Anki |
|---|---|---|---|---|---|---|
| **Amazon VPC** | Rede virtual isolada | Base da tarefa 1.2 | Toda carga que precisa de isolamento de rede | — | **Regional**; tipos padrão e personalizada | `d1 VPC num` |
| **Subnet** | Subdivisão da VPC onde os recursos rodam | Segmentação pública/privada | Estruturar a VPC por camada e por AZ | — | **Zonal** (resiliente ao nível de AZ) | `d1 VPC num` |
| **Security Group** | Filtro no nível da instância | Proteção de camadas de aplicação | Regra por instância/ENI | Precisa **negar** explicitamente → NACL † | **Stateful**; só regras de permissão † | `d1 VPC disc` |
| **Network ACL** | Filtro no nível da subnet | Proteção de camadas de aplicação | Bloqueio amplo por subnet, negação explícita | Regra por instância → SG † | **Stateless**; permite e nega; ordem numérica † | `d1 VPC disc` |
| **Tabela de rotas** | Define para onde o tráfego vai | Determina subnet pública vs. privada | Roteamento e segmentação | — | Rota para IGW = subnet pública † | `d1 VPC def` |
| **NAT Gateway** | Saída para internet a partir de subnet privada | Citado no conjunto de controles de rede | Instância privada precisa alcançar a internet **de saída** | Só precisa alcançar serviço AWS → VPC endpoint | — | `d1 VPC disc` |
| **VPC Endpoint** | Gateway interno para serviços públicos da AWS | Acesso seguro sem sair para a internet | Alcançar serviço AWS **sem IGW nem NAT** | Alcançar internet aberta → NAT/IGW | Dispensa IGW e NAT | `d1 VPC cen` |
| **AWS PrivateLink** | Expõe **um serviço** a muitas VPCs/contas | Resolve exposição de aplicação | Expor app a **dezenas/centenas** de VPCs sem peering | Poucas VPCs, integração ampla de rede → peering | Sem IGW, NAT ou peering | `d1 PrivateLink disc` |
| **VPC Peering** | Conecta duas VPCs | Contraexemplo do PrivateLink | Integração ponto a ponto entre poucas VPCs | Escala → **sobrecarga de gerenciamento** e **expõe as demais apps** | Não é transitivo † | `d1 VPC disc` |
| **Transit Gateway** | Hub de conexão de rede | Citado na lista de conectividade | Conectar muitas VPCs e on-premises em topologia hub-and-spoke † | Expor um único serviço → PrivateLink † | ⚠️ não detalhado | `d1 TransitGateway def` |
| **Site-to-Site VPN** | Túnel IPsec on-premises ↔ VPC | Conexão privada externa | Conectar data center à VPC pela internet, criptografado | Banda dedicada e latência estável → Direct Connect † | **1,25 Gbps/túnel** (opção 5 Gbps), **2 túneis** `[doc]` | `d1 VPN num` |
| **Client VPN** | VPN de usuário final para a VPC | Conexão privada externa | Acesso remoto de indivíduos | Conexão de rede inteira → Site-to-Site † | Acesso remoto individual | `d1 VPN disc` |
| **Direct Connect** | Link físico dedicado para a AWS | Conexão privada externa | Banda alta, latência consistente, tráfego previsível † | Precisa subir rápido / baixo custo → VPN † | **1/10/100 Gbps** dedicado; hosted 50 Mbps–10 Gbps; **sub-10 ms** `[doc]` | `d1 DirectConnect num` |

## Proteção de aplicações e segredos

| Serviço | O que é | Papel nesta aula | Quando usar | Quando NÃO usar (alternativa) | Limites / números | Tags Anki |
|---|---|---|---|---|---|---|
| **AWS WAF** | Firewall de aplicação web | Proteção de camada 7 | **Injeção SQL**, XSS, regras HTTP | Ataque DDoS volumétrico → Shield | **Só em ALB, API Gateway e CloudFront** | `d1 WAF num` |
| **AWS Shield** | Proteção contra DDoS | Proteção de camada de rede | Ataques **DDoS** externos | Ataque de aplicação → WAF | Advanced: **US$ 3.000/mês** + 1 ano; cost protection e SRT `[doc]` | `d1 Shield num` |
| **Amazon GuardDuty** | Detecção de ameaças | Citado na lista de integração | Detectar atividade maliciosa/anômala † | Classificar dados sigilosos → Macie | — | `d1 GuardDuty disc` |
| **Amazon Macie** | ML para descobrir e classificar dados sigilosos | Serviço-resposta para **PII** | Encontrar PII **no S3** | Dados fora do S3 † | **Escopo: S3** | `d1 Macie cen` |
| **AWS Secrets Manager** | Armazena segredos com rotação | Trade-off resolvido na aula | Alto volume + **alternância automática** de credenciais | Sem rotação, sensível a custo → Parameter Store | Força rotação em **intervalo de dias** | `d1 SecretsManager disc` |
| **SSM Parameter Store** | Armazena parâmetros e configuração | Contraparte do Secrets Manager | Configuração e segredos simples | Precisa rotação automática → Secrets Manager | — | `d1 ParameterStore disc` |

## Criptografia e conformidade

| Serviço | O que é | Papel nesta aula | Quando usar | Quando NÃO usar (alternativa) | Limites / números | Tags Anki |
|---|---|---|---|---|---|---|
| **AWS KMS** | Gerenciamento de chaves | "Estude a fundo" — ênfase explícita | Padrão para chaves; integrado aos serviços | Exige **single-tenancy** ou PKCS#11/JCE → CloudHSM `[doc]` | Rotação **365 d** (90–2560), só simétricas `[doc]` | `d1 KMS num` |
| **AWS CloudHSM** | HSM dedicado | Contraparte do KMS | Controle exclusivo das chaves, exigência regulatória † | Caso geral → KMS `[doc]` | Tenant único; PKCS#11 e JCE `[doc]` | `d1 CloudHSM disc` |
| **AWS Certificate Manager** | Provisiona e renova certificados | Criptografia **em trânsito** | TLS em ALB, CloudFront, API Gateway † | — | Renova **60 d antes**, se em uso e CNAME publicado `[doc]` | `d1 ACM num` |
| **AWS Artifact** | Portal de documentos de conformidade | Requisitos de conformidade | Baixar relatórios de auditoria e acordos **sob demanda** | Monitoramento operacional de segurança † | Autoatendimento | `d1 Artifact cen` |

## Armazenamento, backup e DR

| Serviço | O que é | Papel nesta aula | Quando usar | Quando NÃO usar (alternativa) | Limites / números | Tags Anki |
|---|---|---|---|---|---|---|
| **Amazon S3** | Armazenamento de objetos | Criptografia, granularidade, DR | Objetos; segurança por caminho/objeto | Dado gerado por instância já em EBS → criptografar o EBS | SSE-C / SSE-S3 / SSE-KMS; **CRR** para DR | `d1 S3 num` |
| **Amazon EBS** | Volume de blocos | Cenário resolvido de criptografia | Dados de instância — **menor esforço**: volume criptografado | — | Backup via **snapshot** | `d1 EBS cen` |
| **AWS Backup** | Backup centralizado | Local único de configuração e monitoramento | Gerenciar backup de vários serviços de uma vez | Precisa só de um snapshot pontual † | Cobre EBS, EC2, RDS/Aurora, DynamoDB, EFS, Storage Gateway, FSx (Windows e Lustre); **cópia entre Regiões** | `d1 AWSBackup num` |
| **AWS Storage Gateway** | Ponte on-premises ↔ AWS | Resposta para **ambientes híbridos** | Cenário híbrido | Tudo já na nuvem † | — | `d1 StorageGateway cen` |
| **S3 Lifecycle** | Transição/expiração por regra | Ciclo de vida dos dados | Padrão de acesso **previsível** † | Padrão imprevisível → Intelligent-Tiering | — | `d1 S3 disc` |
| **S3 Intelligent-Tiering** | Move objetos entre camadas automaticamente | Ciclo de vida dos dados | Padrão de acesso **imprevisível** † | Padrão previsível → Lifecycle | Taxa de monitoramento † | `d1 S3 disc` |

> Serviços citados apenas como "tem mecanismo de backup próprio", sem detalhe:
> **RDS**, **Aurora**, **DynamoDB**, **EFS**, **Redshift**, **Neptune**, **DocumentDB**,
> **EC2**, **FSx for Windows File Server**, **FSx for Lustre**. Entram no índice pelo
> mecanismo de backup; a fundo, nos domínios 2 e 3.

---

## Pares confundíveis

### AWS Secrets Manager vs. SSM Parameter Store
| | Secrets Manager | Parameter Store |
|---|---|---|
| Rotação automática | **Sim**, forçada em intervalo de dias | Não nativa † |
| Projetado para | segredos | configuração e parâmetros |
| Custo | maior † | menor / free tier † |
| **Escolha Secrets Manager quando** | o enunciado disser **rotação/alternância automática** | — |
| **Escolha Parameter Store quando** | — | for configuração sem rotação, com pressão de custo |

**Diferenciador:** a palavra **rotação** decide a questão.

### AWS PrivateLink vs. VPC Peering
| | PrivateLink | VPC Peering |
|---|---|---|
| Unidade exposta | **um serviço** | **a VPC inteira** |
| Escala | dezenas a centenas de VPCs | sobrecarga cresce com a malha |
| Superfície de exposição | apenas o serviço publicado | **demais aplicações ficam expostas** |
| **Escolha PrivateLink quando** | expor app a muitas VPCs/contas com segurança | — |
| **Escolha Peering quando** | — | integração ampla entre poucas VPCs |

**Diferenciador:** exposição *de um serviço* vs. *da VPC inteira*.

### AWS WAF vs. AWS Shield
| | WAF | Shield |
|---|---|---|
| Camada | aplicação (7) | rede/transporte † |
| Ataque-alvo | **injeção SQL**, XSS | **DDoS** |
| Onde se implanta | **ALB, API Gateway, CloudFront** | recursos de borda † |

**Diferenciador:** "injeção SQL" → WAF; "DDoS" → Shield.

### Amazon Macie vs. Amazon GuardDuty
| | Macie | GuardDuty |
|---|---|---|
| Objeto de análise | **dados** (conteúdo no S3) | **atividade** (comportamento na conta) † |
| Responde | "onde estão meus PII?" | "alguém está agindo de forma maliciosa?" † |

**Diferenciador:** "identificar PII no S3" → Macie.

### Política de identidade vs. política de recurso
| | Identidade | Recurso |
|---|---|---|
| Anexada a | usuário, grupo, role | bucket S3, fila SQS, endpoint VPC, chave KMS |
| Responde | quais recursos **eu** acesso | **quem** acessa este recurso |
| `Principal` | ausente | **presente** |

**Diferenciador:** presença do elemento **`Principal`**.

### AWS KMS vs. AWS CloudHSM
| | KMS | CloudHSM |
|---|---|---|
| Modelo | gerenciado, multi-tenant † | HSM **dedicado**, tenant único † |
| Integração com serviços AWS | ampla † | limitada † |
| **Escolha CloudHSM quando** | — | exigência regulatória de controle exclusivo da chave † |

`[doc]` **Nuance atual:** o argumento "CloudHSM porque preciso de FIPS 140-2 Nível 3" caducou — o
KMS já é **FIPS 140-3 Nível 3**. O discriminador honesto hoje é **single-tenancy sob controle
do cliente** e as interfaces **PKCS#11/JCE**. O SAA-C03 pode ainda testar o enquadramento antigo.
Os dois podem operar juntos: o CloudHSM como **custom key store** do KMS.

### AWS CloudTrail vs. AWS Config
| | CloudTrail | Config |
|---|---|---|
| Registra | a **chamada de API** | o **estado** do recurso e como mudou |
| Responde | "**quem** alterou o security group?" | "este bucket **já esteve** público?" |

**Diferenciador:** autoria da ação → CloudTrail. Histórico de configuração → Config.

### Organizations/SCP vs. Service Catalog
| | SCP | Service Catalog |
|---|---|---|
| Mecanismo | **teto** de permissões da conta | **produtos aprovados** + launch role |
| Efeito | ninguém ultrapassa o limite | o time provisiona **sem ter permissão** nos recursos |

**Diferenciador:** "impedir que façam X" → SCP. "Deixar provisionar o padrão sem dar acesso
amplo" → Service Catalog.

### AD Connector vs. Managed Microsoft AD
| | AD Connector | Managed Microsoft AD |
|---|---|---|
| Onde ficam os dados | **só on-premises** — é proxy, não guarda nada na nuvem | AD real na AWS |
| Escolha quando | manter a administração no AD existente | trust com on-premises, +5.000 usuários, cargas Windows |

### Níveis de resiliência (armadilha clássica)
| Recurso | Nível |
|---|---|
| **IAM** | **Global** |
| **VPC** | **Regional** |
| **Subnet** | **Zonal** (AZ) |

---

## Serviços já vistos em aulas anteriores
Nenhum — esta é a primeira aula processada.

## Novos no índice
Todos os acima. `_estudo/00-indice-servicos.md` atualizado com 30 entradas.
