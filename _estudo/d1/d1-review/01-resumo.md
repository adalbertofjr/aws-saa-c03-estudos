---
layout: dossie
titulo: "Domain 1 Review: Criação de arquiteturas seguras"
dominio: d1
aula: d1-review
tipo: review
fonte: "Skill Builder — Domain 1 Review (SAA-C03 PT-BR)"
processado: 2026-07-19
cards: 63
artefato: 01-resumo
secao: Resumo
ordem: 1
---

## Em uma frase
Segurança não é um tópico do exame — é um critério de desempate em **todos** os tópicos:
quando duas respostas resolvem o requisito, a mais segura é a correta.

## As três declarações de tarefa
| # | Tarefa | Núcleo |
|---|---|---|
| 1.1 | Projetar acesso seguro aos recursos da AWS | Contas, IAM, políticas, STS, federação, Organizations/SCP, rastreabilidade |
| 1.2 | Projetar cargas de trabalho e aplicações seguras | VPC, SG/NACL, rotas, endpoints/PrivateLink, conectividade híbrida, WAF/Shield, segredos |
| 1.3 | Determinar controles de segurança de dados | Criptografia em repouso e em trânsito, KMS/CloudHSM, S3 SSE, conformidade, backup e DR |

## Decisões e trade-offs
- **Secrets Manager vs. Parameter Store** — Secrets Manager quando houver **rotação automática** de credenciais em intervalo definido. Parameter Store para configuração sem rotação.
- **KMS vs. CloudHSM** — `[doc]` CloudHSM quando exigirem **single-tenancy sob seu controle** ou as interfaces **PKCS#11/JCE**; KMS no resto. O argumento do FIPS caducou — ver `02-conteudo.md`.
- **PrivateLink vs. VPC Peering** — Peering não escala (sobrecarga de gerenciamento) e **expõe as demais aplicações** da VPC emparelhada. PrivateLink expõe *uma* aplicação a dezenas/centenas de VPCs sem IGW, NAT ou peering.
- **EBS criptografado vs. transferir para S3 criptografado** — para dados gerados numa instância com volume EBS, o **menor esforço é criptografar o próprio volume EBS**.
- **Política de identidade vs. de recurso** — identidade controla *quais recursos* aquela identidade acessa; recurso controla *quem* acessa aquele recurso. A política de recurso tem o elemento `Principal`; a de identidade não.
- **Shield Standard vs. Advanced** e **WAF vs. Shield** — WAF trata camada de aplicação (ex.: injeção SQL); Shield trata DDoS.
- **S3 Lifecycle vs. Intelligent-Tiering** — Lifecycle quando o padrão de acesso é **previsível** (regra por idade); Intelligent-Tiering quando é imprevisível.

## Números e fatos para memorizar
- **IAM é global.** Protege os dados do IAM em todas as Regiões.
- **VPC é regional.** Existe em uma Região e uma conta.
- **Subnet é zonal** — recurso resiliente ao nível de Zona de Disponibilidade.
- **Usuário raiz tem permissões totais e não alteráveis** → comprometê-lo compromete todo o ambiente. Proteger com MFA e não usar no dia a dia.
- **Identidades IAM nascem sem nenhuma permissão.**
- **Nunca hardcode credenciais** em aplicação. Usar roles.
- **AWS WAF só se implanta em:** Application Load Balancer, Amazon API Gateway e Amazon CloudFront.
- **S3 SSE tem 3 modos:** SSE-C (chave do cliente), SSE-S3 (chave gerenciada pelo S3), SSE-KMS.
- **Macie** descobre e classifica dados sigilosos (PII) **no S3**, usando machine learning.
- **4 estratégias de DR**, em ordem crescente de custo e complexidade: Backup & Restore → Pilot Light → Warm Standby → Multi-Site Active/Active.
- **Cloud Adoption Framework, perspectiva de segurança — 5 capacidades:** IAM, controles de detecção, segurança de infraestrutura, proteção de dados, resposta a incidentes.
- **Defesa em profundidade:** sobrepor controles **preventivos** e **de detecção**.
- **3 tipos de dados:** objeto, arquivo, bloco.

## Confusões prováveis no exame
- **SG vs. NACL:** [fora da transcrição] SG é stateful e só permite; NACL é stateless, avalia permitir/negar em ordem numérica e exige regra de retorno.
- **Cognito user pool vs. identity pool:** user pool autentica; identity pool entrega credenciais AWS temporárias.
- **Criptografia em repouso vs. em trânsito:** repouso protege contra acesso não autorizado e roubo, geralmente **uma parte** envolvida; trânsito protege dados entre dois locais, **duas ou mais partes**.
- **AWS Artifact** é o portal de autoatendimento para baixar documentos de conformidade e acordos — não é ferramenta de segurança operacional.
- **Storage Gateway** é a resposta padrão para **ambientes híbridos**.

## Respondido pela documentação (ver `02-conteudo.md`)
A aula levanta várias perguntas sem respondê-las. Foram completadas e viraram cards:
lógica de avaliação de políticas do IAM · durações do STS · NACL padrão vs. personalizada ·
Shield Standard vs. Advanced (custo e recursos) · KMS vs. CloudHSM e uso conjunto · rotação
de chaves · simétrica vs. assimétrica · renovação no ACM · Direct Connect vs. VPN.

## Lacunas
- ⚠️ **A transcrição do módulo 5 ("Encerramento do domínio 1") está trocada** — traz um texto em inglês sobre processo criativo, sem relação com AWS. Recuperar no Skill Builder se houver conteúdo real.
- ⚠️ Rastreabilidade é cobrada sem que a aula nomeie CloudTrail, Config ou CloudWatch.
- ⚠️ Organizations vs. Control Tower citados sem diferenciação — estudar separadamente.
- ⚠️ Impacto quantitativo da criptografia em desempenho (RDS + KMS, leitura do S3): sem valores publicados utilizáveis.
- ⚠️ RTO não é mencionado na aula, apenas RPO.
