# Reskin wireframe — Custoria.top / Split Stage + Bubblegum Exchange

Committed direction (from `.reskin/STYLE.md`): **Split Stage** (spatial) with the **Bubblegum Exchange**
design DNA. Original shell was `terminal-console` (dark navy technical console with a left command rail and
a single scrolling deck); it is gone from the render path.

## Shell

```
div.cx-app
  div.cx-page                      [2-col grid: minmax(300px,42fr) / minmax(0,58fr)]
    aside.cx-rail                  sticky narrative column, own scroll on short screens
      div.cx-rail-inner            sticky top:0, min-height:100svh, flex column
        div.cx-brand               logo + custoria.top + COLLECT WITH CONTEXT.
        p.cx-status                Product preview · Market prototype / Wallet… / See how it works
        p.cx-thesis                THE NEXT STOP FOR COLLECTORS · ON SOLANA
        a.cx-rail-cta              Explore collectibles  → #market
        nav.cx-index               vertical numbered index 01–04 (4 routes)
        div.cx-mint                PROTOTYPE MINT SOLANA + address + COPY
        div.cx-rail-foot           locale toggle · Become a seller · Connect wallet · X follow
        ul.cx-trust                3 principle pills
    main.cx-stage #top             scrolling data stage
      section.cx-hero              eyebrow / h1 / lede / How trading works / featured lot card
      section.cx-band              3 annotated rows (platform principles)
      section.cx-market #market    pill filters + search/sort toolbar + lot ledger + footnote
      section.cx-proof #protocol   tinted proof band: 01–03 stage ledger + item ticket + escrow chain
      section.cx-rewards #rewards  staking sandbox card + signal/orb diagram + formula + disclosure
      section.cx-supply #tokenomics  supply headline + allocation <table> with proportion bars
      section.cx-plan #roadmap     phase ledger rows
      section.cx-cta               pink gradient prompt panel
    footer.cx-foot                 full-width band below the split: brand, links, legal, credits
```

Landmarks: `aside` (complementary) → `nav` → `main` → `footer`. No top navigation bar; the index lives in
the sticky column and becomes a horizontal scroll strip ≤1024px.

## Route `/` composition (content moved, never rewritten)

| Existing region | New region |
|---|---|
| status bar 46px + top nav + left command rail | sticky 42% narrative column: brand, index, thesis, CTA, mint, footer actions |
| hero copy + inspector card | stage hero: h1/lede + `How trading works`, then a feature lot card (photo + spec table) |
| 3 numbered readout rows | horizontal hairline band with `01–03` mono numerals |
| console with category rail + ledger rows | market: pill filter row, toolbar, 5 lot rows (thumb, body, meta, price) |
| 3 stage cards + passport aside + escrow row | proof band: numbered vertical stage ledger, item ticket, wrapped escrow chain |
| calculator + orbit + explainer + disclosure | sandbox card, orb/nodes signal diagram, formula strip, disclosure bar |
| supply headline + allocation table | supply panel: oversized total + table with proportion bars + foot |
| 4 phase cards | phase ledger rows with a vertical hairline |
| prompt bar | pink gradient CTA panel |
| 4-row hint bar | full-width footer band |

## Tokens and breakpoints

Tokens come from `.reskin/style.json` (`--bg #FFFFFF`, `--accent #E6006F`, `--accent-safe #C2005D`,
`--accent-2 #FF4DA6`, radii 12/22/32, Avenir Next + Cascadia Mono, 200ms ease). Breakpoints: 1280 (rail
padding), 1100 (proof two-up → stacked), 1024 (split collapses, rail becomes a header + horizontal index
strip), 860 (ledger rows re-flow), 720 (single column, dialogs full-height), 460 (compact type).

## Deleted from the render path

`src/style.css` (78KB, `sg-*` tokens) is replaced by `src/styles/cx.css` with a fresh token set and
`cx-*` classes; all `sg-*` class names, `.sg-rail`, `.sg-statusbar`, `.sg-deck`, `.sg-console`,
`.sg-passport`, `.sg-overlay` and the old palette are removed from the DOM. `<script setup>` stays
byte-identical: no data, handler, binding, i18n value or route changes.
