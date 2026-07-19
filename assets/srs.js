// Repetição espaçada — SM-2 simplificado, estado em localStorage.
//
// O progresso é POR DISPOSITIVO e não sincroniza com o Anki. Este site serve
// para revisar em qualquer lugar; o agendamento sério continua no Anki.
// exportar()/importar() são a saída manual para trocar de aparelho.

const CHAVE = 'saa-c03-srs-v1';

// Identidade do card = a Frente, igual ao Anki. Corrigir a Frente de um card
// cria um card novo em ambos e deixa o antigo órfão — comportamento conhecido,
// documentado no checklist de coerência do CLAUDE.md.
export function idDoCard(frente) {
  let h = 5381;
  for (let i = 0; i < frente.length; i++) h = ((h << 5) + h + frente.charCodeAt(i)) | 0;
  return 'c' + (h >>> 0).toString(36);
}

const hoje = () => Math.floor(Date.now() / 86400000);

// O estado é lido a cada consulta de card. Sem cache, filtrar 77 cards por
// "vencidos" faria 77 JSON.parse do store inteiro — e a tela refaz o filtro a
// cada resposta. Memoriza a leitura e invalida na escrita.
let cache = null;

function ler() {
  if (cache) return cache;
  try { cache = JSON.parse(localStorage.getItem(CHAVE)) || {}; }
  catch { cache = {}; }
  return cache;
}
function gravar(estado) {
  cache = estado;
  localStorage.setItem(CHAVE, JSON.stringify(estado));
}

export function vencido(id) {
  const e = ler()[id];
  return !e || e.proxima <= hoje();
}

/** qualidade: 0 errei · 3 difícil · 4 bom · 5 fácil */
export function responder(id, qualidade) {
  const estado = ler();
  const c = estado[id] || { repeticoes: 0, facilidade: 2.5, intervalo: 0 };

  if (qualidade < 3) {
    // Errou: volta para o início e reaparece na mesma sessão.
    c.repeticoes = 0;
    c.intervalo = 0;
  } else {
    c.repeticoes += 1;
    if (c.repeticoes === 1) c.intervalo = 1;
    else if (c.repeticoes === 2) c.intervalo = 6;
    else c.intervalo = Math.round(c.intervalo * c.facilidade);

    c.facilidade = Math.max(1.3,
      c.facilidade + (0.1 - (5 - qualidade) * (0.08 + (5 - qualidade) * 0.02)));
  }

  c.proxima = hoje() + c.intervalo;
  c.visto = hoje();
  estado[id] = c;
  gravar(estado);
  return c;
}

export function resumo(ids) {
  const estado = ler();
  const d = hoje();
  let novos = 0, revisar = 0, emDia = 0;
  for (const id of ids) {
    const c = estado[id];
    if (!c) novos++;
    else if (c.proxima <= d) revisar++;
    else emDia++;
  }
  return { novos, revisar, emDia, total: ids.length };
}

export function exportar() {
  const blob = new Blob([JSON.stringify(ler(), null, 2)], { type: 'application/json' });
  const a = document.createElement('a');
  a.href = URL.createObjectURL(blob);
  a.download = `saa-c03-progresso-${new Date().toISOString().slice(0, 10)}.json`;
  a.click();
  URL.revokeObjectURL(a.href);
}

export function importar(arquivo) {
  return arquivo.text().then((txt) => {
    const dados = JSON.parse(txt);
    if (typeof dados !== 'object' || Array.isArray(dados)) throw new Error('formato inválido');
    // Mescla: mantém o progresso mais avançado de cada card.
    const atual = ler();
    for (const [id, c] of Object.entries(dados)) {
      if (!atual[id] || (c.proxima || 0) > (atual[id].proxima || 0)) atual[id] = c;
    }
    gravar(atual);
    return Object.keys(dados).length;
  });
}

export function apagarTudo() {
  cache = null;
  localStorage.removeItem(CHAVE);
}
