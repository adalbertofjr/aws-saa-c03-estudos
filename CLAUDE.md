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
1. **Inventariar os serviços** da aula e conferir contra `estudo/_indice-servicos.md`.
   Serviço já visto **não** gera card de definição de novo — gera card de *discriminação*
   contra o novo contexto. Sem esse passo, 18 treinamentos que reciclam os mesmos serviços
   produzem centenas de cards duplicados.
2. Decidir o destino de cada conceito: conteúdo, tabela de serviços, mapa, flashcard.
   Regra de corte para flashcard: **um fato atômico testável**. Se a resposta precisa de
   3+ frases, o lugar dela é `02-conteudo.md`, não um card.

### I — Implement
Gerar os 5 artefatos, atualizar os dois acumuladores (`_indice-servicos.md` e
`<dominio>/_mapa-dominio.md`) e registrar em `revisao/log.md`.

## Os 5 artefatos

Para `transcricoes/<dominio>/<slug>.md`, gerar em `estudo/<dominio>/<slug>/`:

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
- `estudo/_indice-servicos.md` — todos os serviços vistos até agora, com link para as
  aulas onde aparecem. É a folha de consulta única da semana do exame.
- `estudo/<dominio>/_mapa-dominio.md` — mapa mental do domínio inteiro, crescendo a cada
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
pesquisar na documentação AWS e **completar a resposta**, marcada com `[fora da
transcrição]`. Uma pergunta retórica do instrutor é um pedido de estudo dirigido — deixá-la
em aberto transfere para a véspera do exame um trabalho que cabia aqui.

Duas restrições permanecem:
- Toda afirmação fora da transcrição leva o rótulo `[fora da transcrição]`, para você saber
  o que veio da aula e o que veio de mim.
- **Nunca inventar números.** Limite, SLA ou preço sem respaldo na transcrição e sem
  confirmação na documentação → marcar `⚠️ LACUNA:` e seguir. Um número errado memorizado
  em flashcard custa mais caro que uma lacuna conhecida. `⚠️ LACUNA` fica reservado para
  isto: o que **não foi possível** confirmar — não para o que dava trabalho pesquisar.

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
- **Extra** — o *porquê*, a distinção do serviço rival, ou o cenário. Pode ser vazio.
- **Tags** — separadas por espaço, nesta ordem:
  `SAA-C03 <dominio> <servico> <tipo>` — ex.: `SAA-C03 d1 IAM disc`

`<tipo>` ∈ `def` (definição) · `disc` (discriminação X vs Y) · `num` (limite/valor) ·
`cen` (cenário no estilo do exame). Permite estudo filtrado: `tag:disc`, `deck:SAA-C03 tag:d3`.

**Priorizar `disc` e `cen`** — o SAA-C03 testa escolha entre serviços, não definição.

Escapar: nenhum campo pode conter `;` — usar `,` ou reescrever. Quebra de linha dentro de
campo apenas como `<br>` (por isso `#html:true`).

Cobertura alvo: 15–30 cards por aula de 45min. Menos indica extração rasa; muito mais
indica que fatos não-testáveis viraram card.

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
4. Importar o CSV no Anki: *File → Import*, tipo de nota `Basic`, deck `SAA-C03`.
   Se o modelo `Basic` não tiver campo Extra, concatenar Extra no fim do Verso.
5. Registrar em `revisao/log.md`.

## Regras invioláveis

- Não inventar números (ver seção acima).
- Não gerar flashcard de conteúdo administrativo (duração do curso, navegação na
  plataforma, boas-vindas do instrutor).
- Um dossiê por aula. Não misturar aulas diferentes num CSV ou numa pasta.
- Não reescrever transcrições brutas em `transcricoes/` — são registro imutável.
- Sempre atualizar os dois acumuladores ao processar uma aula. Acumulador desatualizado
  quebra o passo de deduplicação da fase Plan.
