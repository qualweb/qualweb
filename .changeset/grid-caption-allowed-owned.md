---
'@qualweb/util': patch
'@qualweb/act-rules': patch
---

QW-ACT-R38 no longer fails `table`, `grid` and `treegrid` elements that own a `caption` (#254). The roles data gains an `allowedOwnedElements` field for owned roles that are allowed without being required, the duplicate `row` entry in `grid.requiredOwnedElements` was removed, the `tablegrid` typo in `caption.requiredContextRole` is now `treegrid` (also fixes QW-ACT-R33 for captions inside treegrids), and QW-ACT-R38 no longer mutates the shared roles data while checking group children.
