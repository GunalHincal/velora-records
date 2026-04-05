# Velora Records

Official website for **Velora Records**, an independent music label.

Live site: [https://velorarecords.vercel.app/]([https://velorarecords.vercel.app/](https://velora-records.com))  `<!-- update with your actual domain -->`

---

## About

This is a static label website built with plain HTML, CSS, and vanilla JavaScript. It serves as:

- Public-facing label page
- Artist and release showcase
- Verification page for Spotify for Artists access requests

---

## Tech Stack

- HTML5, CSS3, Vanilla JavaScript
- No frameworks, no build tools, no backend
- Google Fonts (Playfair Display, Inter)
- Content managed via a single JSON file

---

## Project Structure

```
velora-records/
├── index.html                  # Main page
├── style.css                   # All styles
├── script.js                   # Rendering logic
├── data/
│   └── content.json            # All artists and releases — edit here to add content
└── assets/
    ├── images/
    │   ├── artists/            # Artist photos (e.g. malik-ray.jpg)
    │   ├── releases/           # Release cover art (e.g. shade-money.jpg)
    │   └── brand/              # Logo and brand assets
    └── favicon/                # Favicon package
```

---

## Adding Content

All content is managed in [`data/content.json`](data/content.json). No code changes needed.

### Add an artist

```json
{
  "id": "artist-id",
  "name": "ARTIST NAME",
  "genre": "Genre",
  "bio": "Short bio.",
  "photo": "assets/images/artists/artist-id.jpg",
  "photoPlaceholder": false,
  "artistSpotifyUrl": "https://open.spotify.com/artist/..."
}
```

Place the artist photo in `assets/images/artists/`.

### Add a release

```json
{
  "id": "release-id",
  "title": "Release Title",
  "artist": "ARTIST NAME",
  "artistId": "artist-id",
  "type": "Single",
  "year": "2026",
  "upc": "0000000000000",
  "isrc": "XXXXXXXXXX",
  "cover": "assets/images/releases/release-id.jpg",
  "coverPlaceholder": false,
  "albumSpotifyUrl": "https://open.spotify.com/album/...",
  "appleMusicUrl": "https://music.apple.com/...",
  "youtubeMusicUrl": "https://music.youtube.com/watch?v=..."
}
```

Place the cover art in `assets/images/releases/`. The release will automatically appear under the correct artist's group in the Releases section.

---

## Releases Section

Releases are grouped by artist in an accordion layout. Clicking an artist's name expands their releases. When another artist is clicked, the previous one collapses. This keeps the page clean as the roster grows.

---

## Label Information (Verification)

The site publicly displays the following for platform verification purposes (e.g. Spotify for Artists):

| Field      | Value                 |
| ---------- | --------------------- |
| Label Name | Velora Records        |
| Contact    | hincalgunal@gmail.com |
| Artist     | MALIK RAY             |
| Release    | Shade Money           |
| UPC        | 8680948182925         |
| ISRC       | TRAKF1636353          |

---

## Running Locally

This site uses `fetch()` to load `content.json`, so it must be served over HTTP — opening `index.html` directly will not work.

**Option 1 — Node.js**

```bash
npx http-server . -p 8080
```

Then open `http://localhost:8080`.

**Option 2 — Python**

```bash
python -m http.server 8080
```

Then open `http://localhost:8080`.

**Option 3 — VS Code Live Server**

Install the [Live Server](https://marketplace.visualstudio.com/items?itemName=ritwickdey.LiveServer) extension, right-click `index.html`, and select **Open with Live Server**.

---

## Deployment

The site is fully static and can be deployed to any static hosting provider:

- **GitHub Pages** — push to `main`, enable Pages in repo settings
- **Netlify** — drag and drop the folder or connect the repo
- **Vercel** — import the repo, no configuration needed

---

## Current Roster

| Artist    | Releases                                         |
| --------- | ------------------------------------------------ |
| MALIK RAY | Shade Money, Gold Don't Sleep, Black Glass Heart |

---

&copy; 2026 Velora Records. All rights reserved.
