window.MathJax = {
  tex: {
    inlineMath: [["\\(", "\\)"]],
    displayMath: [["\\[", "\\]"]],
    processEscapes: true,
    processEnvironments: true
  },
  options: {
    ignoreHtmlClass: ".*|",
    processHtmlClass: "arithmatex",
    enableMenu: false
  }
};

document$.subscribe(() => {
  if (window.MathJax?.startup?.output) {
    if (typeof MathJax.startup.output.clearCache === "function") MathJax.startup.output.clearCache();
    if (typeof MathJax.typesetClear === "function") MathJax.typesetClear();
    if (typeof MathJax.texReset === "function") MathJax.texReset();
    if (typeof MathJax.typesetPromise === "function") MathJax.typesetPromise();
  }
});
