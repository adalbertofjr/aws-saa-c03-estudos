// Renderiza os mapas mentais e protege o layout das tabelas largas.
//
// O kramdown emite ```mermaid como <pre><code class="language-mermaid">, que
// não é o formato que o mermaid.js procura. Convertemos antes de inicializar.

import mermaid from 'https://cdn.jsdelivr.net/npm/mermaid@11/dist/mermaid.esm.min.mjs';

const escuro = matchMedia('(prefers-color-scheme: dark)').matches;

document.querySelectorAll('pre > code.language-mermaid').forEach((code) => {
  const pre = document.createElement('pre');
  pre.className = 'mermaid';
  pre.textContent = code.textContent;
  code.parentElement.replaceWith(pre);
});

mermaid.initialize({
  startOnLoad: true,
  theme: escuro ? 'dark' : 'neutral',
  securityLevel: 'strict',
  mindmap: { padding: 8 },
});

// Tabelas de 7 colunas não cabem em tela de celular. Envolvê-las num container
// com scroll próprio mantém o scroll horizontal dentro da tabela, nunca na página.
document.querySelectorAll('main table').forEach((tabela) => {
  if (tabela.parentElement.classList.contains('tabela-rolavel')) return;
  const caixa = document.createElement('div');
  caixa.className = 'tabela-rolavel';
  tabela.replaceWith(caixa);
  caixa.appendChild(tabela);
});
