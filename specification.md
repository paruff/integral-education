# Specification: UX-16 — Custom 404 Page

## Problem
The site uses the default Docusaurus 404 page which provides only a "Back to main site" link and no site-specific recovery paths. As the site grows and module URLs are shared in communities, broken or renamed links will increasingly surface. A learner hitting a 404 on a shared module link has no recovery affordance.

## UX Rationale
Custom 404 pages are a standard UX investment with well-documented ROI. A "404 as a recovery opportunity" approach — with search, popular content links, and a clear CTA — consistently returns 15–30% of otherwise-lost users to the site. The effort is minimal (a single React page). The absence of one is particularly damaging for a reference-and-practice site where URLs are frequently shared.

## Requirements

### Functional
- Create src/pages/404.js as a custom 404 page
- Content: friendly message, 3-sentence explanation, search link, links to 3 most popular pages (Homepage, Start Here, Mindfulness Basics), and a "Report a broken link" GitHub Issues link
- Match the visual style of the site using Docusaurus theme variables
- Ensure the page is accessible: headings, keyboard navigation, no axe-core violations

### Non-Functional
- Use @theme/Layout component for consistent header and footer
- Use Docusaurus CSS variables for consistent styling
- No additional npm dependencies required

## Acceptance Criteria
1. Custom 404 page renders at any invalid URL
2. Page contains at least 3 recovery navigation options
3. Visual style matches the site
4. Page is accessible with no axe-core violations