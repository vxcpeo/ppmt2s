# Reskin report — Keepora.xyz

The UI was rebuilt around **Cosmos Orbit** / **Gallery Scroll**; the original **sidebar-workspace** shell and
palette were removed while the content contract stayed byte-for-byte intact.

- Project: `E:/workspace/chuangye/solana/ppmt2s/website` (Vue 3.5 + Vite 6, single route `/`)
- Verified: `node <reskin>/scripts/verify.mjs check` → **PASS, 0 blocking issues, 0 warnings**
- Content-contract hash: `0b7b75644502f72ae4783145ea3766f29048817c729d54884a2b1668f8af4079`
- Scope: the website **and** the X kit (`../twitter/`), rebuilt together in the same art direction.

## 1. Art direction

| | |
|---|---|
| Style DNA | `cosmos-orbit` → “Cosmos Orbit” (spatial-futurist) |
| Source URL | https://cosmos.network (live sample, 8/10 references answered; solana.com 429, arbitrum.io 403) |
| Skeleton | `gallery-scroll` (spatial) — chosen against the original `sidebar-workspace` (shell) |
| Accent | old `#E6006F` → **`#40B3FF`**, ΔE **102.3** (min 30) |
| Ground | `#05060B` with `#0D0F1A`/`#12141F` surfaces, star-field texture and two soft radial auras (azure / violet) |
| Type | display `Century Gothic → Futura → Segoe UI` at weight 400, tracking 0.02em; body `Segoe UI`; every numeral, label and kicker in `Cascadia Mono` |
| Shape | 999px pills, 18–28px panels, 1px `rgba(255,255,255,0.12)` hairlines, one glow per accent |
| Texture | orbit rings, star field, dashed arcs, hairline scene dividers, oversized numerals |

No logo, illustration, photography, copy or code was taken from any reference; only palette, typography mood,
shape language, density and motion. The orbit-K mark was drawn for this palette (§4).

## 2. What replaced what

**Original archetype (pre-reskin):** a light, magenta “Bubblegum Exchange” split stage — a 575px sticky narrative
rail (brand, status, CTA, numbered 01–04 index, mint strip, account actions) beside an 863px scrolling stage of
cards, a lot list, a step track, a ticket, a sandbox and a table. Landmarks `aside → nav → main → footer`.

**New shell (Orbit Stage):** a full-width river of snap-scene panels with a floating bottom dock and a floating
utility capsule; no header bar, no sidebar, no stage column.

```
div.orb-root
  span.orb-sky · span.orb-aura ×2 · span.orb-spine        texture + decorative dot index
  div.orb-hud                                             fixed top-right: locale · Become a seller · Connect wallet
  main#top.orb-flow
    section.orb-scene.orb-cover       01 cover: lockup · status · headline · 2 CTAs · feature plate · mint telemetry
    section.orb-scene.orb-facts       02 three principle “facts” on hairline columns
    section#market.orb-scene          03 market: head · filter pills · search/sort · horizontal lot rail · note
    section#protocol.orb-scene        04 protocol: head · 3 orbit stations · passport panel · chain rail
    section#rewards.orb-scene         05 rewards: head · sandbox · orbit figure · explainer · disclosure
    section#tokenomics.orb-scene      06 tokenomics: head · oversized total · allocation ledger (track bars)
    section#roadmap.orb-scene         07 roadmap: head · vertical phase orbit
    section.orb-scene.orb-close       08 close: orb mark · statement · CTA · trust marks · follow
  footer.orb-foot                                         full-width band: brand · links · legal · disclaimer · credits
  nav.orb-dock                                            fixed bottom dock: 4 route links + menu toggle
  nav.orb-sheet                                           v-if mobileMenuOpen: 4 links + Connect wallet
  dialogs: orb-dialog (item / checkout) · orb-panel ×2 (seller, wallet) · orb-toast
```

| Original composition | New composition |
|---|---|
| sticky narrative rail with brand, index, mint, actions | cover scene with lockup, telemetry strip; utilities moved to a floating HUD; index moved to a bottom dock |
| 2-column hero + inspector card | full-bleed cover: oversized headline left, framed exhibit plate right |
| three readout rows | three oversized-number “facts” on hairline columns |
| category rail + console toolbar + ledger rows | pill filters + capsule search/sort + horizontal snap rail of tall lot cards |
| step cards + passport aside + escrow row | orbit stations with icon nodes, passport panel, chain capsules on one rail |
| calculator + orbit graphic + explainer + disclosure | sandbox panel + concentric orbit figure + explainer grid + disclosure bar |
| centred supply line + coloured rows | giant supply numeral + full-width allocation tracks |
| four phase cards | vertical phase orbit with node dots |
| magenta prompt bar | centred close panel with orb mark and glowing statement |
| four-row hint bar | two-column footer band with mono credits |

**Deleted from the render path:** `src/styles/cx.css` (67KB, the whole `cx-*` light/magenta stylesheet) is gone from
disk (backup: `.reskin/backup/legacy-shell/cx.css`); `src/main.js` now imports `./styles/orbit.css`. Every class
name, selector and token is new: 221 rendered class tokens, all `orb-*` except the library's 24 `lucide-*`; overlap
with the baseline is **0.059**. `<script setup>` is byte-identical — no data, handler, i18n value, route or
formatting change.

## 3. Evidence

Screenshots (baseline = the previous magenta reskin; current = this reskin):

| | baseline | current |
|---|---|---|
| desktop 1440×900 | `.reskin/baseline/home-desktop.png` | `.reskin/current/home-desktop.png` |
| mobile 390×844 | `.reskin/baseline/home-mobile.png` | `.reskin/current/home-mobile.png` |

Above-the-fold and interaction evidence (real Chrome, 0 console errors):
`.reskin/detail/fold-1440x900.png`, `fold-1366x768.png`, `fold-1280x720.png`, `fold-1920x1080.png`,
`fold-390x844.png`, `dialog-item.png`, `dialog-proof.png`, `dialog-checkout.png`, `panel-seller.png`,
`panel-wallet.png`, `rewards-state.png`, `tokenomics.png`, `locale-zh.png`, `mobile-fold.png`, `mobile-menu.png`,
`mobile-dialog.png`, `focus-traversal.png`, `interaction-report.json` (20/20 checks).

A user would not recognise the two screens as the same product shell: the light magenta two-column rail became a
dark cosmic gallery of full-width scenes, navigation dropped from a top-left rail into a floating bottom dock, the
card grid became a horizontal rail, and the ticket/table skins became passport and track-bar ledgers.

## 4. Brand assets

The rebrand's magenta monogram (`#E6006F` tile with a white “K”) clashed with the new system, so the identity was
re-drawn as an **orbit-K**: a dark gradient tile, a broken azure-to-violet arc, a white K, and a violet orbiting
node.

| Asset | Change |
|---|---|
| `public/brand/logo.svg` (800×800) | new orbit-K tile |
| `public/brand/logo.png` (800×800, transparent render) | rendered from the SVG in real Chrome |
| `public/brand/logo-lockup.svg` (1200×400) | mark + `keepora.xyz` wordmark + `COLLECT WITH CONTEXT.` |
| `index.html` | `theme-color` `#e6006f` → `#05060b` (title, description, canonical, OG tags unchanged) |

Backups of the previous assets: `.reskin/backup/x-kit-before/` (kit) and the previous brand files inside
`../_archive/keepora-r1/rebrand-20261109/backup/`.

## 5. X kit (writex)

The X content was rewritten with the **writex** skill after confirming the scope with the user. Voice: standalone
single posts, no hashtags, no emoji, no hype; facts carry each post.

| File | What it is |
|---|---|
| `twitter/keepora-x-series.md` | 10 posts, D0–D6 slots, phases problem → stakes → intro (pinned 03) → mechanism → proof → trust → usage → status → mechanism → close; 4 image posts, 6 text-only, no media adjacency; `node lint.mjs` → **PASS, 0 errors, 0 warnings** |
| `twitter/TWITTER_KIT.md` | new profile bio (144 chars), pinned post, alt text, asset table, brand guardrails |
| `twitter/tweets.md` | publishing plan: slot, UTC time, phase, media file, intent |
| `twitter/banner.svg` / `.png` | 1500×500 — orbit-K, wordmark, “Real collectibles. On-chain proof.”, three market pills |
| `twitter/logo.svg` / `.png` | 800×800 transparent profile mark, safe inside the circular crop |
| `twitter/problem-graphic.*` | 1600×900, post 01: listing card beside an empty record panel |
| `twitter/intro-graphic.*` | 1600×900, post 03: **real capture** of the prototype market (headless Chrome, 2× DPR), framed |
| `twitter/proof-graphic.*` | 1600×900, post 05: Item NFT vs Trade Proof field cards |
| `twitter/usage-graphic.*` | 1600×900, post 07: the trade as four numbered states |

Superseded graphics (`first-tweet-*`, `tokenomics-*`, `burn-to-nft-*`, `staking-fee-*`, `physical-to-nft-*`)
were removed; copies live in `.reskin/backup/x-kit-before/`. SVG sources are the editable form; PNGs are rendered
from them by `.reskin/tools/build-x-kit.mjs` and `.reskin/tools/build-intro.py`.

## 6. Verification

`node scripts/verify.mjs check --project . --out .reskin` → **PASS**

| Gate | Threshold | Result |
|---|---|---|
| Source content contract | no removals/rewrites, no added copy | **intact, 0 warnings** |
| Rendered words per route | multiset equal | **542 words, identical** |
| Rendered attributes / forms / links / title | equal | identical (0 field, image, name issues) |
| Numeric tokens | reported | **32 tokens / 51 occurrences both sides** |
| DOM fingerprint similarity | ≤ 0.50 | **0.358** |
| Landmark sequence similarity | ≤ 0.68 | **0.222** (`aside→nav→main→footer` → `main→header…→footer→nav`) |
| CSS class overlap | ≤ 0.10 | **0.059** (lucide icon classes only) |
| Accent distance | ≥ 30 ΔE | **102.3** |
| Route status / build / console | clean | 200, build pass, 0 console errors, 0 page errors |
| Horizontal overflow 1440 / 390 | none | **none** |
| Text contrast | 0 failures | **0 / 259** on both viewports |
| Images without alt / fields without label / controls without name | 0 | **0 / 0 / 0** |
| axe WCAG 2.x serious+critical | 0 | **0** (also 0 moderate) |
| Keyboard focus visibility | ≥ 1 | **8 / 8** sampled stops show the azure ring |
| Mobile navigation | reachable | **reachable** (dock links + menu toggle) |
| Headings | one `h1` | **1 `h1`**, 21 headings |

Workflow checks, not gates: `.reskin/tools/interactions.mjs` exercises search, sort, favourites + counter, item
dialog, proof tab, checkout preview, Escape close, seller sheet, wallet sheet, staking sandbox recalculation,
Chinese locale switch, mobile dock/menu/dialog — **20/20 passed, 0 console errors**.

Note on the classifier label: `.reskin/inventory.json` reports the new shell as `orbital` (`spatial`) because the
scene river contains repeated section-scoped `<header>` elements; the implemented composition is the selected
Gallery Scroll. The gate passes on both `id` and `family` change, and §2/§3 show the silhouette is not the old rail.

## 7. Accessibility & responsiveness

- Landmarks: `main` → scene `section`s (each with a scoped `header`) → `footer` → `nav` (dock). The mobile sheet is
  a second `nav` with an existing label. Scoped section headers are not banner landmarks in the accessibility tree;
  axe reports no landmark violations.
- Focus: global `:focus-visible` 2px `#40B3FF` ring with 3px offset on every link, button, input and select; the
  dock toggle carries `aria-expanded` with the existing open/close labels.
- Contrast: body `#F4F5FA` on `#05060B`, muted `#9A9DB2` (7.4:1), accent text `#40B3FF` (8.7:1), CTA text
  `#06121D` on a solid `#40B3FF` fallback so the gradient never hides the measured pair. 0 failures over 259 nodes.
- Forms keep their programmatic labels: `label[for="stake-amount"]`, `aria-label` on search, sort, range and
  membership select; the range uses `accent-color`.
- Images keep their existing `alt`; decorative marks use empty `alt`; icon buttons carry existing labels;
  `aria-pressed` on hearts, `aria-selected` on tabs, `aria-expanded` on the menu toggle.
- Motion: scene hover lifts, image zooms, orbit rotation (48–64s) and the toast are neutralised by
  `@media (prefers-reduced-motion: reduce)`, which also disables scroll snapping.
- Responsive: 1180px the dot spine hides; 1080px lab / passport / dialog stack; 900px facts, stations and phases
  go single-column; 760px the dock wraps to two rows and the HUD compacts; 620px the rail cards widen and the
  footer goes single-column; 420px type and orbit compact. Short viewports (≤820px tall) scale the hero so the CTAs
  and their note always clear the dock (measured at 1280×720, 1366×768, 1440×900, 1920×1080).

## 8. Files

Changed:

| File | Change |
|---|---|
| `src/App.vue` | `<template>` fully rewritten; `<script setup>` byte-identical |
| `src/styles/orbit.css` | new stylesheet: tokens, star field, scenes, dock, HUD, rails, dialogs, responsive |
| `src/main.js` | import `./styles/cx.css` → `./styles/orbit.css` |
| `src/styles/cx.css` | removed from the render path and from disk (backup kept) |
| `index.html` | `theme-color` only |
| `public/brand/*` | new orbit-K mark, PNG and lockup |
| `../twitter/*` | new series, kit copy, publishing plan, banner, profile mark, four post graphics; five superseded graphics removed |
| `../README.md` | twitter row and branding paragraph updated to the new asset set and palette |

Housekeeping, reported for transparency:

- The previous rebrand run (`website/.rebrand`) and the previous reskin (`website/.reskin`, including its baseline)
  were **moved, not deleted**, to `../_archive/keepora-r1/`. The reskin inventory scans every `.vue`/`.css` under
  the project root, so leaving those copies in place would have doubled the content counts and re-forced the old
  archetype.
- A stale `vite preview` process from an earlier session was holding port 4321; it was stopped and a fresh preview
  started for captures.
- `body.dialog-open` is kept as a class name because the untouched `<script setup>` uses it to lock page scroll
  while a dialog is open; it is a behavioural hook, not a layout class (the toast repositions from it).
- `.reskin/tools/` holds the asset generators, the capture scripts, the interaction suite and the rendered PNG jobs;
  `.reskin/backup/` holds every replaced asset.

## 9. Limitations

- One static route (`/`); no dynamic route was skipped. Dialog, checkout, seller sheet, wallet sheet, toast,
  filters, search, sort, favourites, locale toggle and the staking sandbox are `v-if` client states, all exercised
  by `.reskin/tools/interactions.mjs` (20/20, 0 errors).
- Fonts are system stacks: `Century Gothic` is not installed on this host, so Segoe UI renders display copy here;
  on macOS Century Gothic wins, on Linux the stack falls back to the system sans.
- The X graphics are rendered with the same host fonts; export from the bundled PNGs rather than re-rendering.
- Prices, token figures and items remain demo data; no copy was added, removed or reworded.
- The series intentionally omits links: the handle, domain, token contract and audit are not real yet, so they are
  listed as `[TBD]` in `twitter/keepora-x-series.md` instead of being invented.
