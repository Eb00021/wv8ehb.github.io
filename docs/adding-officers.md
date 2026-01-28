# Adding or updating officers

Officers and members can update the roster and bios by editing a single file. No HTML or layout edits are required.

## Where to edit

- **File:** `_data/officers.json`  
- **Images:** `assets/officers/`

## What to change

1. **Add an officer**  
   Add a new object to the array in `_data/officers.json`. Use the same fields as existing entries.

2. **Update an officer**  
   Find that person’s object in `_data/officers.json` and change the relevant fields.

3. **Remove an officer**  
   Delete that person’s object from the array.

4. **Change order**  
   Change the `order` value. Lower numbers appear first on the Officers page.

## Field reference

| Field         | Description                          | Example                          |
|--------------|--------------------------------------|----------------------------------|
| `id`         | URL slug, lowercase, hyphens         | `"vice-president"`               |
| `order`      | Display order (1 = first)            | `3`                              |
| `title`      | Role title                           | `"President"`                    |
| `name`       | Full name                            | `"Aidan Kern"`                   |
| `callsign`   | Amateur callsign or `null`           | `"N3AMK"`                        |
| `licenseClass` | License class or `null`           | `"General"`                      |
| `email`      | Email or `null`                      | `"wvuarc+president@gmail.com"`   |
| `phone`      | Phone or `null`                      | `"(304) 293-9139"`               |
| `building`   | Office/location or `null`            | `"361 AERB"`                     |
| `buildingUrl`| Link for building or `null`          | `"https://..."`                  |
| `major`      | Major/degree or `null`               | `"Electrical Engineering"`      |
| `image`      | Path to portrait                     | `"/assets/officers/president.jpg"` |
| `blurb`      | Short summary for Officers index     | One sentence.                    |
| `bio`        | Full bio for the officer’s bio page  | One or more paragraphs.         |

## Portrait images

- Save the image under `assets/officers/`, e.g. `assets/officers/president.jpg`.
- Set `image` to `"/assets/officers/president.jpg"` (include the leading `/`).
- Use a clear, front-facing photo; it will be shown in a circle.

## After editing

Run the build so the site reflects your changes:

```bash
npm run build
```

Deploy the `_site/` folder to your host. The Officers index and each officer’s bio page are generated from `_data/officers.json` during the build.
