#!/usr/bin/env bash
# Valida um CSV de flashcards contra as regras de "Como construir um flashcard" do
# CLAUDE.md. Torna o critério executável em vez de aspiracional.
#
# Uso: bash 00-processo/validar-cards.sh _estudo/<dominio>/<slug>/05-flashcards.csv
set -euo pipefail

if [ $# -ne 1 ]; then
  echo "Uso: $0 <caminho-para-05-flashcards.csv>" >&2
  exit 2
fi

CSV="$1"
if [ ! -f "$CSV" ]; then
  echo "Arquivo não encontrado: $CSV" >&2
  exit 2
fi

erros=0
avisos=0

erro() { echo "  ERRO: $1"; erros=$((erros + 1)); }
aviso() { echo "  AVISO: $1"; avisos=$((avisos + 1)); }

echo "== $CSV =="

# --- integridade estrutural -------------------------------------------------
dados=$(grep -v '^#' "$CSV" | grep -v '^[[:space:]]*$' || true)
total=$(printf '%s\n' "$dados" | grep -c . || true)

echo "-- integridade --"
ma=$(printf '%s\n' "$dados" | awk -F';' 'NF!=4 {print NR": "$0}')
if [ -n "$ma" ]; then
  erro "linhas sem exatamente 4 campos:"
  echo "$ma" | sed 's/^/    /'
fi

dup=$(printf '%s\n' "$dados" | cut -d';' -f1 | sort | uniq -d)
if [ -n "$dup" ]; then
  erro "Frente duplicada:"
  echo "$dup" | sed 's/^/    /'
fi

vazio=$(printf '%s\n' "$dados" | awk -F';' '$1=="" || $2==""')
if [ -n "$vazio" ]; then
  erro "Frente ou Verso vazios:"
  echo "$vazio" | sed 's/^/    /'
fi

# --- proibições (CLAUDE.md § Como construir um flashcard) ------------------
echo "-- proibições --"

preco=$(printf '%s\n' "$dados" | grep -niE 'R\$|US\$|USD|[0-9]+[[:space:]]*/[[:space:]]*mês|por mês' || true)
if [ -n "$preco" ]; then
  erro "menção a preço (proibição 1):"
  echo "$preco" | sed 's/^/    /'
fi

meta=$(printf '%s\n' "$dados" | grep -niE 'instrutor|esta aula|este módulo|este curso|o encerramento|a aula (avisa|diz|cita|nomeia)|segundo o (instrutor|vídeo)' || true)
if [ -n "$meta" ]; then
  erro "meta-card sobre a aula, não sobre a AWS (proibição 2):"
  echo "$meta" | sed 's/^/    /'
fi

# --- armadilha obrigatória em cen/disc --------------------------------------
echo "-- armadilha obrigatória (cen/disc) --"
sem_armadilha=$(printf '%s\n' "$dados" | awk -F';' '
  {
    n = split($4, tags, " ");
    tipo = tags[n];
    if ((tipo == "cen" || tipo == "disc") && $3 !~ /[Aa]rmadilha/) print NR": ["tipo"] "$1
  }')
if [ -n "$sem_armadilha" ]; then
  aviso "cen/disc sem 'Armadilha' explícita no Extra (regra: obrigatório) — revisar:"
  echo "$sem_armadilha" | sed 's/^/    /'
fi

# --- tags obrigatórias -------------------------------------------------------
echo "-- tags --"
sem_tarefa=$(printf '%s\n' "$dados" | awk -F';' '$4 !~ /t[1-4]\.[0-9]/ {print NR": "$4}')
if [ -n "$sem_tarefa" ]; then
  aviso "sem tag de declaração de tarefa (t1.1, t1.2...):"
  echo "$sem_tarefa" | sed 's/^/    /'
fi

sem_deck=$(printf '%s\n' "$dados" | awk -F';' '$4 !~ /^SAA-C03 / {print NR": "$4}')
if [ -n "$sem_deck" ]; then
  erro "tag não começa com 'SAA-C03':"
  echo "$sem_deck" | sed 's/^/    /'
fi

# --- mix por tipo -------------------------------------------------------------
echo "-- mix por tipo (meta: cen>=35%, disc>=35%, num<=20%, def<=10%) --"
printf '%s\n' "$dados" | awk -F';' -v total="$total" '
  {
    n = split($4, tags, " ");
    tipo = tags[n];
    c[tipo]++;
  }
  END {
    for (t in c) printf "  %-6s %3d  (%.0f%%)\n", t, c[t], 100*c[t]/total;
  }'

pct() { awk -v n="$1" -v t="$total" 'BEGIN{ if(t==0){print 0} else {printf "%.0f", 100*n/t} }'; }
n_cen=$(printf '%s\n' "$dados" | awk -F';' '{n=split($4,t," "); if(t[n]=="cen") c++} END{print c+0}')
n_disc=$(printf '%s\n' "$dados" | awk -F';' '{n=split($4,t," "); if(t[n]=="disc") c++} END{print c+0}')
n_num=$(printf '%s\n' "$dados" | awk -F';' '{n=split($4,t," "); if(t[n]=="num") c++} END{print c+0}')
n_def=$(printf '%s\n' "$dados" | awk -F';' '{n=split($4,t," "); if(t[n]=="def") c++} END{print c+0}')

[ "$(pct "$n_cen")" -lt 35 ] && aviso "cen abaixo da meta de 35% (está em $(pct "$n_cen")%)"
[ "$(pct "$n_disc")" -lt 35 ] && aviso "disc abaixo da meta de 35% (está em $(pct "$n_disc")%)"
[ "$(pct "$n_num")" -gt 20 ] && aviso "num acima do teto de 20% (está em $(pct "$n_num")%)"
[ "$(pct "$n_def")" -gt 10 ] && aviso "def acima do teto de 10% (está em $(pct "$n_def")%)"

# --- resumo -------------------------------------------------------------------
echo
echo "Total de cards: $total"
echo "Erros: $erros · Avisos: $avisos"
if [ "$erros" -gt 0 ]; then
  echo "FALHOU — corrigir os erros antes de considerar a aula fechada."
  exit 1
fi
echo "OK (sem erros estruturais; revisar avisos se houver)."
