---
'@qualweb/act-rules': patch
'@qualweb/locale': patch
'@qualweb/qw-element': patch
'@qualweb/util': patch
---

Improve QW-ACT-R37 contrast evaluation, including exact WCAG thresholds, opacity and background compositing, transparent text and alternative text-paint handling, disabled content handling, proof-based evaluation of supported linear gradients, and conservative handling of complex backgrounds. Centralize concrete role resolution and complete group-or-widget role classification in AccessibilityUtils for consistent disabled-ancestor and disabled-label handling.

Add contrast evaluation for rendered form-control values, placeholders, and selected options. Resolve authored placeholder styles, including specificity, opacity, active stylesheets, media queries, custom properties, cascade layers, native CSS nesting, and shadow roots. Return a warning when cross-origin styles prevent a reliable placeholder result.
