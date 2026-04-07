# CWU — Commonwealth Union Network

Marketing landing site for **CWU** (Commonwealth Union Network): hero, network story, leadership carousel, how‑to‑buy, roadmap, FAQ, and community links. Built as a **single-page React app** with in-page sections (`#about`, `#network`, `#advisory`, `#how-to-buy`, `#faq`, etc.).

**Token:** CWU on **Solana**  
**Public launch date (site copy):** 8 April 2026  
**Reference domain (SEO / links in repo):** `https://blockchain.commonwealthunion.com/`

---

## Stack

- **React 19** + **TypeScript**
- **Vite 8**
- **Tailwind CSS 4** (`@tailwindcss/vite`)
- **lucide-react** (icons)
- **@fontsource/dm-sans** (DM Sans; Georgia used for headings via CSS)

---

## Prerequisites

- **Node.js** 20+ (or current LTS)  
- **npm** (comes with Node)

---

## Scripts

| Command        | Description                                      |
|----------------|--------------------------------------------------|
| `npm run dev`  | Dev server with HMR (default Vite URL/port).    |
| `npm run build`| Typecheck + production build → `dist/`.        |
| `npm run preview` | Serve `dist/` locally for smoke tests.   |
| `npm run lint` | ESLint.                                          |

---

## Local development

```bash
npm install
npm run dev
```

Open the URL Vite prints (usually `http://localhost:5173`).

---

## Production build

```bash
npm run build
```

Output is in **`dist/`**. Preview:

```bash
npm run preview
```

Deploy **`dist/`** to any static host (CDN, S3 + CloudFront, Netlify, Vercel static, nginx, etc.). Ensure **history fallback** for SPAs if you later add client routes; this app is a **single `/`** entry with hash or scroll anchors only.

---

## Project layout (short)

| Path | Description |
|------|-------------|
| `index.html` | Entry HTML, meta/SEO, JSON-LD (`WebSite`, `Organization`) |
| `public/` | Static assets (`robots.txt`, `sitemap.xml`, images, favicon) |
| `src/App.tsx` | Page shell, section order, hash scroll, FAQ JSON-LD mount |
| `src/faqContent.ts` | FAQ questions/answers (shared UI + structured data) |
| `src/SeoFaqJsonLd.tsx` | Renders **FAQPage** schema.org JSON-LD |
| `src/Hero*.tsx`, `Header*.tsx`, `*Section.tsx` | Feature sections |

---

## SEO & metadata

Configured for crawlers and sharing:

- **Canonical URL**, **Open Graph**, **Twitter** (`summary_large_image`) in `index.html`
- **`WebSite`** + **`Organization`** JSON-LD in `index.html`
- **`FAQPage`** JSON-LD generated from `src/faqContent.ts` (must stay in sync with the FAQ UI)
- **`public/robots.txt`** and **`public/sitemap.xml`**
- Single visible **`<h1>`** in the hero (`HeroHeadline.tsx`) for page topic
- **Viewport** allows zoom (removed `user-scalable=no` for accessibility and common SEO hygiene)

### If your production URL is not `blockchain.commonwealthunion.com`

Search and replace the canonical host in:

1. `index.html` — `link[rel=canonical]`, `og:url`, `og:image`, `twitter:image`, JSON-LD `@id` / `url`
2. `public/robots.txt` — `Sitemap:` line
3. `public/sitemap.xml` — `<loc>`
4. `package.json` — `homepage`

Optional: add a dedicated **`public/og-image.png`** (e.g. **1200×630**), then point `og:image` / `twitter:image` to `https://your-domain/og-image.png` for best social previews.

---

## Content notes

- FAQ copy lives in **`src/faqContent.ts`**; edit there so FAQs and FAQ rich results stay aligned.
- Footer and FAQ reference **`blockchain.commonwealthunion.com`** for the official site.

---

## License

**Private** — not intended for open redistribution; see `package.json` (`"private": true`).

---

## Maintenance checklist

- [ ] After domain changes, update URLs listed in **SEO & metadata** above.
- [ ] Optionally add a dedicated **OG image** and wire it in `index.html`.
- [ ] Re-run `npm run build` before release; fix any `tsc` / ESLint issues.
