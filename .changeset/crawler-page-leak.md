---
"@qualweb/crawler": patch
---

Fix a page leak in the crawler: pages opened by fetchPageLinks were never
closed (and checkRelativePathsUrls leaked its page on errors), so long
crawls accumulated open tabs until the browser began refusing new pages
and urls were silently dropped from the results.
