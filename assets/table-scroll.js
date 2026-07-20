// Tabelas de até 7 colunas não cabem em tela de celular. Envolvê-las num container
// com scroll próprio mantém o scroll horizontal dentro da tabela, nunca na página.
//
// Extraído de mermaid-init.js — era uma segunda responsabilidade sem relação com
// diagramas, só morava no mesmo arquivo por conveniência histórica.

document.querySelectorAll('main table').forEach((tabela) => {
  if (tabela.parentElement.classList.contains('tabela-rolavel')) return;
  const caixa = document.createElement('div');
  caixa.className = 'tabela-rolavel';
  tabela.replaceWith(caixa);
  caixa.appendChild(tabela);
});
