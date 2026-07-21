---
'@qualweb/util': patch
'@qualweb/act-rules': patch
---

QW-ACT-R37 no longer fails intentionally invisible text (#262). Text whose effective foreground alpha is 0 (`color: transparent`, `color: rgba(…, 0)`, or `opacity: 0` — the common screen-reader-only hiding technique) is not visible per the ACT definition of visibility, so the rule is now inapplicable to it; transparent text with a `text-shadow` that may still render it legible keeps producing the W1 "can't tell" warning. Also fixes a dead `opacity: 0` check in `DomUtils.isElementVisible` (`opacity && opacity === 0` could never be true, and `parseInt` truncated fractional opacities), so fully transparent elements are now correctly treated as not visible by every visibility-gated rule.
