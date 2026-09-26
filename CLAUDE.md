# CLAUDE.md — Frontend Website Rules

## Always Do First
- Before writing any frontend code, read the **Anti-Generic Guardrails** and **Hard Rules** below and design to them.

## Repo layout
This is a single repo (`kalvenz95/ai_majaslapa`) holding several projects. **The repo root IS the Next.js app** — that is also what Vercel builds (Root Directory = repo root, deployed via GitHub integration). Do not move `package.json`, `src/`, `prisma/` or `next.config.js` out of the root.

```
/                      <- Next.js app (main project) + Vercel prod build
├─ src/, prisma/, public/
├─ lapas/              <- 4 standalone static sites, own Vercel projects
├─ satura-deploy/      <- static site, own Vercel project (satura-specialisti)
├─ Chademy/            <- Expo / React Native app (separate toolchain)
├─ prototypes/         <- standalone *.html design prototypes
└─ scripts/            <- puppeteer screenshot + static-serve tooling
```

The rules below are **not** interchangeable between these.

- **Next.js app (repo root) — the main active project.** TypeScript, App Router, next-intl (`lv`/`en`), Prisma, Clerk. Tailwind v3 is installed via PostCSS (**not** the CDN) and is required by the build, but usage is split:
  - **Marketing pages (`src/components/home/`, `src/components/marketing/`)** — styled with inline `style={{}}` objects, custom CSS classes (`v2-h2`, `lp-container`, `btn-primary`) and CSS custom properties (`var(--ink)`, `var(--accent)`) from `src/app/globals.css`. **Match this — do not introduce utility classes here.**
  - **Admin panel and shadcn/ui (`src/app/admin`, `src/components/admin`, `src/components/ui`)** — real Tailwind utility classes. Match that instead.
  - The "Output Defaults" section (single `index.html`, Tailwind CDN) does NOT apply to this project.
- **`lapas/` — 4 standalone static sites** (`la-skrundo`, `dessert-deagle-site`, `pity-store`, `chademy-landing`) and **`satura-deploy/`**, each deployed to its own Vercel project via the Vercel CLI from inside that folder (each keeps its own gitignored `.vercel/`). The "Output Defaults" section applies to these.
- **`Chademy/`** — Expo app with its own `package.json`, `tsconfig.json` and `.gitignore`. It is **excluded from the root `tsconfig.json`**, so the Next build never typechecks it. Run its own tooling from inside that folder. Keep it excluded — adding it to the root tsconfig breaks the production build.

## Reference Images
- If a reference image is provided: match layout, spacing, typography, and color exactly. Swap in placeholder content (images via `https://placehold.co/`, generic copy). Do not improve or add to the design.
- If no reference image: design from scratch with high craft (see guardrails below).
- Screenshot your output, compare against reference, fix mismatches, re-screenshot. Do at least 2 comparison rounds. Stop only when no visible differences remain or user says so.

## Local Server
- **Always serve on localhost** — never screenshot a `file:///` URL.
- **Next.js app:** `npm run dev` from the repo root → `http://localhost:3000`. Routes are locale-prefixed: `/lv`, `/en`.
- **Static sites:** `node scripts/serve.mjs lapas/<site>` from the repo root → `http://localhost:3000`. `serve.mjs` takes the directory to serve as its first argument (defaults to the current working directory).
- Both use **port 3000**, so only one can run at a time. Start it in the background before taking any screenshots.
- If a server is already running, do not start a second instance — check first with `curl -s -o /dev/null -w "%{http_code}" http://localhost:3000`.

## Screenshot Workflow
- Puppeteer (v24) is installed in `node_modules/` of the **parent** folder `D:/Documents/Desktop/AI_APP/` (outside this repo); `scripts/screenshot.mjs` resolves it by walking up, so it works as-is. `scripts/package.json` records that dependency. Chrome cache is at `C:/Users/Kalvis24/.cache/puppeteer/`.
- **Always screenshot from localhost:** `node scripts/screenshot.mjs http://localhost:3000`
- Screenshots are saved to `D:/Documents/Desktop/AI_APP/temporary screenshots/screenshot-N.png` (absolute path inside the script, outside this repo, auto-incremented, never overwritten).
- Optional label suffix: `node scripts/screenshot.mjs http://localhost:3000 label` → saves as `screenshot-N-label.png`
- After screenshotting, read the PNG from that folder with the Read tool — Claude can see and analyze the image directly.
- When comparing, be specific: "heading is 32px but reference shows ~24px", "card gap is 16px but should be 24px"
- Check: spacing/padding, font size/weight/line-height, colors (exact hex), alignment, border-radius, shadows, image sizing

## Output Defaults — new static prototypes only (not the Next.js app)
- Applies to `lapas/`, `satura-deploy/` and `prototypes/` — never to the repo root.
- Single `index.html` file, all styles inline, unless user says otherwise
- Tailwind CSS via CDN: `<script src="https://cdn.tailwindcss.com"></script>`
- Placeholder images: `https://placehold.co/WIDTHxHEIGHT`
- Mobile-first responsive

## Brand Assets
- A `brand_assets/` folder does not currently exist. If one appears, check it before designing — it may hold logos, color guides, style guides, or images.
- If assets exist there, use them. Do not use placeholders where real assets are available.
- If a logo is present, use it. If a color palette is defined, use those exact values — do not invent brand colors.
- For the Next.js app, the brand palette already lives in `src/app/globals.css` as CSS custom properties — use those, do not invent new colors.

## Anti-Generic Guardrails
- **Colors:** Never use default Tailwind palette (indigo-500, blue-600, etc.). Pick a custom brand color and derive from it.
- **Shadows:** Never use flat `shadow-md`. Use layered, color-tinted shadows with low opacity.
- **Typography:** Never use the same font for headings and body. Pair a display/serif with a clean sans. Apply tight tracking (`-0.03em`) on large headings, generous line-height (`1.7`) on body.
- **Gradients:** Layer multiple radial gradients. Add grain/texture via SVG noise filter for depth.
- **Animations:** Only animate `transform` and `opacity`. Never `transition-all`. Use spring-style easing.
- **Interactive states:** Every clickable element needs hover, focus-visible, and active states. No exceptions.
- **Images:** Add a gradient overlay (`bg-gradient-to-t from-black/60`) and a color treatment layer with `mix-blend-multiply`.
- **Spacing:** Use intentional, consistent spacing tokens — not random Tailwind steps.
- **Depth:** Surfaces should have a layering system (base → elevated → floating), not all sit at the same z-plane.

## Hard Rules
- Do not add sections, features, or content not in the reference
- Do not "improve" a reference design — match it
- Do not stop after one screenshot pass
- Do not use `transition-all`
- Do not use default Tailwind blue/indigo as primary color
