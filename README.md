# WVU Amateur Radio Club (W8CUL) Website

Static site for the WVU Amateur Radio Club, built with [Eleventy](https://www.11ty.dev/).

## Build and deploy

```bash
npm install
npm run build
```

Output is in `_site/`. Deploy that folder to your host.

### GitHub Pages (e.g. eb00021.github.io/wv8ehb.github.io)

1. In **Settings → Pages**, set **Source** to **GitHub Actions**.
2. Push to `main` or `dev`; the workflow builds 11ty and deploys `_site/`.
3. Ensure `_data/site.json` has `"baseUrl": "/wv8ehb.github.io"` and `"url": "https://eb00021.github.io/wv8ehb.github.io"` so asset and link URLs work from that path.

```bash
npm run serve
```

Runs a local dev server with live reload.

## Editing content

- **Officers and bios:** Edit `_data/officers.json`. See [docs/adding-officers.md](docs/adding-officers.md) and [CONTRIBUTING.md](CONTRIBUTING.md).
- **Site-wide settings (name, URL, etc.):** Edit `_data/site.json`.

## Structure

- `_data/` — Site and officers data (JSON).
- `_includes/` — Layout and partials (header, nav, footer, etc.).
- `index.njk`, `officers/index.njk`, `officer-bio.njk` — Page templates.
- `assets/`, `styles.css`, `javascripts/` — Static assets (passed through to `_site/`).
