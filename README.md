# Steven Casimir — rotating GitHub Pages portfolio

A zero-build static portfolio that renders **four different layouts from one shared data file**. It is designed for GitHub Pages and for handoff to Trio/local AI.

## The core idea

- `data/portfolio.json` is the canonical content source.
- Four renderers use the same data: **Cosmic**, **Builder**, **Operator**, and **Dashboard**.
- In **Auto** mode the site changes view based on the visitor's local time:
  - 00:00–05:59 → Dashboard
  - 06:00–11:59 → Operator
  - 12:00–17:59 → Builder
  - 18:00–23:59 → Cosmic
- A manual selector in the header lets you override the current view.
- Use `?view=cosmic`, `?view=builder`, `?view=operator`, or `?view=dashboard` for direct QA.

## Run locally

Windows PowerShell:

```powershell
.\scripts\dev.ps1
```

macOS/Linux:

```bash
./scripts/dev.sh
```

Then open `http://localhost:8765`.

## Push to GitHub Pages

1. Create or use a GitHub repository.
2. Copy this folder to the repo root.
3. Commit and push to `main`.
4. In GitHub: **Settings → Pages → Source → GitHub Actions**.
5. The included `.github/workflows/pages.yml` deploys automatically.

No npm install and no build step are required.

## Update content

Edit `data/portfolio.json`. Most content changes require **no HTML or JavaScript edits**.

## Important public-profile note

The data included here intentionally focuses on professional history, businesses, projects, research, and public-safe interests. It does **not** include family, legal, financial, home-address, or other private information. The portrait assets were cropped so the original residential address visible in source photos is not shipped in this public-ready scaffold.

See `TRIO_HANDOFF.md` for AI instructions.
