# RevenueIQ — Unified Sales Dashboard

A React + Vite implementation of the Unified Sales Dashboard design handoff
(`design_handoff_unified_sales_dashboard/`). Eleven screens behind one
persistent shell, recreated from the prototype's structure and copy using the
Industry design system tokens.

## Run locally

```bash
npm install
npm run dev
```

Opens at `http://localhost:5173`.

## Build for production

```bash
npm run build
npm run preview   # sanity-check the production build locally
```

Output goes to `dist/` — a static site with no server dependency.

## Project structure

```
src/
  data/fixtures.js       All fixture data (leads, connections, sequences, etc.)
                          — ported from the handoff. Replace with real API calls;
                          see the handoff README's "Data the backend must provide".
  context/AppContext.jsx Global shell state: screen, vertical, role, search, sync.
  components/            SideNav, TopBar, Blueprint (card frame), Toast.
  screens/                One file per screen (Overview, Leads, Verticals, …).
  styles/tokens.css       The Industry design system (colors, type, spacing) —
                          copied verbatim from the handoff's _ds/ bundle.
  styles/app.css          Shell layout, screen-specific styles, animations.
```

## Login gate

The whole app sits behind a login screen (`src/screens/Login.jsx`). Credentials
are set in `src/data/auth.js` — one admin account, one shared team account.
Edit that file and redeploy to change either password. This is a client-side
check only (fine for keeping casual visitors out while testing with your
team) — not real security, since the password ships inside the JS bundle.

## What's real vs. fixture

Every screen is wired up and interactive (filters, sorting, selection, the
lead drawer, connection config switching, CSV download, toggles, etc.) but
all data is in-memory fixture data, matching the handoff's own prototype
scope. Buttons that would hit a backend in production show a toast instead of
performing the real action. Before shipping, replace `src/data/fixtures.js`
with real data-fetching (see the handoff README's "State" and "Data the
backend must provide" sections for the exact shape each screen needs).

## Deploying

**Vercel (recommended — zero config for Vite):**
1. Push this folder to a GitHub repo.
2. Go to vercel.com -> New Project -> import the repo.
3. Framework preset auto-detects "Vite" — leave build command
   (`npm run build`) and output directory (`dist`) as default.
4. Deploy. You'll get a `*.vercel.app` URL immediately, and can attach a
   custom domain afterward.

**Netlify:** same flow — import the repo, build command `npm run build`,
publish directory `dist`.

**Any static host:** run `npm run build` and upload the contents of `dist/`.
