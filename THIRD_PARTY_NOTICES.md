# Third-party notices

The learner application itself has no runtime dependency. It is hand-written ES modules and one stylesheet;
the relationship map is plain SVG drawn from the reviewed layout coordinates, so no graph library is vendored.

## MathJax

The documentation vendors **MathJax 3.2.2** under the Apache License 2.0. The SVG combined component is used so mathematical notation works without loading a runtime script or webfont from a third-party origin.

- Project: <https://www.mathjax.org/>
- Source: <https://github.com/mathjax/MathJax-src/tree/3.2.2>
- Vendored file: `viewer/assets/vendor/mathjax-3.2.2-tex-svg.min.js`
- Vendored SHA-256: `d4295dc33744836935c1399feece5159577b34c5c8ffb9f1c6324cd82e03a882`
- License: `viewer/assets/vendor/MATHJAX_LICENSE.txt`

No Node.js runtime or frontend build step is required in production.
