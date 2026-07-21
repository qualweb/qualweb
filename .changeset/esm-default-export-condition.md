---
"@qualweb/act-rules": patch
"@qualweb/wcag-techniques": patch
"@qualweb/best-practices": patch
"@qualweb/cui-checks": patch
"@qualweb/locale": patch
"@qualweb/util": patch
---

Add a `default` condition to the `exports` map so the packages resolve from ES modules. Previously only a `require` condition was defined, so any `import` of these packages (including Node's own `require(esm)`/type-stripping paths on Node >= 22) failed with `ERR_PACKAGE_PATH_NOT_EXPORTED`. Note that the bundles remain CommonJS: named exports are not statically analyzable, so ESM consumers reach them through the default export (`import pkg from '@qualweb/act-rules'; pkg.ACTRules`).
