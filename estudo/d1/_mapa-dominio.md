# Mapa acumulado — Criação de arquiteturas seguras

**Domínio 1 do SAA-C03** · Peso no exame: 30%

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
      Governança multi-conta
        Organizations
        Control Tower
        SCP limita não concede
        Rastreabilidade
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

## Lacunas do domínio
- **Módulo 5 do Domain 1 Review ("Encerramento") tem transcrição trocada** — texto em inglês sobre processo criativo. Recuperar no Skill Builder.
- **Serviços de rastreabilidade não nomeados** na revisão: CloudTrail, AWS Config, CloudWatch. Cobrados conceitualmente, ausentes do texto.
- **Organizations vs. Control Tower vs. SCP** — citados sem diferenciação.
- **Nenhum valor quantitativo** em toda a aula (capacidade de Direct Connect vs. VPN, duração de tokens STS, RPO/RTO por estratégia de DR, impacto de criptografia em desempenho). A revisão define escopo, não detalhe — os números virão do Domain 1 Practice e da documentação.
- **Pendentes de estudo dirigido:** lógica de avaliação de políticas do IAM · simétrica vs. assimétrica · tipos de chave do KMS e frequência de rotação · renovação de certificados no ACM · Shield Standard vs. Advanced · configuração inicial de segurança da VPC padrão vs. personalizada.
