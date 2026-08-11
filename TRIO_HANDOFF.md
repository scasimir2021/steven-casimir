# Trio handoff — Steven Casimir portfolio

## Mission
Maintain a polished GitHub Pages portfolio for Steven Casimir. The site has four visual orientations but **one content model**. Do not fork the content by layout.

## Single source of truth
`data/portfolio.json`

When Steven gives Trio a new project, skill, business, career update, link, or quote:
1. Update this JSON first.
2. Preserve existing schema unless a new field is genuinely necessary.
3. Keep public facts separate from private context.
4. Render all four views and verify the new content appears appropriately.

## View engine
- `assets/js/view-manager.js` decides the active view.
- `assets/js/renderers.js` contains four layout renderers.
- `assets/css/styles.css` provides shared design tokens plus layout-specific styling.
- Auto mode uses four six-hour windows. Change them in `data/portfolio.json` under `site.autoView.slots`.

## Public-safety rule
Do not add private family, legal, financial, health, exact-home-address, or sensitive personal information to the public portfolio unless Steven explicitly directs it for publication. Source selfies originally included a residential number; this scaffold uses derived crops only.

## Content confidence
Some entries are **research ideas or concepts**, not shipped products. Preserve the `status` field and avoid rewriting concepts as completed products.

## Suggested Trio workflow
1. `git pull --ff-only`
2. Update `data/portfolio.json` and/or layout code.
3. Run `python scripts/serve.py`.
4. Check all views with `?view=cosmic`, `?view=builder`, `?view=operator`, `?view=dashboard`.
5. Run `python scripts/validate.py`.
6. Commit with a descriptive message.
7. `git push origin main`.
8. GitHub Actions publishes Pages.

## Design direction
- Dark, cinematic, professional.
- Gold = engineering / builder emphasis.
- Green = operator / Lawn-A-Mercy energy.
- Blue = AI / cosmic depth.
- Portraits should resemble Steven's current real appearance: locs pulled back, glasses in many shots, beard/goatee, black clothing, silver chains when appropriate.
- Keep the site credible. Avoid fake metrics, invented job titles, or fabricated quotes.
