# Specification: NAV-02 — Standardize end-of-module CTA pattern across all modules

## Problem
Most modules end with only Docusaurus prev/next arrows. Learners hit a dead end with no clear next action.

## Requirements
- ModuleFooter component with: next module, parent QuickStart, reflection link, ModuleComplete button
- moduleMap.js mapping each module to its next module and parent QuickStart
- All modules updated with ModuleFooter replacing <NextStep />
- Build passes

## ACs
1. ModuleFooter component created with all four slots
2. moduleMap.js maps every module to next + QuickStart
3. All modules have <ModuleFooter /> at end
4. Build passes
