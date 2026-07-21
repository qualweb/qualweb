---
"@qualweb/playwright-driver": patch
---

Keep the loaded document when the user agent or viewport flags change mid-evaluation. Previously the driver recreated its browser context on any such change; when `evaluate()` was called without a `viewport` option, `QualwebPage.setViewport` re-sends the default user agent during the ACT rules module's special-case viewport pass, and the recreation destroyed the loaded page and every injected bundle — the evaluation then failed (`window.act` undefined) and the URL produced no report. Context recreation now only happens while no document is loaded; afterwards, resizes apply to the live page and user-agent/flag changes are kept for a later context.
