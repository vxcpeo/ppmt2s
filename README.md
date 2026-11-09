# Custoria.top website

Vue 3 + Vite prototype for the Custoria.top collector marketplace, based on `../WHITEPAPER.md`.

## Run locally

```sh
npm install
npm run dev
```

Run the production build with `npm run build`. Run Vue's template type check with `npm run check`.

## Prototype boundaries

- Product cards, prices, condition notes, and passport data are presentation samples. They do not represent live listings, sellers, inventory, or transactions.
- Wallet connection, escrow, NFT issuance, staking, membership passes, governance, and prize draws are not connected to contracts or live services.
- The planned sale lifecycle is: after a sale, the seller records and submits a video showing the physical item being destroyed; a system administrator reviews the video and order; approval mints the Item NFT into escrow, and the Trade Proof NFT is minted after the dispute window. Both credentials are preserved permanently on-chain. This lifecycle is represented in the UI as a design draft and is not enabled.
- Staking weight multipliers, fee rates, epoch lengths, token supply, and allocations are proposed whitepaper parameters. No fixed APY or investment return is promised.
- Custoria.top is an independent marketplace, not a brand's official store or licensed channel. Item NFTs describe platform records and do not convey brand intellectual property.

## Demo photography

| Image | Source | Author | License |
| --- | --- | --- | --- |
| `dragon.jpg` | [Wikimedia Commons](https://commons.wikimedia.org/wiki/File:Dunny_vinyl_figure_which_portrays_a_dragon_embroidered_on_a_silk_brocade_door_valance_and_side_panels_(Chinese,_17th-18th_century)_in_The_MET_collection.jpg) | Neoclassicism Enthusiast | CC BY-SA 4.0 |
| `molly.jpg` | [Wikimedia Commons](https://commons.wikimedia.org/wiki/File:Molly_(art_toy).jpg) | Ameba25 | CC0 |
| `hootlum.jpg` | [Wikimedia Commons](https://commons.wikimedia.org/wiki/File:HOOTLUM_vinyl_art_figure_(white_edition).jpg) | Thomas Victor Lopez | CC BY-SA 4.0 |
| `nendoroid.jpg` | [Wikimedia Commons](https://commons.wikimedia.org/wiki/File:KanColle_Nendoroid_-_Kirishima.jpg) | Duong Tran Dinh | CC BY 2.0 |
| `nendoroid-set.jpg` | [Wikimedia Commons](https://commons.wikimedia.org/wiki/File:Nendoroid_Collection.jpg) | Danny Choo | CC BY-SA 2.0 |

These photos are locally hosted in `public/images/collectibles/` for the preview site; they are not evidence of Custoria marketplace listings.
