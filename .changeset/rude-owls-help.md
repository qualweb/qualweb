---
'@qualweb/wcag-techniques': patch
'@qualweb/best-practices': patch
'@qualweb/earl-reporter': patch
'@qualweb/cui-checks': patch
'@qualweb/qw-element': patch
'@qualweb/act-rules': patch
'@qualweb/counter': patch
'@qualweb/crawler': patch
'@qualweb/qw-page': patch
'@qualweb/locale': patch
'@qualweb/core': patch
'@qualweb/util': patch
'@qualweb/cli': patch
---

Update build scripts

Removed the cleanup step of all build scripts and added a "clean" script for
them all instead. This change means that the build scripts will no longer create
a clean output folder. Since the output folders aren't under version control,
this won't mess with history, and CI/CD pipelines should build from a clean
checkout so this shouldn't cause pollution in final releases, either.