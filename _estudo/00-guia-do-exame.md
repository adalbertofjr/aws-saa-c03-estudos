---
layout: pagina
titulo: "Guia do exame — SAA-C03"
tipo: guia
---

> Fonte oficial: [Guia do exame AWS Certified Solutions Architect – Associate (SAA-C03)](https://docs.aws.amazon.com/pt_br/aws-certification/latest/solutions-architect-associate-03/solutions-architect-associate-03.html).
> Esta página resume o que muda a forma de estudar e de escrever flashcard — não substitui
> o guia original, que tem mais contexto por declaração de tarefa.

## Por que esta página existe

Um flashcard só vale a pena se treina o que o exame de fato cobra. Sem o formato do exame
em mente, é fácil decorar preço, trivia ou o que o instrutor disse no vídeo — nenhum dos
três aparece numa questão real. Esta página é a referência que qualquer card novo precisa
respeitar.

## Formato do exame

- **65 perguntas totais**: 50 pontuadas + 15 não pontuadas (usadas para calibrar futuras
  edições, misturadas sem identificação — trate toda pergunta como se valesse).
- **Dois tipos de questão:**
  - **Múltipla escolha** — 1 resposta correta + **3 pegadinhas**.
  - **Múltipla resposta** — 2+ corretas entre 5+ opções.
- **Pegadinha, definição oficial:** *"resposta plausível que corresponde à área de
  conteúdo"* — escolhida por quem tem conhecimento **insuficiente**, não por quem não sabe
  nada. É por isso que todo card `cen`/`disc` deste deck nomeia a armadilha: o objetivo é
  treinar reconhecer a plausível-mas-errada, não só lembrar a certa.
- **Aprovação:** pontuação **720** numa escala de 100–1000.
- **Pontuação compensatória:** não é preciso passar em cada domínio — o resultado é sobre o
  exame como um todo. Não estude um domínio até a exaustão às custas dos outros três.

## Como ler uma questão (método do blog oficial)

Fonte: [Breaking down the questions on AWS certification exams](https://aws.amazon.com/pt/blogs/training-and-certification/breaking-down-the-questions-on-aws-certification-exams/).

Três perguntas, nesta ordem, com **45–60 segundos** de limite por questão antes de marcar
para revisão e seguir adiante:

1. **Que requisito(s) o enunciado impõe?** — o que precisa necessariamente ser verdade na
   resposta.
2. **Quais as condições?** — as restrições que eliminam alternativas plausíveis (custo,
   latência, "sem gerenciar servidores", "menor esforço operacional").
3. **Seguindo as práticas recomendadas da AWS, qual a melhor solução?** — não "uma solução
   que funciona", a que a AWS recomendaria.

Os cards `cen` deste deck são escritos nesse formato: requisito + condição no Frente,
resposta no Verso, a pegadinha nomeada no Extra.

## Pesos e domínios

| Domínio | Peso | Tarefas |
|---|---|---|
| **1 — Arquiteturas seguras** | 30% | 3 |
| **2 — Arquiteturas resilientes** | 26% | 2 |
| **3 — Arquiteturas de alto desempenho** | 24% | 5 |
| **4 — Arquiteturas com custo otimizado** | 20% | 4 |

**13 declarações de tarefa** no total — a tag `t<domínio>.<tarefa>` nos cards referencia
exatamente estas.

---

## Domínio 1 — Arquiteturas seguras (30%)

### 1.1 — Projetar acesso seguro aos recursos da AWS
Conhecimento: contas multi-conta, IAM e IAM Identity Center, infraestrutura global
(AZ/Região), menor privilégio, responsabilidade compartilhada.
Habilidades: MFA e boas práticas de usuário raiz · modelo de autorização (usuários, grupos,
roles, políticas) · controle de acesso baseado em perfil (STS, mudança de perfil,
cross-account) · estratégia de segurança multi-conta (Control Tower, SCP) · uso apropriado
de políticas de recurso · quando federar um diretório com roles do IAM.

### 1.2 — Projetar workloads e aplicações seguras
Conhecimento: configuração de aplicação e credenciais, endpoints de serviço, controle de
porta/protocolo/tráfego, Cognito/GuardDuty/Macie, vetores de ameaça externos (DDoS, SQL
injection).
Habilidades: arquitetura de VPC com SG/tabelas de rota/NACL/NAT · segmentação de rede
(subnets públicas/privadas) · integrar Shield/WAF/IAM Identity Center/Secrets Manager ·
proteger conexões externas (VPN, Direct Connect).

### 1.3 — Determinar os controles de segurança de dados apropriados
Conhecimento: acesso e governança de dados, recuperação, classificação e retenção,
criptografia e gestão de chaves.
Habilidades: alinhar tecnologia a requisitos de conformidade · criptografar em repouso
(KMS) e em trânsito (ACM/TLS) · políticas de acesso a chaves · backup e replicação ·
políticas de ciclo de vida · rotação de chaves e renovação de certificados.

---

## Domínio 2 — Arquiteturas resilientes (26%)

### 2.1 — Projetar arquiteturas dimensionáveis e com acoplamento fraco
Conhecimento: APIs (API Gateway), SQS, cache, stateless vs. stateful, orientação a eventos,
scaling horizontal/vertical, CDN, contêineres (ECS/EKS), ALB, arquitetura multicamada,
mensageria pub/sub, serverless (Lambda/Fargate), tipos de armazenamento, réplicas de
leitura, Step Functions.
Habilidades: projetar orientado a eventos/microsserviços/multicamada · estratégia de
scaling por componente · serviços para acoplamento fraco · quando usar contêiner ·
quando usar serverless · recomendar tecnologia apropriada.

### 2.2 — Projetar arquiteturas altamente disponíveis e/ou tolerantes a falhas
Conhecimento: infraestrutura global e Route 53, estratégias de DR (backup, pilot light,
warm standby, active-active, **RPO/RTO**), padrões distribuídos, failover, infraestrutura
imutável, RDS Proxy, cotas de serviço, durabilidade/replicação, X-Ray.
Habilidades: automação para saúde da infraestrutura · serviços para HA/tolerância a falha ·
métricas a partir de requisito de negócio · mitigar ponto único de falha · durabilidade e
disponibilidade de dados · **selecionar estratégia de DR apropriada** · melhorar
confiabilidade de app legado.

---

## Domínio 3 — Arquiteturas de alto desempenho (24%)

### 3.1 — Determinar soluções de armazenamento dimensionáveis e/ou de alto desempenho
S3, EFS, EBS por caso de uso; objeto/arquivo/bloco. Habilidade: escolher configuração de
armazenamento por desempenho e por crescimento futuro.

### 3.2 — Projetar soluções de computação elásticas e de alto desempenho
Batch, EMR, Fargate; EC2 Auto Scaling; Lambda/Fargate; ECS/EKS.
Habilidades: desacoplar para scaling independente · métricas de scaling · escolher
recurso computacional pelo requisito · dimensionar corretamente (ex.: memória do Lambda).

### 3.3 — Determinar soluções de banco de dados de alto desempenho
ElastiCache, padrão leitura-intensa vs. gravação-intensa, capacidade (IOPS, unidades),
proxy de conexão, migração homogênea/heterogênea, réplicas de leitura, serverless vs.
provisionado.
Habilidades: configurar réplicas de leitura · projetar arquitetura de banco · escolher
**mecanismo** (MySQL vs. PostgreSQL) · escolher **tipo** (Aurora vs. DynamoDB) · integrar
cache.

### 3.4 — Determinar arquiteturas de rede dimensionáveis e/ou de alto desempenho
CloudFront, Global Accelerator; topologia de sub-rede/roteamento/IP; ALB; VPN/Direct
Connect/PrivateLink.
Habilidades: topologia para arquitetura global/híbrida/multicamada · configuração de rede
escalável · posicionamento de recurso · estratégia de balanceamento.

### 3.5 — Determinar soluções de transformação e ingestão de dados de alto desempenho
Athena, Lake Formation, QuickSight; padrão de ingestão; DataSync/Storage Gateway; Glue;
Kinesis.
Habilidades: criar e proteger data lake · arquitetura de fluxo de dados · solução de
transferência · visualização · computação para processamento (EMR) · configuração de
ingestão · transformar formato (ex.: CSV → Parquet).

---

## Domínio 4 — Arquiteturas com custo otimizado (20%)

### 4.1 — Projetar soluções de armazenamento econômicas
Requester Pays, tags e cobrança multi-conta, Cost Explorer/Budgets/CUR, FSx/EFS/S3/EBS,
ciclo de vida, tiers frios.
Habilidades: estratégia de upload em lote vs. individual · dimensionar corretamente ·
menor custo de transferência · gerenciar ciclo de vida de objetos S3 · escolher tier ·
escolher serviço mais econômico.

### 4.2 — Projetar soluções de computação econômicas
Spot/Reserved/Savings Plans, Outposts, famílias/tamanhos de instância, contêiner/serverless,
auto scaling e hibernação.
Habilidades: estratégia de balanceador (ALB/NLB/GLB) · scaling horizontal vs. vertical ·
identificar serviço econômico (Lambda vs. EC2 vs. Fargate) · disponibilidade necessária
(produção vs. não-produção) · família e tamanho de instância.

### 4.3 — Projetar soluções de banco de dados econômicas
Cache, retenção, capacidade, proxy, migração, réplicas, relacional vs. não-relacional.
Habilidades: política de backup/retenção · mecanismo apropriado · **DynamoDB vs. RDS** por
custo · tipo econômico (série temporal, colunar) · migração de esquema.

### 4.4 — Projetar arquiteturas de rede com custo otimizado
NAT instance vs. NAT Gateway, linha dedicada/privada/VPN, Transit Gateway/Peering, DNS.
Habilidades: tipo de NAT Gateway (único vs. por AZ) · Direct Connect vs. VPN vs. internet ·
otimizar rota por custo de transferência · necessidade de CDN · controle de banda.

---

## Serviços dentro do escopo, por categoria

Um serviço **fora** desta lista não merece flashcard — não é o que o exame testa. Consultar
antes de gerar card para um serviço novo.

<details><summary>Analytics</summary>

Athena · Data Exchange · Data Firehose · EMR · Glue · Kinesis · Lake Formation · MSK ·
OpenSearch Service · QuickSight · Redshift
</details>

<details><summary>Integração de Aplicações</summary>

AppFlow · AppSync · EventBridge · Amazon MQ · SNS · SQS · Step Functions
</details>

<details><summary>Gerenciamento de Custos</summary>

Budgets · Cost Explorer · Relatórios de Custo e Uso · Savings Plans
</details>

<details><summary>Computação</summary>

Batch · EC2 · EC2 Auto Scaling · Elastic Beanstalk · Outposts · Serverless Application
Repository · VMware Cloud on AWS · Wavelength
</details>

<details><summary>Contêineres</summary>

ECR · ECS · ECS Anywhere · EKS · EKS Anywhere · EKS Distro
</details>

<details><summary>Banco de Dados</summary>

Aurora · Aurora Serverless · DocumentDB · DynamoDB · ElastiCache · Keyspaces · Neptune ·
RDS · Redshift
</details>

<details><summary>Ferramentas do Desenvolvedor</summary>

X-Ray
</details>

<details><summary>Dispositivos Móveis e Web</summary>

Amplify · API Gateway · Device Farm
</details>

<details><summary>Machine Learning</summary>

Comprehend · Kendra · Lex · Polly · Rekognition · SageMaker · Textract · Transcribe ·
Translate
</details>

<details><summary>Gerenciamento e Governança</summary>

Auto Scaling · CLI · CloudFormation · CloudTrail · CloudWatch · Compute Optimizer · Config ·
Control Tower · Health Dashboard · License Manager · Managed Grafana · Managed Prometheus ·
Organizations · Service Catalog · Systems Manager · Trusted Advisor · Well-Architected Tool
</details>

<details><summary>Serviços de Mídia</summary>

Elastic Transcoder · Kinesis Video Streams
</details>

<details><summary>Migração e Transferência</summary>

Application Migration Service · DataSync · DMS · Snow Family · Transfer Family
</details>

<details><summary>Redes e Entrega de Conteúdo</summary>

Client VPN · CloudFront · Direct Connect · Elastic Load Balancing · Global Accelerator ·
PrivateLink · Route 53 · Site-to-Site VPN · Transit Gateway · VPC
</details>

<details><summary>Segurança, Identidade e Conformidade</summary>

Artifact · Audit Manager · Certificate Manager (ACM) · CloudHSM · Cognito · Detective ·
Directory Service · Firewall Manager · GuardDuty · **IAM Identity Center** · Inspector ·
KMS · Macie · Network Firewall · Resource Access Manager (RAM) · Secrets Manager ·
Security Hub · Shield · WAF · IAM
</details>

<details><summary>Tecnologia Sem Servidor</summary>

AppSync · Fargate · Lambda
</details>

<details><summary>Armazenamento</summary>

Backup · EBS · EFS · FSx (todos os tipos) · S3 · S3 Glacier · Storage Gateway
</details>

## Nomenclatura oficial vs. nomenclatura das aulas

O guia usa **IAM Identity Center** — as aulas do Skill Builder (gravadas antes do reposicionamento
de marca) ainda dizem "AWS Single Sign-On" ou "AWS SSO". São o mesmo serviço. Os cards
usam o nome do guia; o nome antigo aparece entre parênteses na primeira menção.
