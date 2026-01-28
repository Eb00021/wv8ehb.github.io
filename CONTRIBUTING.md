# Contributing to the W8CUL Website

This document describes how to update content on the WVU Amateur Radio Club website, especially for officers and members who may not be familiar with the codebase.

## Build and deploy

The site is built with [Eleventy](https://www.11ty.dev/). To build locally:

```bash
npm install
npm run build
```

Output is written to `_site/`. Deploy the contents of `_site/` to your host (e.g. Cloudflare Pages).

To preview locally:

```bash
npm run serve
```

## Adding or changing officers

Officer roster and bios are driven by a single data file. You do not need to edit HTML.

1. **Edit the officers data**  
   Open `_data/officers.json` and add, remove, or update one object per officer.

2. **Fields for each officer**
   - `id` — URL slug (e.g. `president`, `vice-president`). Use lowercase and hyphens. Must be unique.
   - `order` — Display order (1 = first). Use this to control the order on the Officers page.
   - `title` — Role (e.g. "President", "Faculty Advisor").
   - `name` — Full name.
   - `callsign` — Amateur callsign, or `null` if none.
   - `licenseClass` — License class (e.g. "General", "Amateur Extra"), or `null`.
   - `email` — Email address, or `null`.
   - `phone` — Phone number, or `null`. Used only for some roles (e.g. Faculty Advisor).
   - `building` — Office/location string, or `null`.
   - `buildingUrl` — Link for the building (e.g. directions), or `null`.
   - `major` — Major/degree, or `null`. Omit or use `null` for non-student roles.
   - `image` — Path to portrait, e.g. `"/assets/officers/president.jpg"`.
   - `blurb` — Short summary shown on the Officers index.
   - `bio` — Full bio shown on the officer’s bio page.

3. **Portrait images**  
   Put portrait images under `assets/officers/` and set `image` to `"/assets/officers/your-file.jpg"` (or `.png`). Use a clear, square-ish image; the layout uses a circle crop.

4. **Regenerate the site**  
   Run `npm run build`. The Officers index and each officer’s bio page are generated from `_data/officers.json`. No need to touch HTML.

### Example: adding a new officer

Add an object to the `_data/officers.json` array:

```json
{
  "id": "new-role",
  "order": 14,
  "title": "New Role",
  "name": "Jane Doe",
  "callsign": "W8ABC",
  "licenseClass": "General",
  "email": "wvuarc+newrole@gmail.com",
  "phone": null,
  "building": null,
  "buildingUrl": null,
  "major": "Electrical Engineering",
  "image": "/assets/officers/new-role.jpg",
  "blurb": "One sentence summary.",
  "bio": "Full paragraph or more for the bio page."
}
```

Add the portrait at `assets/officers/new-role.jpg`, then run `npm run build`.

### Example: changing an officer’s bio

Find that officer’s object in `_data/officers.json`, edit `blurb` and/or `bio` (and any other fields), save, and run `npm run build`.

## Last updated date

For pages built by Eleventy, the “Last updated” line uses the date of the last git commit at build time. You do not need to run `processDates.sh` for the Eleventy-built output.

If you are still editing the legacy raw HTML files and deploying those, you can run `./processDates.sh` to inject the last commit date into those files. The script no longer creates `.bak` files.

## Questions

For site structure, deployment, or dev setup, contact the webmaster or open an issue in the project repository.
