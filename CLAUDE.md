# SM Luxe Salon — Website (sreemoulikaluxury)

Vite + React + TypeScript marketing site for SM Luxe Salon (Safilguda, Hyderabad). Deployed on Netlify at https://smluxesalon.com/. The repo is a single SPA that is **prerendered** at build time so each route ships as static HTML with full SEO meta.

> **Read this file before editing.** It captures the architecture, the rules that protect the deployment, and the commands you need to verify changes.

---

## Architecture in 60 seconds

```
src/
├─ App.tsx                  ── Routes, all lazy-loaded with React.lazy + Suspense
├─ index.tsx                ── HelmetProvider + hydrateRoot (prerender-aware)
├─ index.html               ── Static SEO meta + JSON-LD (BeautySalon, Restaurant, Organization)
├─ lib/cld.ts               ── Cloudinary URL helpers (cldUrl, cldVideoUrl, cldLqipUrl, …)
├─ components/
│  ├─ CldImage/             ── <CldImage> + <CldVideo> — the ONLY way to render media
│  ├─ Seo/Seo.tsx           ── Per-route <Helmet> with title, description, OG, JSON-LD
│  ├─ Hero/                 ── PageHero + HeroSection (video on home, image on subpages)
│  ├─ Contact/LazyMap.tsx   ── Google Maps iframe deferred until in viewport
│  ├─ images/<Section>/index.ts
│  │     └── AUTO-GENERATED barrels. Each export is a Cloudinary publicId string.
│  └─ utils/smCafeMenu.ts   ── Loads /data/cafe-menu.json at runtime (no rebuild needed)
public/
├─ data/cafe-menu.json      ── 81-item cafe menu, edit freely without redeploy
├─ robots.txt
├─ sitemap.xml
├─ manifest.webmanifest
└─ favicon*.png / .svg
scripts/
├─ cld-upload.mjs           ── One-time + idempotent Cloudinary uploader
├─ gen-favicons.mjs         ── Regenerates all favicon PNGs from the SM logo
└─ prerender.mjs            ── Post-build static prerender of all 6 routes
netlify.toml                ── Build command, security headers, cache rules
```

---

## Critical rules

| # | Rule | Why |
| - | --- | --- |
| 1 | **Never use `<img>` for jpgs/pngs/mp4s — use `<CldImage>` or `<CldVideo>`.** Plain `<img src="…">` works only for SVGs imported via `?react` (those become inline React components). | Every JPG/PNG/MP4 lives on Cloudinary at `websites/sm-luxe-salon/…`. The components emit responsive `srcset` with AVIF/WebP via `f_auto,q_auto`. Raw `<img>` ships a single uncompressed asset and breaks LCP. |
| 2 | **Image publicIds are *strings* from the generated barrels `src/components/images/<Section>/index.ts`.** Never hardcode a publicId literal. | If we re-org the Cloudinary folder, only the upload script + barrels change. Code keeps working. |
| 3 | **Hero/LCP `<CldImage>` must have `priority`.** | Sets `loading="eager"`, `decoding="sync"`, `fetchpriority="high"`. Without it LCP jumps 1–2 s. |
| 4 | **CSS background images use `cldUrl(publicId, { w, ar, c, g })` — never raw URLs.** | Lets the responsive transformation chain win even from CSS-in-JS. |
| 5 | **No `window.*` at module top.** Mobile detection must live in `useEffect` and start with a safe default. | Prerender runs in Puppeteer; `window` only exists during JSX render in the page, not at TS module top-level. SSR-unsafe modules crash the build. |
| 6 | **Per-route SEO lives in `Seo.tsx`.** Each route has a unique `<title>`, `<meta description>`, canonical, OG, Twitter, and (optionally) JSON-LD. | Helmet flushes during prerender, so Google sees the per-page meta as static HTML. |
| 7 | **Do not commit `.env`.** Cloudinary API key + secret live in `.env`, gitignored. The deployed site uses only `CLOUDINARY_CLOUD_NAME`. | Pushing the secret would let anyone delete or replace our assets. |
| 8 | **Cafe menu edits go in `public/data/cafe-menu.json`, not in TS.** | The menu loads at runtime — change the JSON, redeploy (or live-edit on Netlify), no code change required. |
| 9 | **Run `npm run typecheck && npm run build && npm run prerender` before pushing to main.** | Netlify's build runs the same chain. If it doesn't build locally it won't on Netlify. |
| 10 | **Don't downgrade `react-router-dom` below 6.30** — earlier versions have a known XSS via open-redirect (CVE in `@remix-run/router`). | Caught in `npm audit`. |

---

## Cloudinary

- **Cloud name** (public, ships to client): `dguwwzd5z`
- **Folder convention:** `websites/sm-luxe-salon/<section>/<slug>`
  - `website/` — site chrome (logo, partner brands)
  - `desktop/` — wide hero / landscape feature photos (S1-S7, NailandPedicureView)
  - `mobile/` — portrait hero crops (M1-M6, etc.)
  - `cafe/` — cafe imagery
  - `services/` — service tiles for the home grid
  - `about/` — about-page editorial photos
  - `gallery/<topic>/` — bridal, facial, fashion, haircolor, nail, saloninterior
  - `videos/` — homepage hero videos
- **Re-uploading is safe.** `scripts/cld-upload.mjs` overwrites + invalidates, so publicIds (the strings the code imports) never change between runs.
- **Adding a new image:**
  1. Drop the file into the appropriate `src/components/images/<Section>/` subfolder.
  2. `npm run cld:upload` (regenerates the barrel and uploads).
  3. Import the new publicId from the barrel and use `<CldImage publicId={...} alt="…" />`.

---

## Performance commitments

| Metric | Target | How we enforce it |
| --- | --- | --- |
| `dist/` size | < 5 MB | Cloudinary delivers all heavy media; no images bundled. |
| Initial JS gzip (home) | < 200 KB | Manual chunks in `vite.config.ts`; route-level `React.lazy`. |
| Per-route HTML | served as static file | `scripts/prerender.mjs` writes `dist/<route>/index.html` after `vite build`. |
| LCP image | preloaded | `<link rel="preload" as="image" imagesrcset …>` in `index.html`. |
| Compression | gzip + brotli pre-built | `vite-plugin-compression` emits `.gz` + `.br` alongside every asset; Netlify serves them. |

---

## Mandatory pre/post-edit checklist

**Before editing:**
1. Identify which file you're touching and confirm whether it's an SSR-safe module (no `window.*` at top level).
2. If you're adding a new image, make sure it's been uploaded to Cloudinary first.

**After editing:**
1. `npm run typecheck` — must be silent (zero errors).
2. `npm run build` — must finish under 90 s, `dist/` must stay under 5 MB.
3. `npm run prerender` — must produce 6 `dist/*/index.html` files.
4. Walk the route in preview: `npm run preview` (port 4173) — confirm hero, content, no console errors.
5. If you touched anything image-related, view each affected route in a real browser.

---

## Common commands

```bash
npm run dev                 # Vite dev server (defaults to 5173)
npm run typecheck           # tsc --noEmit
npm run build               # tsc check + vite build → dist/
npm run prerender           # Puppeteer prerender of all 6 routes (run after build)
npm run preview             # vite preview (4173) — serves dist/ as-built

npm run cld:upload          # Re-upload all local images + regenerate barrels
npm run cld:upload:dry      # Plan only, no API calls — useful before a big change
npm run favicons            # Rebuild favicons from the SM logo on Cloudinary
```

---

## Netlify

`netlify.toml` controls:
- **Build:** `npm run build && npm run prerender` (Node 20).
- **Security headers** on every response: CSP allowing `res.cloudinary.com`, `script.google.com` (contact form), `*.tawk.to` (live chat), `www.google.com` (maps iframe). Plus HSTS preload, X-Frame, Referrer-Policy, Permissions-Policy.
- **Caching:** `/assets/*` immutable for 1 year (hashed filenames); HTML revalidates on every visit.
- **SPA fallback:** unknown paths fall back to `/index.html` so client-side routing still works for deep links not in our route list.

---

## What lives where (Cheat sheet)

| If you want to change… | Edit… |
| --- | --- |
| Cafe menu items / prices | `public/data/cafe-menu.json` (no rebuild needed in dev — just refresh) |
| Salon service list / icons | `src/components/utils/constants.ts` (`ServicesList`) |
| Per-route title / OG / description / structured data | `src/components/Seo/Seo.tsx` |
| Global meta + JSON-LD that ships in every static HTML | `index.html` |
| Site-wide colours / typography | `src/styles.css` and CSS modules per component |
| Hero image / video per route | `src/components/Hero/PageHero.tsx` |
| Booking endpoint | `PostDetailsUrl` in `src/components/utils/constants.ts` (Google Apps Script webhook) |
| Phone number | `src/components/Contact/Contact.tsx`, `src/components/Footer/Footer.tsx`, `src/components/FloatingCall/FloatingCall.tsx`, and Schema in `index.html` |
| Sitemap | `public/sitemap.xml` |

---

## Known gotchas

- **`src/components/Banner/Banner.tsx`** is dead code (no route imports it). Don't waste time on it; leave it or delete it when convenient.
- **`src/components/Home/GoogleReviews.tsx`** has a pre-existing JSX-in-string concat bug at line ~38 (`'…' + <br /> + '…'`). Out of scope for now — fix as a separate PR with explicit user ask.
- **The first prerender pass after `vite build`** sometimes flakes if a route does heavy async work; `scripts/prerender.mjs` uses `domcontentloaded` + a content-presence check rather than `networkidle0` to avoid stalls on autoplay videos.

---

Maintained by Claude Code; questions to Rakesh Esari.
