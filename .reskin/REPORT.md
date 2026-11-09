# Reskin report — custoria.xyz

The UI was rebuilt around **Bubblegum Exchange** / **Split Stage**; the original **terminal-console**
shell and palette were removed while the content contract stayed byte-for-byte intact.

- Project: `E:/workspace/chuangye/solana/ppmt2s/website` (Vue 3.5 + Vite 6, single route `/`)
- Verified: `node <reskin>/scripts/verify.mjs check` → **PASS, 0 blocking issues, 0 warnings**
- Content-contract hash: `5d336251dc521412913ddd8cec9b68b547eca5b86a742dd6c94bbe43e01ddd6a`
- Scope: the website **and** the X kit (`../twitter/`), rebuilt in the same art direction in this pass.

## 1. Art direction

| | |
|---|---|
| Style DNA | `uniswap-bubblegum` → “Bubblegum Exchange” (clean-fintech) |
| Source URL | https://uniswap.org (live sample, 8/10 references answered; arbitrum.io 403, optimism.io timeout) |
| Skeleton | `split-stage` (spatial) — chosen against the original `terminal-console` (linear) |
| Accent | old `#28A0F0` → **`#E6006F`**, ΔE **99.85** (min 30) |
| Ground | white `#FFFFFF` with `#F9F8FA`/`#F2EEF3` surfaces and two soft pink radial orbs |
| Type | display/body `Avenir Next` → Segoe UI/system at weight 600, tracking −0.03em; every numeral and micro-label in `Cascadia Mono` |
| Shape | 12 / 22 / 32px radii plus pill buttons, 1px `#E9E4EB` hairlines, one soft lift shadow |
| Texture | floating bubble rings, a magenta gradient orb (staking diagram), fine dividers, compact ledger rows |

No logo, illustration, photography, copy or code was taken from any reference; only palette, typography
mood, shape language, density and motion were used. The Custoria mark was redrawn for this palette (§6).

## 2. What replaced what

**Original archetype:** dark navy “Signal Navy / Terminal Console” — a 46px sticky status bar, a 236px
left command rail inside `<main>`, a dense console market with a category rail, a numbered proof pipeline
with a passport card, an orbit-and-calculator rewards block, a flat allocation table and a four-row
hint bar. Max DOM depth 14, monospace everywhere, 3–10px radii.

**New shell:** a split stage — a sticky 40% narrative column (brand, status, primary CTA, vertical index,
prototype mint, account actions) beside a 60% scrolling data stage, with a full-width footer band below.

```
div.cx-app
  div.cx-page                          grid: minmax(300px,40fr) / minmax(0,60fr)
    aside.cx-rail                      sticky top:0, 100svh, own scroll on short screens
      brand · status line · Explore collectibles (pill CTA)
      nav.cx-index                     vertical 01–04 index (CSS-numbered)
      mint strip (PROTOTYPE MINT · address · COPY)
      locale · Become a seller · Connect wallet · X follow · 3 trust pills
    main.cx-stage #top
      cx-hero        eyebrow · h1 · lede · How trading works · feature lot card (photo + spec ledger)
      cx-band        01–03 annotated principle rows on hairlines
      cx-market      pill filters · search/sort toolbar · 5 lot rows · footnote
      cx-proof       tinted pink band: vertical stage ledger · item ticket · escrow chain
      cx-rewards     sandbox card · gradient-orb signal diagram · formula strip · disclosure bar
      cx-supply      oversized total · allocation table with proportion bars
      cx-plan        phase ledger rows with marker dots
      cx-cta         magenta gradient prompt panel
    footer.cx-foot                     full-width band: brand, links, legal, disclaimer, credits
```

| Original composition | New composition |
|---|---|
| status bar + top nav + left command rail | sticky narrative rail: brand, status, CTA, 01–04 index, mint, account actions |
| 2-column hero + inspector card | stage hero: h1 + lede + link action, then a split feature lot card |
| 3 stacked readout rows | three annotated principle columns separated by hairlines |
| category rail + console toolbar + ledger rows | pill filter row + toolbar card + lot rows (thumb / body / meta / price) |
| 3 stage cards + passport aside + escrow row | vertical numbered stage ledger + ticket-style passport + wrapped escrow chain |
| calculator + orbit graphic + explainer + disclosure | sandbox card + orb/nodes diagram + explainer + formula + disclosure |
| centred supply line + coloured rows | oversized total + allocation table with proportion bars |
| 4 phase cards on a track | phase ledger rows with mono markers and state dots |
| coral prompt bar | magenta gradient CTA panel |
| 4-row hint bar | two-column footer band |

**Deleted from the render path:** `src/style.css` (78KB, the entire `sg-*` Signal Navy stylesheet) is
removed from disk (backup: `.reskin/backup/legacy-stylesheet/style.css`); `src/main.js` now imports
`./styles/cx.css`. Every class name, selector and design token is new: 210 rendered class tokens, all
`cx-*` except the library's `lucide-*`; overlap with the baseline is **0.057** (only icon classes).
`<script setup>` is byte-identical — no data, handler, i18n value, route or formatting change.

## 3. Evidence

Screenshots (baseline = the rebranded, pre-reskin site; current = this reskin):

| | baseline | current |
|---|---|---|
| desktop 1440×900 | `.reskin/baseline/home-desktop.png` | `.reskin/current/home-desktop.png` |
| mobile 390×844 | `.reskin/baseline/home-mobile.png` | `.reskin/current/home-mobile.png` |

Interaction review (real Chrome, 0 console/page errors): `.reskin/detail/desktop-fold.png`,
`dialog-item.png`, `dialog-checkout.png`, `dialog-seller.png`, `dialog-wallet.png`, `focus-cta.png`,
`mobile-fold.png`, `mobile-menu.png`, `mobile-market.png`, `mobile-top.png`, `mobile-mid.png`,
`crop-rail.png`, `crop-hero.png`, `crop-market.png`.

A user would not recognise the two screens as the same product shell: the navigation moved from a dark
console rail into a light narrative column, the hero turned into an annotated feature lot, the card grid
became a ledger, and the navy/electric-blue palette became white/magenta.

## 4. Verification

`node scripts/verify.mjs check --project . --out .reskin` → **PASS**

| Gate | Threshold | Result |
|---|---|---|
| Source content contract | no removals/rewrites, no added copy | **intact, 0 warnings** |
| Rendered words per route | multiset equal | **542 words, identical** |
| Rendered attributes / forms / links / title | equal | identical (0 field, image, name issues) |
| Numeric tokens | reported | **32 tokens / 51 occurrences both sides** |
| DOM fingerprint similarity | ≤ 0.50 | **0.422** |
| Landmark sequence similarity | ≤ 0.68 | **0.500** (`header→main→nav→footer` vs `aside→nav→main→footer`) |
| CSS class overlap | ≤ 0.10 | **0.057** (lucide icon classes only) |
| Accent distance | ≥ 30 ΔE | **99.85** |
| Route status / build / console | clean | 200, build pass, 0 console errors, 0 page errors |
| Horizontal overflow 1440 / 390 | none | **none** |
| Text contrast | 0 failures | **0 / 259** on both viewports (baseline was also 0 / 267) |
| Images without alt / fields without label / controls without name | 0 | **0 / 0 / 0** |
| axe WCAG 2.x serious+critical | 0 | **0** (also 0 moderate) |
| Keyboard focus visibility | ≥ 1 | **8 / 8** sampled stops show a 2px `#E6006F` ring |
| Mobile navigation | reachable | **reachable** (index strip + fixed menu sheet) |
| Headings | one `h1` | **1 `h1`**, 21 headings |

Note on the classifier label: `.reskin/inventory.json` reports the new shell as `sidebar-workspace`
(`shell`) because the inventory keys any `<aside>` landmark as a sidebar; the implemented composition is
the selected Split Stage (40/60 split, sticky narrative column, scrolling stage). The gate passes on both
`id` and `family` change, and §2/§3 show the silhouette is not the old console.

## 5. Accessibility & responsiveness

- Landmarks: `aside` (narrative) → `nav` (index, labelled from existing copy) → `main` → `footer`; no
  banner landmark, matching the “no top navigation bar” brief. The mobile menu is a second `nav` with an
  existing label.
- Focus: global `:focus-visible` 2px `#E6006F` ring with 3px offset on every link, button, input and
  select; the mobile menu button carries `aria-expanded` and the existing open/close labels.
- Contrast: body `#0D0D0D` on white, muted `#6D6A70` on `#FFFFFF`/`#F9F8FA`, accent text `#C2005D`
  (never `#E6006F` for normal-size text). The CTA panel is a `#9C0048` base with a gradient overlay, so
  white copy measures 7.6:1 at its solid fallback. 0 failures over 259 measured text nodes.
- Forms keep their programmatic labels: `label[for="stake-amount"]`, `aria-label` on search, sort, range
  and membership selects; the range control uses `accent-color`.
- Images keep their existing `alt`; decorative marks use empty `alt`; icon buttons carry existing labels;
  `aria-pressed` on the heart, `aria-selected` on tabs, `aria-expanded` on the menu toggle.
- Motion: hover lift, image zoom, toast and modal transitions are 200ms and neutralised by
  `@media (prefers-reduced-motion: reduce)`.
- Responsive: 1280px rail padding tightens; 1100px proof/rewards stack; 1024px the split collapses into a
  header rail with a horizontally scrollable index strip (fade mask) and a fixed menu sheet; 860px the
  feature card stacks and lot rows re-flow; 620px the lot price moves to its own row; 720/460px type and
  dialogs compact to full-height sheets. No document overflow at 1440 or 390.

## 6. Brand assets and the X kit

The rebrand generated a generic blue `#28A0F0` monogram; that clash with the new magenta system was
resolved by re-drawing the same identity (a “C” arc plus a bubble dot) in the reskin palette:

| Asset | Change |
|---|---|
| `public/brand/logo.svg` (800×800) | pink gradient rounded square, white C arc, bubble dots |
| `public/brand/logo.png` (800×800, transparent) | rendered from the SVG in real Chrome |
| `public/brand/logo-lockup.svg` (1200×400) | mark + `custoria.xyz` wordmark + `COLLECT WITH CONTEXT.` |
| `index.html` | `theme-color` `#071a33` → `#e6006f` (title, description, language and icon unchanged) |

Backups of the previous assets: `.reskin/backup/brand-before-reskin/`. The mark is re-used inside the
site (rail, staking orb core, CTA panel, dialogs).

**X kit** (`../twitter/`), rebuilt in the same art direction at the original canvas sizes:

| File | Size | Content |
|---|---|---|
| `banner.svg` / `.png` | 1500×500 | mark + wordmark, “Real collectibles. On-chain proof.”, escrow / Item NFT / Trade Proof pills |
| `first-tweet-graphic.*` | 1600×900 | launch card: mark, wordmark, headline, four feature tiles |
| `tokenomics-graphic.*` | 1600×900 | supply card, two fee-rail cards, funding-principle bar |
| `burn-to-nft-graphic.*` | 1600×900 | seven-step ledger, release card, failed-review card |
| `staking-fee-graphic.*` | 1600×900 | reward-pool formula card, lock multipliers, membership card, no-fixed-APY card |
| `physical-to-nft-graphic.*` | 1600×900 | four-step physical→NFT flow, before/after band |
| `logo.png` | 800×800 | profile mark for X (transparent) |

Sources are plain SVGs written by `.reskin/tools/build_x_kit.py`; PNGs are rendered from them with real
Chrome (`.reskin/tools/render-x-kit.json`). Copy edits were limited to the two places that described the
old artwork: the tokenomics alt text (“dark” → “light”) and the palette guardrail in `TWITTER_KIT.md`.
Backups: `.reskin/backup/x-kit-before-reskin/`.

## 7. Files

Changed:

| File | Change |
|---|---|
| `src/App.vue` | `<template>` fully rewritten; `<script setup>` byte-identical |
| `src/styles/cx.css` | new stylesheet: tokens, split shell, all sections, dialogs, responsive |
| `src/main.js` | import `./style.css` → `./styles/cx.css` |
| `src/style.css` | removed from the render path and from disk (backup kept) |
| `index.html` | `theme-color` only |
| `public/brand/*` | re-drawn mark, lockup and PNG in the new palette |
| `../twitter/*` | six SVG sources rebuilt, six PNGs re-rendered, profile mark replaced, two copy lines corrected |

Housekeeping, reported for transparency:

- The previous rebrand run (`website/.rebrand`, including its byte backups of the pre-rebrand `App.vue`
  and `style.css`) and the previous reskin (`website/.reskin`) were **moved, not deleted**, to
  `../_archive/rebrand-20261022/` and `../_archive/reskin-20261020/`. The reskin inventory scans every
  `.vue`/`.css` under the project root, so leaving those copies in place would have doubled the content
  counts and re-forced the retired archetype.
- Stale Playwright CLI session dumps (`website/.playwright-cli`, `.playwright-cli`) that still contained
  the previous brand were moved to `../_archive/playwright-cli-*-20261022/`.
- `body.dialog-open` is kept as a class name because the untouched `<script setup>` uses it to lock page
  scroll while a dialog is open; it is a behavioural hook, not a layout class.
- `.reskin/tools/` holds the asset generator, the Chrome render jobs and the Playwright state-capture
  script; `.reskin/backup/` holds the replaced assets.

## 8. Limitations

- One static route (`/`); no dynamic route was skipped. Dialog, checkout, seller sheet, wallet sheet,
  toast, filters, search, sort, favourites, locale toggle and the staking sandbox are `v-if` client
  states, all exercised by the capture script (`.reskin/tools/capture-states.mjs`, 0 errors).
- Fonts are system stacks: `Avenir Next` is not installed on the verification host, so Segoe UI renders
  the display/body copy; on macOS `Avenir Next` wins, and on Linux the stack falls back to system sans.
- The X graphics use Segoe UI / Cascadia Mono on the render host; other machines will substitute the
  declared fallbacks, so raster exports should be produced from the bundled PNGs, not re-rendered.
- Live style sampling: 8/10 references answered; arbitrum.io returned 403 and optimism.io timed out, so
  the catalog tokens were used as documented in `.reskin/STYLE.md`.
- Prices, token figures and items remain demo data; no copy was added, removed or reworded.
