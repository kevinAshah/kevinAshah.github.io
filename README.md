# Kevin Shah — Portfolio (User Site)

Public repository for the user-site portfolio. This repo is deployed via GitHub Pages from the main branch at the repo root.

## Live URL

- https://kevinashah.github.io/

## What’s here

- index.html: Single-page portfolio (About, Experience, Projects, Education, Contact)
- style.css: Responsive, accessible CSS (light/dark via prefers-color-scheme)
- app.js: Minimal UX enhancements (smooth scroll, active nav, subtle animations)
- resume/resume.pdf: Downloaded by the Resume button
- 404.html: Friendly not-found page
- robots.txt: Allow all
- .nojekyll: Ensures GitHub Pages serves everything as-is
- favicon.svg: Simple KS favicon

## Deployment (GitHub Pages)

- Pages is enabled for this repo: Source = main / Path = /
- No build step; static files only
- If Pages ever breaks after visibility/branch changes, re-enable in repo → Settings → Pages

## How to work on it

- Local preview:
  - python3 -m http.server 8000 → open http://localhost:8000
- Edit content in index.html (bio, sections, links)
- Update resume by replacing resume/resume.pdf
- Commit and push to main; Pages updates automatically

## Conventions

- Keep content straightforward and factual; avoid visual clutter
- Prefer small, incremental changes
- Keep links relative (Pages-friendly)
- Avoid external heavy dependencies; system fonts are fine

## Future ideas

- Add sitemap.xml
- Inline critical CSS for faster first paint
- Optional: GitHub Action to run HTML/CSS lint or spellcheck on PRs

## Current owner links

- GitHub: https://github.com/kevinAshah
- LinkedIn: https://www.linkedin.com/in/-kevinshah/

---

Last setup: Migrated to single repo (kevinAshah.github.io), wired resume, added meta/OG, favicon, 404, robots, and .nojekyll. Decommissioned project Pages.
