---
'@qualweb/act-rules': patch
---

QW-ACT-R76 now evaluates every CSS Color 4 format a browser serializes computed colours in. It used to parse only `rgb()`, `rgba()` and `oklch()`: `lab()`, `oklab()`, `color(srgb …)` and `color-mix()` results made it throw (taking the whole act-rules run down), and `oklch()` was converted on a 0–1 scale while `rgb()` used 0–255, so mixed pairs got the wrong verdict. Colours are now parsed with colorjs.io on one 0–255 scale, as QW-ACT-R37 already does.
