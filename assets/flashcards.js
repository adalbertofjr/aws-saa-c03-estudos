// Player de flashcards. Lê os mesmos CSVs que o Anki importa.

import { idDoCard, vencido, responder, resumo, exportar, importar, apagarTudo } from './srs.js';

const base = document.body.dataset.base || '';
const $ = (sel) => document.querySelector(sel);

/* ---------- parser ----------
   Contrato garantido pelo CLAUDE.md: separador ';', exatamente 4 colunas,
   nenhum campo contém ';', quebras de linha como <br>. Por isso um split
   simples basta — não é preciso um parser de CSV com aspas e escapes. */
function parseCSV(texto, meta) {
  return texto.split('\n')
    .map((l) => l.trim())
    .filter((l) => l && !l.startsWith('#'))
    .map((linha) => {
      const campos = linha.split(';');
      if (campos.length !== 4) {
        console.warn('linha ignorada (esperava 4 campos, veio ' + campos.length + '):', linha);
        return null;
      }
      const [frente, verso, extra, tags] = campos;
      return {
        id: idDoCard(frente),
        frente, verso,
        extra: extra === '—' ? '' : extra,
        tags: tags.split(/\s+/).filter(Boolean),
        dominio: meta.dominio,
        aula: meta.aula,
      };
    })
    .filter(Boolean);
}

/* ---------- estado ---------- */
let todos = [];
let fila = [];
let atual = null;
let revelado = false;

async function carregar() {
  const manifesto = await fetch(`${base}/cards-manifest.json`).then((r) => r.json());
  const baralhos = await Promise.all(
    manifesto.map(async (m) => parseCSV(await fetch(`${base}${m.arquivo}`).then((r) => r.text()), m))
  );
  todos = baralhos.flat();
}

function filtrados() {
  const p = new URLSearchParams(location.search);
  const aula = p.get('aula');
  const dominio = $('#f-dominio').value;
  const tipo = $('#f-tipo').value;
  const soVencidos = $('#f-vencidos').checked;

  return todos.filter((c) => {
    if (aula && c.aula !== aula) return false;
    if (dominio && c.dominio !== dominio) return false;
    if (tipo && !c.tags.includes(tipo)) return false;
    if (soVencidos && !vencido(c.id)) return false;
    return true;
  });
}

function embaralhar(a) {
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

/* ---------- render ---------- */
function pintarResumo() {
  const sel = filtrados();
  const r = resumo(sel.map((c) => c.id));
  $('#resumo').textContent = sel.length === 0
    ? 'Nenhum card com estes filtros.'
    : `${r.total} cards · ${r.novos} novos · ${r.revisar} para revisar · ${r.emDia} em dia`;
}

function proximo() {
  if (fila.length === 0) {
    atual = null;
    $('#carta').innerHTML = '<div class="frente">Sessão concluída 🎉</div>'
      + '<div class="extra">Ajuste os filtros ou volte amanhã para a próxima revisão.</div>';
    $('#acoes').hidden = true;
    $('#revelar').hidden = true;
    return;
  }
  atual = fila.shift();
  revelado = false;
  pintarCarta();
}

function pintarCarta() {
  const tags = atual.tags.map((t) => `<span>${t}</span>`).join('');
  $('#carta').innerHTML = `
    <div class="frente">${atual.frente}</div>
    ${revelado ? `<div class="verso">${atual.verso}</div>` : ''}
    ${revelado && atual.extra ? `<div class="extra">${atual.extra}</div>` : ''}
    ${revelado ? `<div class="tags">${tags}</div>` : ''}`;
  $('#revelar').hidden = revelado;
  $('#acoes').hidden = !revelado;
  $('#restantes').textContent = `${fila.length} restantes na sessão`;
}

function revelar() {
  revelado = true;
  pintarCarta();
}

function avaliar(qualidade) {
  if (!atual) return;
  responder(atual.id, qualidade);
  // Errou volta para o fim da fila, para reaparecer nesta mesma sessão.
  if (qualidade < 3) fila.push(atual);
  pintarResumo();
  proximo();
}

function iniciar() {
  fila = embaralhar(filtrados().slice());
  $('#acoes').hidden = true;
  proximo();
}

/* ---------- eventos ---------- */
document.addEventListener('DOMContentLoaded', async () => {
  await carregar();

  const p = new URLSearchParams(location.search);
  const aula = p.get('aula');
  if (aula) {
    $('#contexto').textContent = `Filtrado pela aula: ${aula}`;
    $('#contexto').hidden = false;
  }

  ['#f-dominio', '#f-tipo', '#f-vencidos'].forEach((sel) =>
    $(sel).addEventListener('change', () => { pintarResumo(); iniciar(); }));

  $('#revelar').addEventListener('click', revelar);
  document.querySelectorAll('#acoes button').forEach((b) =>
    b.addEventListener('click', () => avaliar(Number(b.dataset.q))));

  $('#exportar').addEventListener('click', exportar);
  $('#importar').addEventListener('change', (e) => {
    const f = e.target.files[0];
    if (!f) return;
    importar(f)
      .then((n) => { alert(`${n} cards importados.`); pintarResumo(); })
      .catch((err) => alert('Falha ao importar: ' + err.message));
  });
  $('#zerar').addEventListener('click', () => {
    if (confirm('Apagar todo o progresso deste dispositivo? Não dá para desfazer.')) {
      apagarTudo(); pintarResumo(); iniciar();
    }
  });

  // Teclado: espaço revela, 1–4 avaliam.
  document.addEventListener('keydown', (e) => {
    if (e.target.matches('select, input')) return;
    if (e.code === 'Space') { e.preventDefault(); if (!revelado) revelar(); return; }
    if (revelado && ['1', '2', '3', '4'].includes(e.key)) {
      avaliar([0, 3, 4, 5][Number(e.key) - 1]);
    }
  });

  pintarResumo();
  iniciar();
});
