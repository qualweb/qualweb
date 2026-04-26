---
"@qualweb/qw-page": patch
"@qualweb/act-rules": patch
"@qualweb/best-practices": patch
"@qualweb/wcag-techniques": patch
---

Fix CI build errors introduced in PR #309

- Removes `"type": "module"` from @qualweb/qw-page which caused TS2307 module resolution errors on Linux CI (Node16 moduleResolution requires `.js` extensions in relative imports when type:module is set)
- Reverts ESM polyfills in qw-page test file back to CJS-compatible `__dirname`/`require`
- Restores `.mocharc.js` in qw-page, counter, and crawler (reverts `.cjs` renames)
- Adds explicit `QWElement` type annotations to forEach/filter callbacks in act-rules, best-practices, and wcag-techniques to fix TS7006 noImplicitAny errors
