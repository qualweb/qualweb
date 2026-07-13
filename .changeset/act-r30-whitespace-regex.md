---
"@qualweb/act-rules": patch
---

Fix whitespace normalization in QW-ACT-R30 (`2ee8b8`). The `includesText` helper used `/s+/g`, which matches the literal letter "s" instead of whitespace. It is now `/\s+/g`, so runs of whitespace in the accessible name and visible text are correctly collapsed before comparison (e.g. a label such as `"  ACT   rules  "` now matches `"ACT rules"`).
