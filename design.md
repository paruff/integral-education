# Design: NAV-02 — Standardize end-of-module CTA pattern
## Architecture
ModuleFooter component wraps: next module link, parent QuickStart, Daily Reflection link, ModuleComplete button. Replaces <NextStep /> in all 68 modules.
## moduleMap.js
Maps each moduleId → { next: {title, to}, quickstart: id }. Quickstart IDs mapped to QUICKSTARTS constants.
## Files: src/components/ModuleFooter/, src/data/moduleMap.js, 68 module files
