# Conteúdo de estudo — Domain 1 Review: Criação de arquiteturas seguras

**Domínio:** d1 · **Fonte:** Skill Builder — Domain 1 Review (SAA-C03 PT-BR) · **Processado em:** 2026-07-19

## Contexto: por que este assunto existe

O Domínio 1 vale cerca de 30% do exame, mas seu peso real é maior: a AWS recomenda que
segurança seja considerada em **cada estágio, nível e camada** da arquitetura, e não apenas
nas questões marcadas como "de segurança". Na prática do exame isso vira uma regra de
desempate — quando duas alternativas atendem ao requisito funcional, a mais segura é a
correta.

Esta aula é uma *revisão de escopo*, não um tutorial. O instrutor percorre as três
declarações de tarefa dizendo o que você precisa dominar. Boa parte do valor está em tratar
as perguntas retóricas dele como um checklist de autoavaliação — elas estão preservadas
abaixo, em **Perguntas em aberto**.

---

## 1. Contas da AWS e o usuário raiz

### O que é
A conta AWS é a fronteira de cobrança e de isolamento de recursos. O instrutor destaca que
contas são "negligenciadas no estudo por parecerem básicas demais" — e as classifica como
fundamento obrigatório.

### Como funciona
Toda conta nasce com **um único usuário raiz, com permissões totais**. O risco é estrutural:
essas permissões **não podem ser alteradas**. Não existe "limitar o root". Logo, se o usuário
raiz for comprometido, todo o ambiente AWS está comprometido — não há contenção possível.

Daí decorrem as duas mitigações:
1. **MFA no usuário raiz** — reduz a chance de comprometimento.
2. **Não usar o raiz no dia a dia** — criar identidades IAM adicionais com permissões
   limitadas para o trabalho corrente. É a aplicação direta do menor privilégio.

### O gancho de exame
Enunciados com "seguindo as práticas recomendadas da AWS" combinados a qualquer operação
rotineira → a resposta que usa o usuário raiz está errada por definição.

---

## 2. IAM: identidades, políticas e o princípio do menor privilégio

### O que é
O IAM é o serviço que define quem (ou o quê) pode fazer o quê nos seus recursos AWS.

### Fato de resiliência
**O IAM é um serviço global** — protege os dados do IAM em todas as Regiões da AWS. Compare
com VPC (regional) e subnet (zonal); o instrutor cobra os três explicitamente, e o exame usa
esse nível de serviço para eliminar alternativas.

### Como funciona
As identidades — **usuários, grupos e roles** — **começam sem nenhuma permissão**. Permissões
são concedidas conforme a necessidade. Esse padrão *deny-by-default* é o menor privilégio
implementado no próprio produto.

O **princípio do menor privilégio** conceder apenas o acesso necessário. Seu efeito, segundo o
instrutor, é **limitar o alcance do impacto de uma intercorrência de segurança**: uma
credencial vazada com escopo estreito compromete pouco. Ele reaparece na tarefa 1.3 como base
da proteção de dados, o que confirma seu papel de conceito transversal.

### Políticas
> **Uma política é um objeto na AWS que, quando associado a uma identidade ou a um recurso,
> define suas permissões.**

Dois tipos, e a distinção é a mais cobrada do tema:

| | Política **baseada em identidade** | Política **baseada em recurso** |
|---|---|---|
| Anexada a | usuário, grupo ou role do IAM | ao próprio recurso |
| Responde | *quais recursos* esta identidade pode acessar | *quem* pode acessar este recurso |
| Elemento `Principal` | **ausente** | **presente** — é a diferença estrutural |
| Exemplos de alvo | — | bucket S3, fila SQS, endpoint de VPC, chave do KMS |

O instrutor observa que políticas de bucket são "estruturadas de maneira diferente" das de
identidade, e localiza a diferença exatamente na parte do **`Principal`**, que define quais
principals a política afeta.

### Nível exigido pelo exame
Explícito na aula: **você não precisa saber escrever políticas avançadas, mas precisa ler e
interpretar** documentos de política. O que deve dominar: as principais partes de uma
declaração, o que é obrigatório, como as políticas dão granularidade e — importante — a
**lógica de decisão do IAM** quando uma identidade tem várias políticas anexadas.
⚠️ LACUNA: essa lógica de avaliação é citada mas não explicada. Ver documentação.

### Confusão a evitar
Identidade controla *o que eu alcanço*; recurso controla *quem me alcança*. Em cenários
cross-account, a política de recurso costuma ser a peça que falta.

---

## 3. Credenciais, STS e federação

### Nunca hardcode
A aula faz a pergunta e responde categoricamente: *quando você deve codificar credenciais de
forma rígida na aplicação?* → **Nunca.** É uma das poucas respostas absolutas do exame. A
alternativa é conceder acesso via **role**, inclusive atribuindo roles a serviços da AWS.

### AWS STS
O **Security Token Service** emite credenciais temporárias. Estudar seu uso **dentro de uma
conta e entre contas**, e como roles são usadas com federação.

### Federação
Cenário motivador da aula: seus usuários já têm identidade fora da AWS — um diretório
corporativo, por exemplo — e precisam acessar recursos AWS. Solução: **uma role do IAM
especifica as permissões para usuários com identidade federada**, vindos da sua organização
ou de um provedor de identidade (IdP) de terceiros. O instrutor cobra saber projetar e
configurar **Active Directory** para federar acesso a usuários/roles do IAM.

### O gancho de exame
"Usuários já existentes no diretório corporativo", "sem criar usuários IAM individuais",
"acesso temporário" → role + federação + STS. Se a alternativa cria usuários IAM permanentes
para gente que já tem identidade em outro lugar, está errada.

---

## 4. Governança multi-conta e rastreabilidade

### O que é
Acima da conta individual há a estratégia organizacional. A aula nomeia três: **AWS
Organizations**, **AWS Control Tower** e **Service Control Policies (SCP)**.

### Rastreabilidade
Definida como a capacidade de **monitorar, alertar e auditar ações e alterações no ambiente
em tempo real**, além de integrar coleta de registros e métricas com sistemas que investigam e
agem automaticamente. O argumento do instrutor: assim como você monitora desempenho da
aplicação, precisa de visibilidade sobre **quem e o que acessa** recursos e dados.

### O gancho de exame
Você será testado em: criar estratégias de segurança para **várias contas**, obter
visibilidade, **impor padrões de segurança**, e alertar/automatizar a partir desses dados.
"Impor padrões que nem o administrador da conta-membro possa contornar" → SCP.

⚠️ LACUNA: a aula cita Organizations, Control Tower e SCP sem diferenciá-los. Estudar
separadamente — e note que os serviços de rastreabilidade concretos (CloudTrail, Config,
CloudWatch) **não são nomeados** nesta transcrição, embora o conceito seja cobrado.

---

## 5. VPC e segmentação de rede

### Fato de resiliência
**A VPC é regional** — quando criada, fica em uma Região e uma conta. **A subnet é zonal**,
um recurso resiliente ao nível de Zona de Disponibilidade. Esses dois fatos aparecem em
questões de alta disponibilidade no Domínio 2 também.

### VPC padrão vs. personalizada
Existem dois tipos e o exame cobra **as diferenças e como a segurança de cada uma é
configurada inicialmente** — os filtros de segurança já vêm com configurações básicas
distintas. ⚠️ LACUNA: a aula não detalha quais são.

### O que é uma subnet
Onde os serviços ficam e são executados dentro da VPC; subnets acrescentam estrutura e
funcionalidade. A distinção **pública vs. privada** é cobrada em três frentes: o que
diferencia uma da outra, quando usar cada uma, e as práticas comuns de uso.
[fora da transcrição] O que torna uma subnet pública é a rota para um Internet Gateway na
tabela de rotas associada — não uma propriedade da subnet em si.

### Proteção de arquiteturas multicamadas
Ao proteger camadas de aplicação, prestar atenção a quatro componentes e à **interação entre
eles**: **security groups, network ACLs, tabelas de rota e NAT gateways**. Juntos dão
controle sobre o tráfego de rede com a granularidade necessária.

O instrutor pede explicitamente: como criar as regras, **as armadilhas a evitar**, a **lógica
de processamento de regras**, e os métodos para melhor funcionalidade combinada.

[fora da transcrição] O par mais cobrado: **security group é stateful** — tráfego de retorno é
liberado automaticamente — e só admite regras de permissão. **NACL é stateless** — exige regra
de saída explícita para o retorno — e avalia regras de permitir e negar em ordem numérica,
parando na primeira correspondência.

### Cenário trabalhado na aula
Tráfego origina-se on-premises, entra por uma **VPN**, e precisa alcançar servidores de
aplicação numa **subnet privada** — mas esses servidores devem permanecer protegidos contra a
internet pública. A configuração precisa liberar o fluxo nos níveis de **VPC, subnet e
instância** sem abrir caminho para a internet. É o formato típico de questão do domínio: o
requisito de conectividade e o de isolamento chegam juntos.

---

## 6. Endpoints e PrivateLink

### O que é um endpoint de VPC
Objetos de gateway criados **dentro da sua VPC** para conectar aos serviços públicos da AWS
**sem precisar de Internet Gateway nem NAT Gateway**. O tráfego não sai para a internet.

### O problema que o PrivateLink resolve
Situação da aula: você tem uma aplicação e a torna pública. Agora ela está exposta na
internet. Como protegê-la e ainda assim oferecê-la a outras VPCs, em outras contas?

**VPC Peering resolve mal**, por duas razões declaradas:
1. Acrescenta **sobrecarga de gerenciamento** conforme você escala (a malha cresce).
2. **Expõe as demais aplicações** da VPC às VPCs emparelhadas — o peering é da VPC inteira,
   não de um serviço.

**PrivateLink** é a forma segura e dimensionável de expor **uma** aplicação ou serviço a
dezenas ou centenas de VPCs, sem peering, sem Internet Gateway, sem NAT Gateway.

### O gancho de exame
"Expor um serviço a muitas VPCs/contas", "sem atravessar a internet", "sem sobrecarga de
gerenciamento" → PrivateLink. Se o enunciado enfatiza *escala* ou *não expor o resto da VPC*,
peering é a alternativa-armadilha.

---

## 7. Conectividade híbrida e privada

Três serviços a dominar para proteger conexões externas aos recursos na AWS — o instrutor os
repete duas vezes na aula, sinal de peso:

- **AWS Site-to-Site VPN**
- **AWS Client VPN**
- **AWS Direct Connect**

Além deles: **endpoints de serviço, PrivateLink, peering, transit gateway** e conexões VPN.

Para cada um, estudar **capacidade, segurança e resiliência**. ⚠️ LACUNA: nenhum número de
capacidade ou modelo de resiliência é fornecido na transcrição. É um dos pontos onde a
documentação é obrigatória — e provavelmente o de maior retorno, já que o exame testa
Direct Connect vs. VPN por banda, latência e custo.

---

## 8. Serviços de proteção de aplicação e de dados sigilosos

### Amazon Macie
Serviço de segurança que usa **machine learning** para **descobrir, classificar e proteger
dados sigilosos armazenados no S3**. A aula amarra Macie ao conceito de **PII** — dados
pessoais que estabelecem a identidade do indivíduo: nome, endereço residencial, e-mail, CPF,
carteira de motorista, passaporte, data de nascimento, conta bancária, cartão de crédito.

**Gancho de exame:** enunciado com "identificar informações de identificação pessoal" +
"armazenadas no S3" → Macie. A vinculação ao S3 é o discriminador.

### Amazon Cognito
Dominar **user pools** e **identity pools**, e como o Cognito agencia **Single Sign-On e
federação de identidades**. A aula avisa que **haverá provavelmente questões baseadas em
cenários** sobre casos de uso.
[fora da transcrição] User pool = autenticação (o diretório de usuários da aplicação);
identity pool = autorização na AWS (troca o token por credenciais temporárias via STS).

### Shield e WAF
Entender **a diferença entre Shield Standard e Shield Advanced**, e saber **quando escolher um
serviço de segurança em detrimento de outro** — o exemplo dado contrapõe **ataques DDoS
externos** a **ataques de injeção SQL**. [fora da transcrição] Shield trata DDoS (camadas de
rede/transporte); WAF trata a camada de aplicação, incluindo injeção SQL e XSS.

**Fato de escopo, muito cobrado:** o **AWS WAF só pode ser implantado em três serviços** —
**Application Load Balancer, Amazon API Gateway e Amazon CloudFront**. Se a alternativa propõe
WAF em outro lugar (numa instância EC2 avulsa, num NLB), está errada.

### Secrets Manager vs. Systems Manager Parameter Store
O trade-off é dado com resposta na aula. Cenário: armazenar um segredo com **acesso de alto
volume e alternância automática de credenciais**.

> O **AWS Secrets Manager** foi projetado para armazenar segredos melhor que o Parameter
> Store, e **pode forçar a alternância dos segredos em um intervalo determinado de dias**.

**Gancho de exame:** a palavra **rotação** (alternância automática) no enunciado decide a
questão em favor do Secrets Manager. Sem rotação, Parameter Store costuma vencer por custo.

### Também citados
**AWS Single Sign-On**, **Amazon GuardDuty**, e o fundamento de **firewalls e servidores
proxy**.

---

## 9. Criptografia: os fundamentos que o exame assume

### Os dois tipos
| | **Em repouso** | **Em trânsito** |
|---|---|---|
| Protege contra | acesso não autorizado e roubo | interceptação durante a transferência |
| Situação | dados armazenados | dados entre dois locais |
| Partes envolvidas | geralmente **uma** | **duas ou mais** |

Metáfora da aula: a criptografia **adiciona um túnel ao redor dos dados** para que ninguém de
fora consiga lê-los.

### Vocabulário obrigatório
- **Texto simples (plaintext)** — dado **não criptografado**. Cuidado: *nem sempre é texto* —
  pode ser documento, imagem, aplicação. O nome engana.
- **Algoritmo** — o código que recebe o texto simples **e a chave** e produz o dado
  criptografado. Precisa dos dois insumos.
- **Chave** — essencialmente uma senha, usada com o algoritmo.
- **Texto cifrado (ciphertext)** — o dado criptografado, saída do processo.
- **Simétrica vs. assimétrica** — os dois tipos de chave e de criptografia a conhecer.
  ⚠️ LACUNA: a aula nomeia mas não diferencia. [fora da transcrição] Simétrica usa a mesma
  chave para cifrar e decifrar; assimétrica usa par pública/privada.

### KMS e CloudHSM
A aula formula as perguntas sem respondê-las — trate-as como roteiro de estudo:
*por que usar KMS em vez de CloudHSM?* *como usá-los juntos?* *como gerenciar chaves entre
Regiões?* *que tipos de chave existem e como diferem em capacidade?* *com que frequência é
possível alternar cada tipo?* *como implementar políticas de acesso para chaves?*

Fecha com uma orientação direta: **"estude a fundo o AWS KMS"**.

[fora da transcrição] Resumo do discriminador: KMS é gerenciado, multi-tenant e integrado a
praticamente todos os serviços; CloudHSM é um HSM dedicado de tenant único, para exigências
regulatórias de controle exclusivo das chaves e validação FIPS.

### AWS Certificate Manager
Usado para **criptografar dados em trânsito**; saber **como os certificados são renovados**.
⚠️ LACUNA: mecânica de renovação não detalhada.

---

## 10. Criptografia no S3

O S3 oferece criptografia em repouso e em trânsito, por **dois métodos**:

**Client-side** — os objetos são criptografados **antes de os dados chegarem ao S3**. Você
controla tudo.

**Server-side** — os dados trafegam via **HTTPS** e, ao chegarem ao S3, **o próprio serviço os
criptografa**. Três opções, todas cobradas:

| Sigla | Quem fornece/gerencia a chave |
|---|---|
| **SSE-C** | chaves **fornecidas pelo cliente** |
| **SSE-S3** | chaves **gerenciadas pelo Amazon S3** |
| **SSE-KMS** | chaves do **AWS KMS** |

**Gancho de exame:** "auditar cada uso da chave de criptografia" ou "controlar a política da
chave" → SSE-KMS. "Sem gerenciar nada" → SSE-S3.

---

## 11. Conformidade

**Segurança e conformidade são responsabilidade compartilhada** entre AWS e cliente — o
Modelo de Responsabilidade Compartilhada é pré-requisito declarado do domínio.

**AWS Artifact** — portal de **autoatendimento para recuperação de artefatos de auditoria**,
que dá **acesso sob demanda à documentação de conformidade e aos acordos da AWS**.
**Gancho:** "o auditor pediu o relatório SOC/PCI" → Artifact. Não é serviço operacional.

### AWS Cloud Adoption Framework — perspectiva de segurança
Cinco capacidades principais, na ordem da aula:
1. **IAM**
2. **Controles de detecção**
3. **Segurança de infraestrutura**
4. **Proteção de dados**
5. **Resposta a incidentes**

### Os três passos de proteção de dados
1. **Pensar** nos dados que se está protegendo: como são armazenados e **quem de fato tem
   acesso**.
2. **Classificar** — "nem todos os dados são criados da mesma forma"; a classificação
   adequada precede a proteção adequada.
3. **Defesa em profundidade** — **sobrepor múltiplos controles de segurança** para gerar
   redundância, em duas categorias: **preventivos** e **de detecção**.

---

## 12. Proteção por padrões de acesso e ciclo de vida

Serviços como o S3 permitem gerenciar segurança não só do bucket inteiro, mas **por caminhos
ou objetos específicos**. Saber quais serviços oferecem esse nível de granularidade, ler e
criar políticas por padrão de acesso, e entender como o back-end do serviço as avalia.

**Trade-off explícito da aula:** *quando usar S3 Lifecycle Configuration em vez de S3
Intelligent-Tiering?* [fora da transcrição] Lifecycle quando o padrão de acesso é previsível
— você escreve a regra por idade do objeto. Intelligent-Tiering quando é **imprevisível** — o
S3 move o objeto entre camadas automaticamente, cobrando uma taxa de monitoramento.

### Criptografia e desempenho
Pergunta a levar a sério: **o uso de criptografia afeta o desempenho?** A orientação é estudar
**quais serviços não sofrem impacto e quais sofrem impacto leve** — os exemplos citados são
velocidade de recuperação de dados com **RDS + KMS** e leitura de dados do **S3**.
⚠️ LACUNA: nenhum valor concreto é fornecido.

### Cenário resolvido na aula
Dados gerados numa instância que usa volume **EBS**, que precisam ser protegidos mantendo a
durabilidade. Armazenar em volume EBS criptografado ou transferir para bucket S3
criptografado? → **O menor esforço é o volume EBS criptografado.**
O critério "menor esforço operacional" é recorrente no SAA-C03 e costuma eliminar a
alternativa que move dados entre serviços.

---

## 13. Armazenamento na nuvem: fundamentos

> **Armazenamento na nuvem** é um modelo de computação em nuvem que armazena dados por meio de
> um provedor que **gerencia e opera** o armazenamento **como um serviço**.

**Benefícios:** não comprar hardware, não provisionar armazenamento, **sem despesas de
capital**; implantação mais rápida; e políticas de **gerenciamento de ciclo de vida** que
trazem automação, economia de custos e a capacidade de **bloquear dados para conformidade**.

**Cinco requisitos básicos a planejar:** durabilidade, disponibilidade, segurança,
regulamentação e governança, requisitos funcionais.

**Três tipos de dados:** **objeto**, **arquivo**, **bloco**.

**Cinco usos principais:** backup e recuperação; teste e desenvolvimento de software; migração
de dados; conformidade; big data e data lakes.

---

## 14. Recuperação de desastres

A aula afirma que **DR representa "uma grande parte deste exame"** — apesar de a arquitetura
resiliente ser o Domínio 2, o tema entra no Domínio 1 pelo lado da proteção de dados.

### As quatro estratégias
Em ordem crescente de custo e complexidade:

| Estratégia | Modelo | Ideia |
|---|---|---|
| **Backup & Restore** | ativo/passivo | baixo custo, baixa complexidade |
| **Pilot Light** | ativo/passivo | núcleo mínimo pronto para crescer |
| **Warm Standby** | ativo/passivo | ambiente reduzido porém funcional |
| **Multi-Site Active/Active** | ativo/ativo | várias Regiões atendendo tráfego |

**Ativo/passivo** significa: um ambiente ativo (uma Região) hospeda a carga e atende tráfego;
o **ambiente passivo** (outra Região) existe para DR e **não atende tráfego até que um evento
de failover seja acionado**.

### Como escolher — o critério da aula
Depende de **como você define desastre**:
- Desastre = interrupção ou **perda de um data center físico**, numa carga bem arquitetada e
  altamente disponível → **basta Backup & Restore**.
- Desastre abrange a perda de **uma Região inteira**, **ou** há **requisitos regulatórios**
  que exigem recuperação → considerar **Pilot Light, Warm Standby ou Multi-Site
  Active/Active**.

### RPO
> **A frequência com que você executa o backup determina o ponto de recuperação alcançável, que
> deve se alinhar para atender ao RPO.**

O backup também precisa oferecer forma de **restaurar ao ponto no tempo em que foi feito**.
⚠️ LACUNA: RTO não é mencionado; nem valores típicos de RPO/RTO por estratégia.

### Mecanismos de backup por serviço
Lista explícita da aula — vale memorizar que **cada um tem seu mecanismo nativo**:
snapshot do **EBS**; backup do **DynamoDB**; snapshot do **RDS**; snapshot do **Aurora**;
backup do **EFS** via AWS Backup; snapshot do **Redshift**; snapshot do **Neptune**;
**DocumentDB**.

**S3 é a exceção de formato:** usa **Cross-Region Replication (CRR)** para copiar objetos de
forma **assíncrona e contínua** para um bucket na Região de DR — replicação, não snapshot.

### AWS Backup
**Local centralizado** para configurar, programar e monitorar backups. Cobertura declarada:
volumes **EBS**, instâncias **EC2**, bancos **RDS** (incluindo Aurora), tabelas **DynamoDB**,
sistemas de arquivos **EFS**, volumes do **Storage Gateway**, **FSx for Windows File Server** e
**FSx for Lustre**. Suporta **cópia de backups entre Regiões**, inclusive para uma Região de DR.

**Gancho:** "gerenciamento centralizado de backup entre múltiplos serviços" → AWS Backup, não
a soma dos mecanismos nativos.

### Ambientes híbridos
Pergunta e resposta diretas da aula: *qual serviço usar para ambientes híbridos?* → **AWS
Storage Gateway**.

---

## Como isto se conecta ao que já estudei

Primeira aula processada — não há anteriores. Ganchos deixados para as próximas:
- Os níveis de resiliência (IAM global / VPC regional / subnet zonal) reaparecem em toda
  questão de alta disponibilidade do **Domínio 2**.
- **DR e as quatro estratégias** são revisitados a fundo no **Domínio 2**.
- **S3 Lifecycle vs. Intelligent-Tiering** é decisão de custo — reaparece no **Domínio 4**.
- **Criptografia e impacto em desempenho** conecta ao **Domínio 3**.

## Perguntas em aberto
*O instrutor deixou estas como autoavaliação. Se você não responde de cabeça, é lacuna real.*

1. Como criar usuários, grupos e roles do IAM — e quais os pontos fortes e limitações de cada?
2. Que cenários ditam alternar entre permissões baseadas em usuário, grupo ou role?
3. Como funciona a lógica de decisão do IAM quando há várias políticas anexadas à identidade?
4. Como projetar e configurar o Active Directory para federar acesso a usuários/roles do IAM?
5. Quais as diferenças entre ambientes públicos, privados, híbridos e multicloud — e como
   projetar acesso seguro a cada um?
6. Como a segurança é configurada inicialmente na VPC padrão vs. personalizada?
7. Por que escolher KMS em vez de CloudHSM? Como usar os dois juntos?
8. Que tipos de chave existem, como diferem em capacidade, e com que frequência cada tipo pode
   ser alternado?
9. Como gerenciar chaves de criptografia entre Regiões?
10. Como os certificados são renovados no ACM?
11. Qual a diferença entre Shield Standard e Shield Advanced?
12. Capacidade, segurança e resiliência de Site-to-Site VPN vs. Client VPN vs. Direct Connect?
13. Em quais serviços a criptografia impacta desempenho, e quanto?

## Lacunas
- ⚠️ **Módulo 5 ("Encerramento do domínio 1") tem transcrição trocada** — o texto é sobre
  processo criativo, em inglês, sem relação com o conteúdo. Nada foi extraído dele.
- ⚠️ Serviços de rastreabilidade (CloudTrail, Config, CloudWatch) são cobrados conceitualmente
  mas **não nomeados** na transcrição.
- ⚠️ Organizations, Control Tower e SCP são citados sem diferenciação.
- ⚠️ Nenhum número de capacidade, SLA ou limite quantitativo aparece em toda a aula — é uma
  revisão de escopo, não de detalhe. Os números precisam vir da documentação.
