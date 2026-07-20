// Renderiza os mapas mentais com Markmap (https://markmap.js.org), no lugar do Mermaid.
//
// O kramdown emite ```markmap como <pre><code class="language-markmap">. Convertemos cada
// bloco num container com SVG + toolbar (zoom, fit, expandir/colapsar tudo).
//
// Carregado como script clássico (não module) porque os pacotes markmap-* publicam UMD
// que se anexam a `window.markmap` — os <script> das dependências ficam em
// _layouts/default.html, na ordem: markmap-lib, d3, markmap-view, markmap-toolbar.
// Este arquivo roda depois de todos eles terem carregado.

(function () {
  const { markmap } = window;
  const { Transformer, Markmap, loadCSS, loadJS, Toolbar } = markmap;
  const transformer = new Transformer();

  document.querySelectorAll('pre > code.language-markmap').forEach((code) => {
    const texto = code.textContent;
    const bloco = code.parentElement;

    const caixa = document.createElement('div');
    caixa.className = 'markmap-mapa';

    const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    caixa.appendChild(svg);
    bloco.replaceWith(caixa);

    const { root, features } = transformer.transform(texto);
    const assets = transformer.getUsedAssets(features);
    if (assets.styles) loadCSS(assets.styles);
    if (assets.scripts) loadJS(assets.scripts, { getMarkmap: () => markmap });

    const mm = Markmap.create(svg, { autoFit: true }, root);

    // "dark" fica de fora: o container já tem fundo claro fixo (ver style.css) para
    // garantir contraste em qualquer tema da página, sem depender do CSS interno do
    // markmap para modo escuro — mais simples e mais confiável que sincronizar os dois.
    const toolbar = Toolbar.create(mm);
    toolbar.setItems(['zoomIn', 'zoomOut', 'fit', 'recurse']);
    const { el } = toolbar;
    el.style.position = 'absolute';
    el.style.bottom = '.5rem';
    el.style.right = '.5rem';
    caixa.appendChild(el);
  });
})();
