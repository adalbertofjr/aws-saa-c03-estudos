---
layout: dossie
titulo: "<título da aula>"
dominio: <d1..d4|geral>
aula: <slug>
tipo: <review|practice|simulearn|simulado>
fonte: "Skill Builder — <curso>"
processado: <AAAA-MM-DD>
cards: <n>
artefato: 04-mapa-mental
secao: Mapa mental
ordem: 4
---

## Mapa da aula

```markmap
# Título da aula (peso% do domínio, se fizer sentido aqui)
## Eixo conceitual A
### Serviço 1
- Característica
- Característica
### Serviço 2
- Característica
## Eixo conceitual B
### Decisão
- Escolha X se ...
- Escolha Y se ...
## Números
- valor - do que se trata
```

## Como ler este mapa
<Duas ou três frases: qual é o eixo de organização escolhido e por quê. Um mapa sem
legenda de leitura envelhece mal.>

---

## Regras de sintaxe (não apagar)

- **`#` uma única vez**, só na raiz — duplicar produz duas árvores separadas.
- Hierarquia: `#`/`##`/`###` para os três primeiros níveis; **listas `-`** (aninhadas por
  indentação de 2 espaços) para o que for mais fundo que isso.
- Proibido dentro do texto de um item: `(`, `)`, `:` — quebram o parser de outline.
- Sem `<br>` — o Markmap encaixa o texto sozinho na caixa. Usar travessão (`—`) para
  separar cláusulas na mesma linha.
- Validar em <https://markmap.js.org/repl> ou olhar a página publicada — este formato não
  tem preview no VS Code.

## Ao terminar

Atualizar também `_estudo/<dominio>/00-mapa-dominio.md`, encaixando os ramos desta aula no
mapa acumulado do domínio.
