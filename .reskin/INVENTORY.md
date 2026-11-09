# Reskin inventory — custoria-website

Generated: 2026-10-21T16:47:23.225Z

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

- Archetype: **terminal-console** (linear)
- Traits: cards, table, grid, tabs, modal, sticky, terminal
- Max template depth: 10
- Top-level tags: div

The replacement skeleton must not be `terminal-console` and must not be in the same family (`linear`).

## Routes

- `/`

## Palette (most used first)

`#04121f` (7) · `#061730` (4) · `#0e2b4d` (4) · `#06182e` (3) · `#0a2140` (3) · `#000000` (2) · `#071a33` (2) · `#1c3a60` (2) · `#4e6f96` (2) · `#7cc4ff` (2)

## Content lock

- Static visible text tokens: **79**
- Binding expressions: **256**
- Event handlers: **46**
- Contract hash: `5d336251dc521412913ddd8cec9b68b547eca5b86a742dd6c94bbe43e01ddd6a`

Everything in `.reskin/content-contract.json` is immutable: visible copy, placeholders, labels, routes, link targets, asset sources, bindings, handlers, API endpoints and i18n values. A reskin may move these tokens to new markup but may not rewrite, remove or hide them.

## Next

```bash
node scripts/choose-style.mjs --project "E:/workspace/chuangye/solana/ppmt2s/website" --out .reskin
node scripts/verify.mjs baseline --project "E:/workspace/chuangye/solana/ppmt2s/website" --out .reskin
```

Then rewrite the UI and run `verify.mjs check`.
