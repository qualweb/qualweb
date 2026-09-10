---
'@qualweb/wcag-techniques': patch
---

Exclude button, submit, reset and image input types from QW-WCAG-T17 applicability. These control types are not "form fields" that require a positioned text label, so they were producing false positives.
