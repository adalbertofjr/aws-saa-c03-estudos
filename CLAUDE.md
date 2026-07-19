# Estudos — AWS Certified Solutions Architect – Associate (SAA-C03, PT-BR)

Idioma de todo o conteúdo gerado: **português (Brasil)**. Nomes de serviços AWS e termos
técnicos permanecem em inglês (ex.: "Security Group", "cross-Region replication").

O produto deste repositório é um **dossiê de estudo por aula**. Os flashcards são a última
camada — memorização do que já foi compreendido —, não o objetivo.

## Metodologia: RPI (Research → Plan → Implement)

Cada aula do Skill Builder passa pelas três fases. Nunca pule para Implement.

### R — Research
Ler a transcrição bruta em `transcricoes/<dominio>/<slug>.md` e extrair, sem inventar:
- serviços AWS citados e o papel de cada um;
- decisões de arquitetura e os *trade-offs* declarados;
- números concretos (limites, SLAs, durabilidade, tamanhos, tempos);
- termos que a AWS costuma usar como "pegadinha" no exame (pares confundíveis).

### P — Plan
Antes de escrever:
1. **Inventariar os serviços** da aula e conferir contra `_estudo/00-indice-servicos.md`.
   Serviço já visto **não** gera card de definição de novo — gera card de *discriminação*
   contra o novo contexto. Sem esse passo, 18 treinamentos que reciclam os mesmos serviços
   produzem centenas de cards duplicados.
2. Decidir o destino de cada conceito: conteúdo, tabela de serviços, mapa, flashcard.
   Regra de corte para flashcard: **um fato atômico testável**. Se a resposta precisa de
   3+ frases, o lugar dela é `02-conteudo.md`, não um card.

### I — Implement
Gerar os 5 artefatos, atualizar os dois acumuladores (`00-indice-servicos.md` e
`<dominio>/00-mapa-dominio.md`) e registrar em `revisao/log.md`.

## Os 5 artefatos

Para `transcricoes/<dominio>/<slug>.md`, gerar em `_estudo/<dominio>/<slug>/`:

| # | Arquivo | Propósito |
|---|---|---|
| 1 | `01-resumo.md` | 1 página orientada a decisão. Primeira leitura e revisão de véspera. |
| 2 | `02-conteudo.md` | Material didático: a aula reescrita como texto de estudo. Extensão conforme a fonte — ver abaixo. |
| 3 | `03-servicos.md` | Tabela de referência dos serviços AWS da aula + pares confundíveis. |
| 4 | `04-mapa-mental.md` | Mermaid `mindmap` da aula. |
| 5 | `05-flashcards.csv` | Anki, 15–30 cards. |

`<dominio>` ∈ `d1` (seguras), `d2` (resilientes), `d3` (alto desempenho),
`d4` (custo otimizado), `geral` (visão do exame, práticas, simulados).

Templates correspondentes em `00-processo/template-0N-*.md`.

### Acumuladores (atualizados a cada aula)
- `_estudo/00-indice-servicos.md` — todos os serviços vistos até agora, com link para as
  aulas onde aparecem. É a folha de consulta única da semana do exame.
- `_estudo/<dominio>/00-mapa-dominio.md` — mapa mental do domínio inteiro, crescendo a cada
  aula. Mostra como o conteúdo novo se encaixa no anterior.

## Densidade: deixar a fonte mandar

O erro a evitar é **inflar prosa sobre material fino**. Uma aula de *Review* define escopo
— diz o que estudar, sem ensinar. Transformá-la em 10 páginas produz texto de enchimento
que ninguém relê. Calibrar por tipo de fonte:

| Tipo de aula | `02-conteudo.md` | Por quê |
|---|---|---|
| **Review** (revisão de domínio) | **3–4 páginas, enxutas** | É um checklist de escopo. Preferir tabelas e listas a parágrafos explicativos. |
| **Practice** (questões comentadas) | **8–10 páginas** | Há conteúdo real: cada questão traz raciocínio de eliminação e justificativa. |
| **SimuLearn** (laboratório) | **5–8 páginas** | Cenário + implementação. Registrar as decisões de arquitetura e os passos do lab. |
| **Simulados / Question Sets** | **conforme os erros** | Só o que você errou merece texto. Acertos viram uma linha. |

Teste antes de escrever um parágrafo: *isto ensina algo, ou só reafirma que o tópico
existe?* Se for o segundo, vira item de lista.

## Conteúdo além da transcrição

Enriquecer é **esperado**, não apenas permitido — a transcrição é fala corrida e costuma
omitir os limites e comparações que o exame cobra.

**Regra ativa:** onde a aula apenas *levanta uma pergunta sem respondê-la* (ex.: "por que
usar KMS em vez de CloudHSM?", "qual a diferença entre Shield Standard e Advanced?"),
pesquisar na documentação AWS e **completar a resposta**, marcada com `[doc]` e com a fonte
listada no fim de `02-conteudo.md`. Uma pergunta retórica do instrutor é um pedido de estudo
dirigido — deixá-la em aberto transfere para a véspera do exame um trabalho que cabia aqui.

Toda afirmação fora da transcrição leva marcador — ver **Procedência**, abaixo.

**Nunca inventar números.** Limite, SLA ou preço sem respaldo na transcrição e sem
confirmação na documentação → marcar `⚠️ LACUNA:` e seguir. Um número errado memorizado em
flashcard custa mais caro que uma lacuna conhecida.

## Procedência: os quatro marcadores

Todo fato no dossiê carrega sua origem, para você saber em que confiar:

| Marcador | Significa | Confiabilidade |
|---|---|---|
| *(sem marcador)* | veio da transcrição | o que a aula afirmou |
| `†` ou `[fora da transcrição]` | conhecimento meu, não verificado nesta sessão | tratar com ceticismo |
| `[doc]` | **confirmado na documentação AWS**, com a fonte listada no fim de `02-conteudo.md` | pode memorizar |
| `⚠️ LACUNA` | **não foi possível confirmar** | buraco conhecido, não preencher de cabeça |

`⚠️` nunca é usado para o que apenas dava trabalho pesquisar, nem para nuances já
confirmadas — só para o que permanece em aberto.

## Como construir um flashcard

O exame não recompensa recall — recompensa **eliminação de alternativas**. O guia oficial
define pegadinha (*distractor*) como "resposta plausível que corresponde à área de
conteúdo": a opção errada é escolhida por quem sabe menos, não por quem não sabe nada. Um
card treina para o exame só quando treina esse mesmo músculo.

### O teste de admissão

Antes de escrever qualquer card, uma pergunta:

> **Este card ajuda a eliminar uma alternativa numa questão de prova?**

Se a resposta é não, o card não deveria existir — o fato pertence a `02-conteudo.md`, não a
`05-flashcards.csv`.

### Formato do card de cenário (`cen`)

Espelha a anatomia oficial da questão — requisito + condição → melhor solução —, com a
pegadinha nomeada no Extra:

```
Frente: <Requisito>. <Condição/restrição>. Qual a solução?
Verso:  <Serviço ou ação>
Extra:  <Por que atende.> ⚠ Armadilha: <serviço plausível> — <por que perde>
```

O campo **Armadilha é obrigatório em `cen` e `disc`**. Sem ela, o card testa "qual serviço
faz X" — o exame testa "qual dos dois serviços plausíveis faz X melhor, dada a restrição".

### Critério por tipo e mix-alvo

| Tipo | Admite | Meta no deck |
|---|---|---|
| `cen` | requisito + restrição → serviço, com armadilha nomeada | **≥ 35%** |
| `disc` | X vs. Y com o fator decisivo, com armadilha nomeada | **≥ 35%** |
| `num` | **só** limite que elimina alternativa (ex.: WAF só em ALB/API GW/CloudFront) | ≤ 20% |
| `def` | **só** quando a própria definição já é o discriminador | ≤ 10% |

Se um deck sair com `def`+`num` somando mais da metade, ele está ensinando trivia, não
prova. Confira a proporção antes de fechar a aula.

### Quatro proibições

1. **Preço em qualquer forma.** Valores mudam, e a calculadora de preços da AWS responde
   isso — o exame não pergunta quanto custa. O que importa é a **relação**: "Shield Advanced
   é pago com compromisso anual; Standard é automático e gratuito" é `disc` válido, sem
   nenhum número de dólar.
2. **Meta-card sobre a aula.** O card é sobre a AWS, nunca sobre o vídeo. Proibido "segundo
   o instrutor", "este módulo nomeia", "a aula avisa que". Se o fato só existe porque o
   instrutor disse, ele não é testável — vira nota ou lacuna, não card.
3. **Enumeração decorativa.** Uma lista vira card apenas se a prova puder pedir para
   **escolher um item dela** ("qual das 3 opções de SSE do S3 atende a X" → sim; "quais as
   5 capacidades do CAF" → não, é recitação).
4. **Definição sem rival.** "O que é uma política na AWS?" não elimina nada. Se não há um
   segundo serviço ou conceito contra o qual comparar, reescreva como `cen` ou descarte.

### Nomenclatura

Usar os nomes do **guia oficial do exame**, não os do vídeo, quando divergirem — ex.: o
guia diz **IAM Identity Center**, aulas mais antigas dizem "AWS Single Sign-On". Registrar o
nome antigo entre parênteses na primeira menção de `02-conteudo.md`.

## Contrato do CSV para Anki

Deck único `SAA-C03` — a separação é por tag, não por subdeck.

Delimitador `;` (vírgula aparece demais no conteúdo PT-BR). As três diretivas abaixo são
obrigatórias no topo do arquivo; o Anki as consome e configura a importação sozinho:

```
#separator:;
#html:true
#tags column:4
```

Colunas: `Frente;Verso;Extra;Tags`

- **Frente** — uma pergunta só. Nunca "e/ou", nunca duas coisas.
- **Verso** — resposta mínima suficiente. Sem preâmbulo ("A resposta é...").
- **Extra** — o *porquê*, e em `cen`/`disc` a armadilha nomeada (ver seção acima).
- **Tags** — separadas por espaço, nesta ordem:
  `SAA-C03 <dominio> <tarefa> <servico> <tipo>` — ex.: `SAA-C03 d1 t1.2 PrivateLink cen`

`<tarefa>` é a declaração de tarefa oficial do domínio (`t1.1`, `t1.2`, `t1.3`, `t2.1`...) —
ver `_estudo/00-guia-do-exame.md`. Torna a cobertura auditável: dá para perguntar quais
habilidades do guia ainda não têm card, em vez de confiar em impressão de completude.

`<tipo>` ∈ `def` · `disc` · `num` · `cen` — critério de admissão de cada um na seção acima.
Permite estudo filtrado: `tag:disc`, `deck:SAA-C03 tag:d3`, `tag:t1.2`.

Escapar: nenhum campo pode conter `;` — usar `,` ou reescrever. Quebra de linha dentro de
campo apenas como `<br>` (por isso `#html:true`).

Cobertura alvo: 15–30 cards por aula de 45min. Menos indica extração rasa; muito mais
indica que fatos não-testáveis viraram card. Rodar `00-processo/validar-cards.sh` no CSV
antes de considerar a aula fechada.

## Sintaxe Mermaid (mapas mentais)

```
mindmap
  root((Título<br>em duas linhas))
    Ramo
      Folha
```
Evitar `(`, `)` e `:` dentro do texto dos nós — quebram o parser. Quebra de linha: `<br>`.
Validar em mermaid.live ou no preview do VS Code antes de considerar pronto.

## Fluxo de trabalho

1. Colar a transcrição em `transcricoes/<dominio>/<slug>.md`, com cabeçalho:
   `# <título da aula>` e `Fonte: Skill Builder — <curso> — <módulo>`.
2. Pedir: `processar transcricoes/d1/<slug>.md`.
3. Revisar. Corrigir erros **no arquivo**, não no chat — o arquivo é a fonte da verdade.
4. Rodar `bash 00-processo/validar-cards.sh _estudo/<dominio>/<slug>/05-flashcards.csv` —
   corrige até passar sem violações.
5. Importar o CSV no Anki: *File → Import*, tipo de nota `Basic`, deck `SAA-C03`.
   Se o modelo `Basic` não tiver campo Extra, concatenar Extra no fim do Verso.
6. Registrar em `revisao/log.md`.

## Coerência entre os cinco artefatos

Os cinco arquivos de um dossiê descrevem os mesmos fatos em formatos diferentes. **Ao
revisar um deles, propagar a mudança para os outros quatro na mesma passada.**

Um fato corrigido em `02-conteudo.md` e não propagado deixa `03-servicos.md` afirmando o
contrário — e você memoriza o errado, porque o card veio do arquivo desatualizado. É o modo
de falha mais caro deste repositório: não perde tempo, ensina errado.

Checklist ao revisar qualquer artefato:
1. O fato mudou em `02-conteudo.md`? → conferir `01-resumo.md` e `03-servicos.md`.
2. Uma `⚠️ LACUNA` foi respondida? → **remover a marca em todos os arquivos**, não só onde
   escrevi a resposta, e trocar por `[doc]`.
3. O discriminador de um serviço mudou? → atualizar `_estudo/00-indice-servicos.md`, incluindo
   o **mapa de decisão rápida**.
4. Card afetado? → corrigir a linha no CSV **e reimportar** (o Anki atualiza pela Frente
   idêntica; Frente alterada cria card novo e deixa o antigo órfão).
5. `grep -rn "⚠️" _estudo/<dominio>/<slug>/` — o que sobrar deve ser lacuna real.

## Publicação (GitHub Pages)

O repositório é **público** e serve o site em
`https://adalbertofjr.github.io/aws-saa-c03-estudos/`. Isso impõe duas regras.

**`transcricoes/` nunca é versionada.** É material licenciado de curso pago da AWS —
publicá-lo seria redistribuição indevida. Está no `.gitignore` e foi purgada do histórico.
Vive apenas na máquina local. O que se publica é o material derivado: os dossiês.

**Todo dossiê nasce com front matter**, senão o Jekyll não o renderiza (arquivo sem front
matter é copiado como estático). Os `.md` ficam em `_estudo/` — o underscore é exigência de
coleção do Jekyll, e arquivos iniciados por `_` são ignorados na build, por isso os
acumuladores usam o prefixo `00-`.

```yaml
---
layout: dossie          # dossie para os artefatos; pagina para acumuladores
titulo: "Domain 1 Review: Criação de arquiteturas seguras"
dominio: d1             # d1..d4 | geral
aula: d1-review         # o slug — agrupa os artefatos de uma mesma aula
tipo: review            # review | practice | simulearn | simulado
fonte: "Skill Builder — ..."
processado: 2026-07-19
cards: 63
artefato: 01-resumo     # 01-resumo | 02-conteudo | 03-servicos | 04-mapa-mental
secao: Resumo           # rótulo na navegação
ordem: 1                # 1..4
---
```

O front matter **substitui** a linha de metadados em prosa que abria os arquivos — o layout
a renderiza a partir dele. Fonte única, conforme a seção anterior. A home monta o índice e a
contagem a partir desses campos; nada de lista mantida à mão.

**O site não é um sexto artefato.** Ele renderiza os cinco — não duplica conteúdo. O player
de flashcards lê os mesmos `05-flashcards.csv` que o Anki importa.

Após processar uma aula, conferir que ela aparece na home depois do build do Pages
(`gh api repos/adalbertofjr/aws-saa-c03-estudos/pages/builds/latest --jq .status`).

## Regras invioláveis

- Não inventar números (ver seção acima).
- Não gerar flashcard de conteúdo administrativo (duração do curso, navegação na
  plataforma, boas-vindas do instrutor).
- Um dossiê por aula. Não misturar aulas diferentes num CSV ou numa pasta.
- Não reescrever transcrições brutas em `transcricoes/` — são registro imutável.
- **Nunca versionar `transcricoes/`.** Repositório público, material licenciado.
- Sempre atualizar os dois acumuladores ao processar uma aula. Acumulador desatualizado
  quebra o passo de deduplicação da fase Plan.
- **Nunca deixar dois artefatos do mesmo dossiê se contradizendo.** Revisou um, propaga
  para os outros quatro — ver "Coerência entre os cinco artefatos".
