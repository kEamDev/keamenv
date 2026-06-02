# VPN Diagnostics

Realtime React + Node.js dashboard for browser-side and server-side network diagnostics.

## Local Run

Requires Node.js 20+.

```bash
npm install
npm start
```

Frontend: http://localhost:5173  
Backend: http://localhost:4000

## Vercel Frontend Deploy

This repository is prepared for deploying the Vite frontend to Vercel.

Vercel settings:

- Build Command: `npm run build --workspace frontend`
- Output Directory: `frontend/dist`
- Install Command: `npm install`

Recommended production environment variables:

```bash
VITE_SITE_URL=https://your-domain.example
VITE_API_BASE=https://your-backend.example
VITE_WS_BASE=wss://your-backend.example
```

`VITE_SITE_URL` is used to generate `robots.txt`, `sitemap.xml`, canonical URLs and social metadata during build.

The current backend uses a long-running Node.js server with WebSocket diagnostics at `/ws/diagnostics`. Deploy it on a platform that supports persistent WebSocket connections, then point `VITE_API_BASE` and `VITE_WS_BASE` to that backend. Vercel frontend hosting is configured in `vercel.json`.

## GitHub Pages Free Deploy

The frontend can run for free on GitHub Pages in browser-only mode. In this mode the site uses `frontend/public/config.json` and skips backend/WebSocket diagnostics.

Steps:

1. Push the repository to GitHub.
2. Open repository settings: `Settings` -> `Pages`.
3. Set `Source` to `GitHub Actions`.
4. Push to `main` or `master`, or run `Deploy to GitHub Pages` manually from the `Actions` tab.

The workflow `.github/workflows/deploy-pages.yml` builds the frontend with:

```bash
VITE_BASE_PATH=/<repo-name>/
VITE_SITE_URL=https://<owner>.github.io/<repo-name>
```

This keeps Vite assets, `robots.txt`, `sitemap.xml`, canonical URLs and social metadata valid for GitHub Pages project hosting.

## Docker

```bash
docker compose up --build
```

Frontend: http://localhost:8080  
Backend: http://localhost:4000

## Notes

- REST endpoints:
  - `GET /api/config`
  - `GET /api/sites`
  - `GET /api/russian-sites`
  - `GET /api/hosts`
  - `GET /api/whitelist`
  - `GET /api/speed`
  - `GET /api/diagnostics`
- Realtime stream: `ws://localhost:4000/ws/diagnostics`, send `{"type":"run"}`.
- Browser availability checks use `fetch(..., { mode: "no-cors" })`, so they indicate whether the browser could initiate a request, not the target HTTP status code. Exact HTTP statuses are measured by the backend.
- Ping and traceroute availability depends on the host OS and container permissions. The backend returns structured errors when a system utility is unavailable.
