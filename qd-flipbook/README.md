# Quantum Dynamics Limited: Digital Company Profile

A 16-page A4 corporate profile, shown as an interactive flipbook and also exported as a print-ready PDF.

## Run locally
Requires Node 18 or later.

```bash
npm install
npm run dev          # http://localhost:5173
```

## Build and PDF
```bash
npm run build:all    # production build in dist/ + PDF in public/ and dist/
npx playwright install chromium   # first time only, if Playwright reports a missing browser
```
- `npm run build`: static site in `dist/`. Relative paths, so it can be hosted anywhere or opened from any web server.
- `npm run pdf`: renders the `?print` view to `public/QD-Company-Profile.pdf`, which is vector text at A4 size. Run it after content changes.
- `npm run preview`: serves `dist/` at http://localhost:4173.

## Reader features
Styled after a classic digital-flipbook viewer (dark toolbar on a grey stage, side tabs on the book edges).
- Toolbar: Home, Zoom, Thumbnails, Table of contents, First / Previous, a page box (type a page number and press Enter), Next / Last, Auto flip, Share, Print, Download PDF, Full screen, and Search.
- Search finds text on every page and jumps to it.
- Thumbnail strip along the bottom; table-of-contents panel on the left.
- Realistic page turns: drag a corner, swipe, use the side tabs, or the keyboard.
- Keyboard: `←` `→` / PageUp PageDown / Space to turn pages; `Home` / `End`; `+` `−` `0` to zoom (up to 300%); `F` full screen; `T` contents; `Esc` closes panels.
- Two-page spreads on desktop, single pages on portrait tablets; covers are centred.
- **Read mode** (Book / Read switch): the same content as a scrolling page with 17px text and tap-to-call links. Phones open in Read mode automatically.
- A loading screen preloads fonts and photographs.

## Structure
```
src/data/content.ts        all copy (edit text here)
src/pages/*.tsx            the 16 page layouts (794×1123 px = A4 @ 96 dpi)
src/components/Page.tsx    page frame (running heads, folios), Photo, SectionTitle
src/components/Blueprints  original schematic line drawings (tank, tower)
src/components/ReadView    reflowed reading view for phones (uses the same content.ts)
src/components/Flipbook    react-pageflip wrapper
src/App.tsx                reader UI
scripts/export-pdf.mjs     PDF exporter (Playwright)
public/images/             photography (stock, illustrative)
```

## Assets and licensing
- Fonts: Archivo, IBM Plex Sans/Mono and Source Serif 4. All are under the SIL Open Font License and bundled locally through @fontsource.
- Photographs: Unsplash License, used for illustration only. They are labelled as illustrative in the publication. Replace them with QD project photos by keeping the same file names.
- Logo: a vector trace of the existing QD mark. See CONFIRMATION.md, item 3.

Open questions for the company are listed in **CONFIRMATION.md**.
