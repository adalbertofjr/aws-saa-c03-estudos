---
layout: pagina
titulo: "Mapa do domínio 1: Criação de arquiteturas seguras"
dominio: d1
peso: 30
tipo: mapa-dominio
---

> Mapa vivo. Cada aula processada acrescenta ramos aqui. Este é o diagrama para revisar
> na véspera — o mapa individual de cada aula fica em `<slug>/04-mapa-mental.md`.

```mermaid
mindmap
  root((Domínio 1<br>Arquiteturas<br>Seguras - 30%))
    1.1 Acesso seguro aos recursos
      Conta e usuário raiz
        Permissões totais NÃO alteráveis
        MFA e não usar no dia a dia
      IAM - GLOBAL
        Usuários grupos roles
        Nascem sem permissões
        Menor privilégio
      Políticas
        Identidade - quais recursos acesso
        Recurso - quem me acessa
        Principal é o diferenciador
      Credenciais
        Nunca hardcode
        STS temporárias
        Federação por role e IdP
      Políticas - quatro tipos
        Identidade e recurso CONCEDEM
        Boundary e SCP LIMITAM
      Role vs Usuário
        Role temporária - padrão
        Usuário só se não der role
      Governança multi-conta
        Organizations - teto via SCP
        Control Tower - guardrails
        Service Catalog - launch role
      Federação
        AWS SSO
        Directory Service
      Rastreabilidade
        CloudTrail - quem chamou
        CloudWatch - comportamento
        VPC Flow Logs - tráfego
        Config - estado do recurso
    1.2 Cargas e aplicações seguras
      VPC REGIONAL
        Subnet ZONAL
        Padrão e personalizada
        Pública vs privada
      Filtros e roteamento
        Security Group stateful
        Network ACL stateless
        Tabelas de rota
        NAT Gateway
      Conectividade privada
        VPC Endpoint
        PrivateLink - um serviço
        Peering - VPC inteira
        Transit Gateway
        Site-to-Site e Client VPN
        Direct Connect
      Proteção de aplicação
        WAF injeção SQL
        Shield DDoS
        GuardDuty atividade
        Macie PII no S3
        Cognito user e identity pool
        Secrets Manager rotação
        Parameter Store
    1.3 Controles de segurança de dados
      Criptografia
        Em repouso e em trânsito
        Plaintext algoritmo chave ciphertext
        Simétrica e assimétrica
      Gestão de chaves
        KMS
        CloudHSM
        ACM em trânsito
      Criptografia no S3
        Client-side
        SSE-C SSE-S3 SSE-KMS
      Conformidade
        Responsabilidade compartilhada
        AWS Artifact
        CAF cinco capacidades
        Classificação de dados
        Defesa em profundidade
      Backup e DR
        Quatro estratégias
        RPO pela frequência
        Snapshots nativos
        S3 usa CRR
        AWS Backup centraliza
        Storage Gateway híbrido
```

## Aulas incorporadas

| Aula | Data | Ramos que acrescentou |
|---|---|---|
| [Domain 1 Review](d1-review/01-resumo.md) | 2026-07-19 | Estrutura completa das três declarações de tarefa — todos os ramos acima |
| ↳ módulo 5 corrigido | 2026-07-19 | Tipos de política, role vs. usuário, Service Catalog, Directory Service e os serviços de monitoramento |

## Lacunas do domínio
- **A aula não traz nenhum valor quantitativo** — define escopo, não detalhe. Os números foram levantados na documentação e incorporados a `d1-review/02-conteudo.md`: durações do STS (12 h / 36 h), banda de VPN (1,25 Gbps por túnel) e Direct Connect (1/10/100 Gbps), preço do Shield Advanced (US$ 3.000/mês), rotação do KMS (365 dias, faixa 90–2560), renovação do ACM (60 dias antes).
- **Resolvidos pela documentação:** lógica de avaliação de políticas do IAM · simétrica vs. assimétrica · rotação por tipo de chave · renovação no ACM · Shield Standard vs. Advanced · NACL da VPC padrão vs. personalizada · KMS vs. CloudHSM.
- **Ainda em aberto:** RTO por estratégia de DR · impacto quantitativo da criptografia em desempenho.
