---
layout: dossie
titulo: "Domain 1 Review: Criação de arquiteturas seguras"
dominio: d1
aula: d1-review
tipo: review
fonte: "Skill Builder — Domain 1 Review (SAA-C03 PT-BR)"
processado: 2026-07-19
cards: 77
artefato: 04-mapa-mental
secao: Mapa mental
ordem: 4
---

## Mapa da aula

```mermaid
mindmap
  root((Domínio 1<br>Arquiteturas<br>Seguras - 30%))
    1.1 Acesso seguro
      Conta AWS
        Usuário raiz - permissões totais<br>NÃO alteráveis
        Proteger com MFA
        Não usar no dia a dia
      IAM - GLOBAL
        Usuários
        Grupos
        Roles
        Nascem SEM permissões
        Menor privilégio<br>limita o raio do impacto
      Políticas
        De identidade<br>quais recursos EU acesso
        De recurso<br>QUEM me acessa
        Principal só existe<br>na de recurso
        Ler e interpretar<br>não escrever avançadas
      Credenciais
        NUNCA hardcode
        STS - temporárias
        Federação por role
        Active Directory / IdP
      Políticas - 4 tipos
        Identidade CONCEDE
        Recurso CONCEDE
        Permissions boundary LIMITA
        SCP LIMITA
      Role vs Usuário
        Role - temporária<br>pessoas e serviços
        Usuário - longo prazo<br>só se não der role
      Multi-conta
        Organizations - teto via SCP
        Control Tower - guardrails
        Service Catalog<br>provisiona sem permissão
      Federação
        AWS SSO
        Directory Service
          Managed Microsoft AD<br>trust e +5000
          AD Connector<br>proxy nada na nuvem
          Simple AD - até 5000
      Monitoramento
        CloudTrail - QUEM chamou
        CloudWatch - comportamento
        VPC Flow Logs - tráfego
        Config - ESTADO do recurso
        Security Hub
        Access Analyzer
    1.2 Cargas e apps seguras
      VPC - REGIONAL
        Padrão e personalizada
        Subnet - ZONAL
        Pública vs privada
      Filtros
        Security Group<br>stateful - só permite
        Network ACL<br>stateless - permite e nega
        Tabelas de rota
        NAT Gateway
      Conectividade privada
        VPC Endpoint<br>sem IGW nem NAT
        PrivateLink<br>expõe UM serviço
        Peering<br>expõe a VPC inteira
        Transit Gateway
        Site-to-Site VPN
        Client VPN
        Direct Connect
      Proteção de app
        WAF - injeção SQL<br>só ALB, API GW, CloudFront
        Shield - DDoS<br>Standard vs Advanced
        GuardDuty - atividade
        Macie - PII no S3
        Cognito - user pool<br>e identity pool
        Secrets Manager<br>rotação automática
        Parameter Store
    1.3 Segurança de dados
      Criptografia
        Em repouso<br>roubo - uma parte
        Em trânsito<br>transferência - duas partes
        Texto simples
        Algoritmo
        Chave
        Texto cifrado
        Simétrica e assimétrica
      Chaves
        KMS - estudar a fundo
        CloudHSM
        ACM - trânsito
      S3
        Client-side<br>cifra antes de chegar
        Server-side via HTTPS
        SSE-C - chave do cliente
        SSE-S3 - chave do S3
        SSE-KMS - chave do KMS
      Conformidade
        Responsabilidade compartilhada
        AWS Artifact
        CAF - 5 capacidades
        Classificar os dados
        Defesa em profundidade<br>preventivo e detecção
      Backup e DR
        Backup e Restore
        Pilot Light
        Warm Standby
        Multi-Site Ativo/Ativo
        RPO vem da frequência
        Snapshots nativos
        S3 usa CRR
        AWS Backup - centraliza
        Storage Gateway - híbrido
```

## Como ler este mapa

O eixo de organização é a **estrutura oficial do guia do exame** — as três declarações de
tarefa —, e não os serviços. Isso é deliberado: a AWS escreve as questões a partir das task
statements, então o mapa espelha como você será testado. Um mapa organizado por serviço
ficaria mais bonito e menos útil.

O terceiro nível guarda o **discriminador**, não a definição. `PrivateLink → expõe UM
serviço` contra `Peering → expõe a VPC inteira` é o que resolve a questão; "PrivateLink é um
serviço de conectividade" não resolve nada.

## Ao terminar

Atualizado em `_estudo/d1/00-mapa-dominio.md`.
