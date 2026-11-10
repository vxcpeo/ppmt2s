# Reskin inventory — keepora-website

Generated: 2026-11-09T18:05:14.586Z

## Project

| Field | Value |
|---|---|
| Root | `E:/workspace/chuangye/solana/ppmt2s/website` |
| Vue | ^3.5.13 |
| Package manager | npm |
| Nuxt | no |
| CSS frameworks | none detected |
| Files scanned | 3 (1 SFCs) |

## Original skeleton

- Archetype: **sidebar-workspace** (shell)
- Traits: sidebar, cards, hero, table, grid, tabs, modal, sticky, terminal
- Max template depth: 10
- Top-level tags: div

The replacement skeleton must not be `sidebar-workspace` and must not be in the same family (`shell`).

## Routes

- `/`

## Palette (most used first)

`#ffffff` (60) · `#f3c6da` (9) · `#ffe3ee` (7) · `#b9b1bd` (5) · `#e6006f` (5) · `#000000` (4) · `#0f9b8e` (4) · `#7b5cff` (4) · `#e3c3d3` (4) · `#f0d4e0` (4)

## Content lock

- Static visible text tokens: **79**
- Binding expressions: **256**
- Event handlers: **46**
- Contract hash: `0b7b75644502f72ae4783145ea3766f29048817c729d54884a2b1668f8af4079`

Everything in `.reskin/content-contract.json` is immutable: visible copy, placeholders, labels, routes, link targets, asset sources, bindings, handlers, API endpoints and i18n values. A reskin may move these tokens to new markup but may not rewrite, remove or hide them.

## Next

```bash
node scripts/choose-style.mjs --project "E:/workspace/chuangye/solana/ppmt2s/website" --out .reskin
node scripts/verify.mjs baseline --project "E:/workspace/chuangye/solana/ppmt2s/website" --out .reskin
```

Then rewrite the UI and run `verify.mjs check`.
