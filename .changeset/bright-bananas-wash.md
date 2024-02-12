---
"@qualweb/core": patch
---

# QualWeb#crawl() doesn't close browser after use

The method launches a fresh puppeteer instance, but does not close it. This
causes any program that uses the crawl function to hang after finishing the
rest of its execution.