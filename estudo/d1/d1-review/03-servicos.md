# Serviços AWS — Domain 1 Review: Criação de arquiteturas seguras

**Domínio:** d1 · **Fonte:** Skill Builder — Domain 1 Review (SAA-C03 PT-BR) · **Processado em:** 2026-07-19

Marcações: sem rótulo = veio da transcrição · `†` = [fora da transcrição] · `⚠️` = lacuna.

## Identidade e acesso

| Serviço | O que é | Papel nesta aula | Quando usar | Quando NÃO usar (alternativa) | Limites / números | Tags Anki |
|---|---|---|---|---|---|---|
| **AWS IAM** | Controle de quem pode fazer o quê nos recursos AWS | Base da tarefa 1.1 | Sempre — identidades e permissões dentro da conta | Identidades já existentes fora da AWS → federação via role | **Serviço global**; identidades nascem **sem permissões** | `d1 IAM def` |
| **AWS STS** | Emite credenciais temporárias | Assumir roles dentro e entre contas | Acesso temporário, cross-account, federação | Acesso permanente de carga interna → role atribuída ao serviço | ⚠️ duração dos tokens não citada | `d1 STS def` |
| **Amazon Cognito** | Identidade para aplicações; SSO e federação de IDs | Citado como fonte provável de questão de cenário | Autenticar usuários de app web/mobile e dar credenciais AWS | Federação de funcionários corporativos → IAM Identity Center / AD † | user pools vs. identity pools | `d1 Cognito disc` |
| **AWS Single Sign-On** | Acesso centralizado a múltiplas contas/apps | Citado na lista de integração de segurança | Funcionários acessando várias contas AWS | Usuários finais de aplicação → Cognito † | ⚠️ hoje chamado IAM Identity Center † | `d1 SSO def` |
| **AWS Organizations** | Gestão de múltiplas contas | Estratégia de segurança multi-conta | Consolidar contas e aplicar SCPs | Conta única | ⚠️ não diferenciado na aula | `d1 Organizations def` |
| **AWS Control Tower** | Landing zone multi-conta governada | Impor padrões de segurança | Provisionar ambiente multi-conta com guardrails | Já existe Organizations maduro † | ⚠️ não diferenciado na aula | `d1 ControlTower def` |
| **SCP** | Política que limita o **máximo** de permissões de contas na organização | Impor padrões que a conta-membro não contorna | Teto de permissão organizacional | Conceder permissão — SCP **não concede**, só limita † | Aplica-se a Organizations | `d1 SCP disc` |

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
| **Site-to-Site VPN** | Túnel IPsec on-premises ↔ VPC | Conexão privada externa | Conectar data center à VPC pela internet, criptografado | Banda dedicada e latência estável → Direct Connect † | ⚠️ capacidade não citada | `d1 VPN disc` |
| **Client VPN** | VPN de usuário final para a VPC | Conexão privada externa | Acesso remoto de indivíduos | Conexão de rede inteira → Site-to-Site † | ⚠️ não detalhado | `d1 VPN disc` |
| **Direct Connect** | Link físico dedicado para a AWS | Conexão privada externa | Banda alta, latência consistente, tráfego previsível † | Precisa subir rápido / baixo custo → VPN † | ⚠️ capacidade não citada | `d1 DirectConnect disc` |

## Proteção de aplicações e segredos

| Serviço | O que é | Papel nesta aula | Quando usar | Quando NÃO usar (alternativa) | Limites / números | Tags Anki |
|---|---|---|---|---|---|---|
| **AWS WAF** | Firewall de aplicação web | Proteção de camada 7 | **Injeção SQL**, XSS, regras HTTP | Ataque DDoS volumétrico → Shield | **Só em ALB, API Gateway e CloudFront** | `d1 WAF num` |
| **AWS Shield** | Proteção contra DDoS | Proteção de camada de rede | Ataques **DDoS** externos | Ataque de aplicação → WAF | Standard vs. Advanced ⚠️ | `d1 Shield disc` |
| **Amazon GuardDuty** | Detecção de ameaças | Citado na lista de integração | Detectar atividade maliciosa/anômala † | Classificar dados sigilosos → Macie | — | `d1 GuardDuty disc` |
| **Amazon Macie** | ML para descobrir e classificar dados sigilosos | Serviço-resposta para **PII** | Encontrar PII **no S3** | Dados fora do S3 † | **Escopo: S3** | `d1 Macie cen` |
| **AWS Secrets Manager** | Armazena segredos com rotação | Trade-off resolvido na aula | Alto volume + **alternância automática** de credenciais | Sem rotação, sensível a custo → Parameter Store | Força rotação em **intervalo de dias** | `d1 SecretsManager disc` |
| **SSM Parameter Store** | Armazena parâmetros e configuração | Contraparte do Secrets Manager | Configuração e segredos simples | Precisa rotação automática → Secrets Manager | — | `d1 ParameterStore disc` |

## Criptografia e conformidade

| Serviço | O que é | Papel nesta aula | Quando usar | Quando NÃO usar (alternativa) | Limites / números | Tags Anki |
|---|---|---|---|---|---|---|
| **AWS KMS** | Gerenciamento de chaves | "Estude a fundo" — ênfase explícita | Padrão para chaves; integrado aos serviços | Exige HSM dedicado / FIPS de tenant único → CloudHSM † | Chaves raiz vs. chaves de dados ⚠️ | `d1 KMS disc` |
| **AWS CloudHSM** | HSM dedicado | Contraparte do KMS | Controle exclusivo das chaves, exigência regulatória † | Caso geral → KMS † | Tenant único † | `d1 CloudHSM disc` |
| **AWS Certificate Manager** | Provisiona e renova certificados | Criptografia **em trânsito** | TLS em ALB, CloudFront, API Gateway † | — | ⚠️ mecânica de renovação | `d1 ACM def` |
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

⚠️ A aula levanta a comparação como pergunta e **não a responde**. Confirmar na documentação.

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
Todos os acima. `estudo/_indice-servicos.md` atualizado com 30 entradas.
