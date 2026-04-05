## Project

Build a clean, scalable, static label website for Velora Records.

## Main goal

This website will serve as:

1. a public-facing label page
2. a verification page for Spotify for Artists access requests
3. a reusable structure for multiple artists and releases over time

## Tech constraints

- Static website only
- Use HTML, CSS, and optional vanilla JavaScript
- No backend
- No framework unless absolutely necessary
- Mobile-friendly
- Easy to expand later

## Required pages and structure

Create:

- index.html
- style.css
- script.js
- assets/ folders for images
- optional JSON content file for future artist/release management

Recommended scalable content structure:

- `assets/artists/` for artist photos
- `assets/releases/` for cover artworks
- `data/content.json` for artists + releases data

## Design direction

The website should feel like a real independent record label website:

- modern
- minimal
- elegant
- dark or neutral premium aesthetic
- professional typography
- responsive layout
- visually strong hero section
- sections for label identity, artists, and releases

## Content requirements

The homepage must clearly show:

- Label name: Velora Records
- Public contact email: hincalgunal@gmail.com
- A short label description
- Artists section
- Releases section
- Verification-friendly information

## Initial data

First artist:

- Name: MALIK RAY

Releases:

1. First release:
   - Title: Shade Money
   - Artist: MALIK RAY
   - UPC: 8680948182925
   - ISRC: TRAKF1636353

2. Second release:
   - Title: Gold Don’t Sleep
   - Artist: MALIK RAY
   - UPC: 8680948206058
   - ISRC: TRAKF1640041

3. Third release:
   - Title: Black Glass Heart
   - Artist: MALIK RAY
   - UPC: 8680948206065
   - ISRC: TRAKF1640042

## Important verification requirement

The site must clearly and publicly display:

- Velora Records
- the contact email address
- MALIK RAY listed under the label
- Shade Money listed as a release
- Gold Don’t Sleep listed as a release
- Black Glass Heart listed as a release

## Scalability requirement

Do not build this as a one-artist-only page.
Build it so more artists and releases can be added later with minimal editing.

This part is important:

- The artist area should support multiple artist cards.
- The releases area should not become one long mixed list when more artists are added.
- Build a structure where releases can be browsed by artist.
- When a user clicks an artist card, the releases section should update to show only that artist’s releases.
- Keep this possible with simple static JavaScript filtering.
- Default state can show either:
  - all releases grouped by artist, or
  - one selected artist at a time

## Recommended release UX

Use one of these scalable patterns:

### Preferred pattern

Create an **artist selector / tab system** inside the Releases section.

Example behavior:

- Artist cards appear in the Artists section.
- In the Releases section, show a horizontal selector such as:
  - MALIK RAY
  - Future Artist 2
  - Future Artist 3
- When `MALIK RAY` is selected, only Malik Ray releases are shown.
- Each artist can have grouped subsections like:
  - Singles
  - EPs
  - Albums

For now, MALIK RAY should show:

- Singles
  - Shade Money
  - Gold Don’t Sleep
  - Black Glass Heart

### Alternative pattern

Use an artist detail page approach later if needed:

- homepage = label + artist overview
- click artist = go to `artist-malikh-ray.html`
- that page shows all releases for that artist

For now, keep the first version on a single homepage, but structure the code so a per-artist page can be added later.

## Layout instruction for current stage

Because there is currently only one artist, the site can still visually look simple.
But the internal structure must already be prepared for expansion.

So:

- keep MALIK RAY visible in the Artists section
- update the Releases section so it is conceptually artist-based, not just a flat release list
- add a small heading or selector such as `Browse by Artist` or `Selected Artist`
- under MALIK RAY, show the three releases in the same visual card format already used on the site
- preserve the current premium layout and card style as much as possible
- do not break the existing visual hierarchy

## Data model suggestion

If using JSON, structure it like this:

```json
{
  "label": {
    "name": "Velora Records",
    "email": "hincalgunal@gmail.com"
  },
  "artists": [
    {
      "id": "malik-ray",
      "name": "MALIK RAY",
      "genre": "Hip-Hop / Rap",
      "bio": "Optional short artist bio",
      "image": "assets/artists/malik-ray.jpg"
    }
  ],
  "releases": [
    {
      "title": "Shade Money",
      "artistId": "malik-ray",
      "type": "Single",
      "upc": "8680948182925",
      "isrc": "TRAKF1636353",
      "cover": "assets/releases/shade-money.jpg"
    },
    {
      "title": "Gold Don’t Sleep",
      "artistId": "malik-ray",
      "type": "Single",
      "upc": "8680948206058",
      "isrc": "TRAKF1640041",
      "cover": "assets/releases/gold-dont-sleep.jpg"
    },
    {
      "title": "Black Glass Heart",
      "artistId": "malik-ray",
      "type": "Single",
      "upc": "8680948206065",
      "isrc": "TRAKF1640042",
      "cover": "assets/releases/black-glass-heart.jpg"
    }
  ]
}
```

## Image handling

If no real images are provided:

- generate clean placeholders
- include a text-based logo treatment for Velora Records
- create sections where future artist photos, cover art, and brand images can be placed easily
- keep image filenames easy to replace later

## Writing style

- concise
- professional
- trustworthy
- no fake addresses
- no fake registrations
- no fake team members
- no fake social media links
- do not invent business claims

## Output expectation

After building the site:

- explain all created files
- explain where to place future artist and release images
- explain how to preview locally
- explain how to publish publicly in the fastest way

## Extra implementation note

When updating the current design, do not redesign everything from scratch.
Preserve the existing look and feel from the current version shown in the screenshot.
Only expand the structure so it supports:

- multiple releases under one artist
- multiple artists later
- artist-based release browsing without visual clutter
