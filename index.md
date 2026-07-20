---
layout: default
titulo: Estudos SAA-C03
---

# Estudos SAA-C03

Dossiês de estudo para o **AWS Certified Solutions Architect – Associate**, gerados a partir
das aulas do Skill Builder. Cada aula produz cinco artefatos: resumo, conteúdo, tabela de
serviços, mapa mental e flashcards.

{% assign aulas = site.estudo | where_exp: "p", "p.aula" | group_by: "aula" %}
{% assign cards_total = 0 %}
{% for g in aulas %}{% assign cards_total = cards_total | plus: g.items.first.cards %}{% endfor %}

<p class="meta">
  <span class="tag">{{ aulas.size }} aula{% if aulas.size != 1 %}s{% endif %} processada{% if aulas.size != 1 %}s{% endif %}</span>
  <span class="tag">{{ cards_total }} flashcards</span>
  <a class="botao" href="{{ '/flashcards/' | relative_url }}">Estudar agora →</a>
</p>

## Domínios

<div class="dominios">
{% assign dominios = "d1,d2,d3,d4" | split: "," %}
{% assign nomes = "Criação de arquiteturas seguras,Criação de arquiteturas resilientes,Criação de arquiteturas de alto desempenho,Criação de arquiteturas com custo otimizado" | split: "," %}
{% assign pesos = "30,26,24,20" | split: "," %}
{% for d in dominios %}
  {% assign i = forloop.index0 %}
  {% assign doAula = site.estudo | where: "dominio", d | where_exp: "p", "p.aula" | group_by: "aula" %}
  {% assign mapa = site.estudo | where: "dominio", d | where: "tipo", "mapa-dominio" | first %}
  <a class="cartao {{ d }}{% if doAula.size == 0 %} vazio{% endif %}" href="{% if mapa %}{{ mapa.url | relative_url }}{% else %}#{% endif %}">
    <h3>{{ d | upcase }} · {{ nomes[i] }}</h3>
    <p>{{ pesos[i] }}% do exame — {{ doAula.size }} aula{% if doAula.size != 1 %}s{% endif %} processada{% if doAula.size != 1 %}s{% endif %}</p>
  </a>
{% endfor %}
</div>

## Aulas processadas

{% if aulas.size == 0 %}
_Nenhuma aula processada ainda._
{% else %}
<div class="dominios">
{% for g in aulas %}
  {% assign primeiro = g.items | sort: "ordem" | first %}
  <a class="cartao {{ primeiro.dominio }}" href="{{ primeiro.url | relative_url }}">
    <h3>{{ primeiro.titulo }}</h3>
    <p>{{ primeiro.dominio | upcase }} · {{ primeiro.tipo }} · {{ primeiro.cards }} cards · {{ primeiro.processado }}</p>
  </a>
{% endfor %}
</div>
{% endif %}

## Referência

- [Índice acumulado de serviços AWS]({{ '/estudo/00-indice-servicos/' | relative_url }}) — todos os serviços vistos, com o discriminador de cada um e o mapa de decisão rápida. É a folha de consulta da semana do exame.
- [Flashcards]({{ '/flashcards/' | relative_url }}) — filtre por `disc` para treinar só discriminação entre serviços, que é o que o exame mais cobra. 
