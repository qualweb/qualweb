---
'@qualweb/wcag-techniques': patch
'@qualweb/best-practices': patch
'@qualweb/cui-checks': patch
'@qualweb/act-rules': patch
'@qualweb/locale': patch
'@qualweb/core': patch
'@qualweb/util': patch
---

change package.json file export from "require" to "default" so it can work in projects that have "type": "module" set in package.json
