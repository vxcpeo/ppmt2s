# Reskin wireframe — Keepora.xyz

Direction (fixed by `.reskin/STYLE.md`): **Cosmos Orbit** (`cosmos-orbit`, spatial-futurist) with the
**Gallery Scroll** skeleton (`gallery-scroll`). Original archetype: `sidebar-workspace` (shell).

## 1. New shell

Name: **Orbit Stage** (`orb-*` namespace, token names `--orb-*`).

```
div.orb-root
  span.orb-sky (star field, aria-hidden) · span.orb-aura ×2 (radial glows)
  div.orb-hud        fixed top-right utility capsule: locale · Become a seller · Connect wallet
  main#top.orb-flow  scroll-snap river of full-viewport scenes
    section.orb-scene.orb-cover     01 cover: lockup + status + headline + 2 actions + feature plate + telemetry
    section.orb-scene.orb-facts     02 principles: three "constellation" facts on one hairline
    section#market.orb-scene        03 market: head + filter/tool bar + horizontal lot rail + note
    section#protocol.orb-scene      04 protocol: head + 3 orbit stations + passport + chain rail
    section#rewards.orb-scene       05 rewards: head + lab (calc + orbit figure) + explainer + disclosure
    section#tokenomics.orb-scene    06 tokenomics: head + giant total + allocation ledger + foot
    section#roadmap.orb-scene       07 roadmap: head + vertical phase orbit
    section.orb-scene.orb-close     08 close: orb mark + statement + CTA + trust marks + follow
  footer.orb-foot    band: brand · line · links · legal · disclaimer · credits
  nav.orb-dock       fixed bottom dock: 4 route links (icons + labels) + menu toggle
  nav.orb-sheet      v-if mobileMenuOpen: 4 route links + Connect wallet (unchanged v-if branch)
  dialogs: orb-dialog (item / checkout), orb-sheet-panel ×2 (seller, wallet), orb-toast
```

Landmark order becomes `main → footer → nav(dock)`; the original `aside → nav → main → footer`
no longer exists.

## 2. Route map (single route `/`)

| Region | Content it holds (all moved, never retyped) |
|---|---|
| `orb-cover` | lockup/wordmark/motto, prototype status, headline, lede, Explore collectibles + How trading works, feature plate (photo, chips, tag, specs, fine print), PROSTOTYPE MINT strip + COPY |
| `orb-facts` | the 3 principle rows (01–03 key + text) |
| `orb-market` | section head + photo-source note, category tablist, search/sort, 5-lot snap rail, demo footnote |
| `orb-protocol` | section head + draft pill, 3 station rows, Item Passport article, 6-node escrow chain |
| `orb-rewards` | section head + pill, sandbox calculator, orbit signal figure, explainer + formula, disclosure |
| `orb-tokenomics` | section head, oversized total, 6-row allocation table, lock/multisig foot |
| `orb-roadmap` | section head + DRAFT pill, 4 phase rows |
| `orb-close` | A MARKET BUILT FOR COLLECTORS, closing statement, Explore the demo market, 3 trust marks, FOLLOW @KEEPORA ON X |
| `orb-foot` | brand lockup, Solana resale line, 4 links, legal, disclaimer, 5 photo credits |
| `orb-hud` | locale toggle, Become a seller, Connect wallet |
| `orb-dock` | Collectibles market · Trade protection · Staking & rewards · Roadmap + menu toggle |
| `orb-sheet` | same 4 links + Connect wallet (existing `mobileMenuOpen` branch) |

## 3. Deleted vs kept

- Deleted from the render path: the whole `cx-*` shell — `cx-app/cx-page/cx-rail/cx-stage/cx-hero/
  cx-band/cx-section/cx-proof/cx-rewards/cx-supply/cx-cta/cx-foot/cx-dialog/cx-sheet/cx-toast` and the
  sticky 40/60 split, the numbered vertical index, the card grid, the ticket card and the table skin.
- Kept as content-only children: every text element, `img`, form control, `v-for`, `v-if`, `v-html`,
  `v-model`, `@click`/`@keydown` handler, route href and dialog branch, with the original expressions
  copied verbatim.
- `<script setup>` is untouched.

## 4. New presentation layer

- `src/styles/orbit.css` — tokens (`--orb-*`), reset/base type, star field, scene rhythm, dock, HUD,
  rails, dialogs, responsive, reduced-motion. Imported from `src/main.js`; `cx.css` leaves the render path.
- Breakpoints: 1280 (scene padding), 1080 (two-column scenes stack), 900 (rail cards 78vw), 720 (dock
  compacts, HUD shrinks), 520 (single column, full-height sheets).
- Tokens: ground `#05060B`, surfaces `#0D0F1A`/`#12141F`, ink `#F4F5FA`, muted `#9A9DB2`,
  accent `#40B3FF`, accent-2 `#A78BFA`, line `rgba(255,255,255,.10)`; radii 999px / 28px; display
  `Century Gothic, Futura, Segoe UI`, mono `Cascadia Mono`.
