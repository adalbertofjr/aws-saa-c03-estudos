---
layout: pagina
titulo: "Índice acumulado de serviços AWS"
tipo: indice
---

Todos os serviços vistos em qualquer aula. **Folha de consulta única para a semana do exame.**

Atualizado a cada aula processada. Antes de gerar flashcards, a fase *Plan* consulta esta
tabela: serviço já listado não gera card de definição de novo — gera card de discriminação.

`†` = detalhe [fora da transcrição] · `⚠️` = pendente de documentação

| Serviço | Categoria | Em uma linha | Discriminador principal | Aulas |
|---|---|---|---|---|
| **IAM** | Segurança e identidade | Quem pode fazer o quê nos recursos AWS | **Global**; identidades nascem sem permissões | [d1-review](d1/d1-review/01-resumo.md) |
| **AWS STS** | Segurança e identidade | Emite credenciais temporárias | AssumeRole até **12 h**; GetSessionToken até **36 h** | [d1-review](d1/d1-review/01-resumo.md) |
| **Amazon Cognito** | Segurança e identidade | Identidade para aplicações; SSO e federação | Usuário **final de app**; user pool autentica, identity pool dá credencial AWS | [d1-review](d1/d1-review/01-resumo.md) |
| **AWS Single Sign-On** | Segurança e identidade | Acesso centralizado a várias contas e apps | **Funcionário**, não usuário final de app † | [d1-review](d1/d1-review/01-resumo.md) |
| **AWS Organizations** | Gerenciamento e governança | Gestão de múltiplas contas | Container das contas; habilita SCP | [d1-review](d1/d1-review/01-resumo.md) |
| **AWS Control Tower** | Gerenciamento e governança | Landing zone multi-conta governada | Provisiona ambiente com guardrails ⚠️ | [d1-review](d1/d1-review/01-resumo.md) |
| **SCP** | Gerenciamento e governança | Teto de permissões das contas da organização | **Limita, nunca concede**; resultado é interseção | [d1-review](d1/d1-review/01-resumo.md) |
| **AWS Artifact** | Gerenciamento e governança | Portal de documentos de conformidade | "O auditor pediu o relatório" — não é operacional | [d1-review](d1/d1-review/01-resumo.md) |
| **Amazon VPC** | Rede | Rede virtual isolada | **Regional**; tipos padrão e personalizada | [d1-review](d1/d1-review/01-resumo.md) |
| **Subnet** | Rede | Onde os recursos rodam dentro da VPC | **Zonal**; pública = tem rota para IGW † | [d1-review](d1/d1-review/01-resumo.md) |
| **Security Group** | Rede | Filtro no nível da instância | **Stateful**, só permite † | [d1-review](d1/d1-review/01-resumo.md) |
| **Network ACL** | Rede | Filtro no nível da subnet | **Stateless**; padrão permite tudo, personalizada **nega tudo** | [d1-review](d1/d1-review/01-resumo.md) |
| **NAT Gateway** | Rede | Saída para internet de subnet privada | Só saída; para serviço AWS use endpoint | [d1-review](d1/d1-review/01-resumo.md) |
| **VPC Endpoint** | Rede | Acesso a serviço AWS sem IGW nem NAT | Tráfego não sai para a internet | [d1-review](d1/d1-review/01-resumo.md) |
| **AWS PrivateLink** | Rede | Expõe **um serviço** a muitas VPCs | Escala sem peering e sem expor o resto da VPC | [d1-review](d1/d1-review/01-resumo.md) |
| **VPC Peering** | Rede | Conecta duas VPCs | Expõe a **VPC inteira**; não escala | [d1-review](d1/d1-review/01-resumo.md) |
| **Transit Gateway** | Rede | Hub de conexão de redes | Hub-and-spoke para muitas VPCs † ⚠️ | [d1-review](d1/d1-review/01-resumo.md) |
| **Site-to-Site VPN** | Rede | Túnel IPsec on-premises ↔ VPC | **1,25 Gbps**/túnel, 2 túneis; sobe em minutos | [d1-review](d1/d1-review/01-resumo.md) |
| **Client VPN** | Rede | VPN de usuário final para a VPC | **Indivíduo**, não rede inteira | [d1-review](d1/d1-review/01-resumo.md) |
| **Direct Connect** | Rede | Link físico dedicado | **1/10/100 Gbps**, latência sub-10 ms; semanas para provisionar | [d1-review](d1/d1-review/01-resumo.md) |
| **AWS WAF** | Segurança | Firewall de aplicação web | **Injeção SQL**; só ALB, API GW e CloudFront | [d1-review](d1/d1-review/01-resumo.md) |
| **AWS Shield** | Segurança | Proteção contra DDoS | Standard grátis; **Advanced US$ 3.000/mês** + cost protection e SRT | [d1-review](d1/d1-review/01-resumo.md) |
| **Amazon GuardDuty** | Segurança | Detecção de ameaças | Analisa **atividade**, não conteúdo † | [d1-review](d1/d1-review/01-resumo.md) |
| **Amazon Macie** | Segurança | ML para classificar dados sigilosos | **PII no S3** | [d1-review](d1/d1-review/01-resumo.md) |
| **AWS Secrets Manager** | Segurança | Armazena segredos com rotação | A palavra **rotação** decide contra o Parameter Store | [d1-review](d1/d1-review/01-resumo.md) |
| **SSM Parameter Store** | Gerenciamento | Armazena parâmetros e configuração | Sem rotação nativa; mais barato † | [d1-review](d1/d1-review/01-resumo.md) |
| **AWS KMS** | Segurança | Gerenciamento de chaves | Padrão do exame; rotação **365 d** (90–2560), só simétricas | [d1-review](d1/d1-review/01-resumo.md) |
| **AWS CloudHSM** | Segurança | HSM dedicado | **Single-tenancy** sob seu controle + PKCS#11/JCE (não mais o FIPS) | [d1-review](d1/d1-review/01-resumo.md) |
| **AWS Certificate Manager** | Segurança | Provisiona e renova certificados | Renova **60 d antes**, se em uso e CNAME publicado | [d1-review](d1/d1-review/01-resumo.md) |
| **Amazon S3** | Armazenamento | Armazenamento de objetos | SSE-C / SSE-S3 / SSE-KMS; DR por **CRR** | [d1-review](d1/d1-review/01-resumo.md) |
| **Amazon EBS** | Armazenamento | Volume de blocos | Backup por **snapshot**; criptografar o volume é o menor esforço | [d1-review](d1/d1-review/01-resumo.md) |
| **AWS Backup** | Armazenamento | Backup centralizado multi-serviço | "Centralizado" no enunciado; copia entre Regiões | [d1-review](d1/d1-review/01-resumo.md) |
| **AWS Storage Gateway** | Migração e transferência | Ponte on-premises ↔ AWS | Resposta padrão para **híbrido** | [d1-review](d1/d1-review/01-resumo.md) |
| **Amazon EFS** | Armazenamento | Sistema de arquivos gerenciado | Backup via AWS Backup ⚠️ | [d1-review](d1/d1-review/01-resumo.md) |
| **Amazon FSx** | Armazenamento | Sistemas de arquivos gerenciados | Windows File Server e Lustre ⚠️ | [d1-review](d1/d1-review/01-resumo.md) |
| **Amazon EC2** | Computação | Instâncias virtuais | Coberto pelo AWS Backup ⚠️ | [d1-review](d1/d1-review/01-resumo.md) |
| **Amazon RDS** | Banco de dados | Banco relacional gerenciado | Backup por **snapshot** ⚠️ | [d1-review](d1/d1-review/01-resumo.md) |
| **Amazon Aurora** | Banco de dados | Relacional compatível MySQL/PostgreSQL | Snapshot de cluster ⚠️ | [d1-review](d1/d1-review/01-resumo.md) |
| **Amazon DynamoDB** | Banco de dados | NoSQL gerenciado | Tem **backup**, não snapshot ⚠️ | [d1-review](d1/d1-review/01-resumo.md) |
| **Amazon Redshift** | Análise | Data warehouse | Backup por snapshot ⚠️ | [d1-review](d1/d1-review/01-resumo.md) |
| **Amazon Neptune** | Banco de dados | Banco de grafos | Backup por snapshot ⚠️ | [d1-review](d1/d1-review/01-resumo.md) |
| **Amazon DocumentDB** | Banco de dados | Banco de documentos | Backup e restauração ⚠️ | [d1-review](d1/d1-review/01-resumo.md) |

## Mapa de decisão rápida

| Se o enunciado disser... | Pense em... | Cuidado com |
|---|---|---|
| "rotação automática de credenciais" | Secrets Manager | Parameter Store (sem rotação nativa) |
| "latência consistente" ou "circuito privado dedicado" | Direct Connect | VPN (usa a internet) |
| "subir a conexão rapidamente" / baixo custo | Site-to-Site VPN | Direct Connect (semanas) |
| "proteção contra o custo de escalonamento em DDoS" | Shield **Advanced** | Shield Standard |
| "acesso à equipe de resposta a DDoS" | Shield **Advanced** | Shield Standard |
| "HSM sob meu controle" / "PKCS#11 ou JCE" | CloudHSM | KMS |
| "auditar cada uso da chave" | SSE-KMS | SSE-S3 |
| "chave assimétrica precisa rotacionar" | rotação **manual** | rotação automática (só simétrica) |
| "identificar PII" + "no S3" | Macie | GuardDuty (analisa atividade, não conteúdo) |
| "injeção SQL" | WAF | Shield (é para DDoS) |
| "ataque DDoS" | Shield | WAF (é camada de aplicação) |
| "expor app a muitas VPCs/contas" | PrivateLink | VPC Peering (expõe a VPC inteira) |
| "sem Internet Gateway nem NAT" para serviço AWS | VPC Endpoint | NAT Gateway |
| "ambiente híbrido" + backup | Storage Gateway | — |
| "backup centralizado de vários serviços" | AWS Backup | somar snapshots nativos |
| "relatório de conformidade / auditor" | AWS Artifact | serviços operacionais |
| "menor esforço operacional" + dado já em EBS | criptografar o volume EBS | mover para S3 |
| "padrão de acesso imprevisível" | S3 Intelligent-Tiering | S3 Lifecycle |
| "padrão de acesso previsível / por idade" | S3 Lifecycle | Intelligent-Tiering |
| "usuários já existem no diretório corporativo" | role + federação + STS | criar usuários IAM |
| "impor padrão que a conta-membro não contorne" | SCP | política de identidade |
| "copiar objetos para outra Região continuamente" | S3 CRR | snapshot |
| "seguindo as práticas recomendadas" + operação diária | qualquer coisa menos o usuário raiz | — |
