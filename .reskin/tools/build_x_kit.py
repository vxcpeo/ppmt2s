#!/usr/bin/env python3
"""Rebuild the Custoria X kit (banner + 5 graphics) in the Bubblegum Exchange
art direction used by the website reskin. Emits SVG sources at the original
canvas sizes; PNGs are rendered from them with Chrome afterwards.

Shared layout grid (1600x900 content graphics):
  header eyebrow y=104 · title 196/268 · sub 316
  content 356..816 · footer rule 840 · footer text 876
"""

from __future__ import annotations

from html import escape
from pathlib import Path

OUT = Path(r"E:\workspace\chuangye\solana\ppmt2s\twitter")

INK = "#0D0D0D"
MUTED = "#6D6A70"
ACCENT = "#E6006F"
ACCENT_SAFE = "#C2005D"
LINE = "#E9E4EB"
TINT = "#FFF5F9"
PINK_LINE = "#F7D7E5"
WHITE = "#FFFFFF"
MONO = "Cascadia Mono,Consolas,SFMono-Regular,monospace"
SANS = "Avenir Next,Segoe UI,Arial,Helvetica,sans-serif"


def t(x, y, text, size=24, fill=INK, weight=400, anchor="start", family=SANS, spacing=0, opacity=1.0):
    extra = f' letter-spacing="{spacing}"' if spacing else ""
    return (
        f'<text x="{x}" y="{y}" fill="{fill}" font-family="{family}" font-size="{size}" '
        f'font-weight="{weight}" text-anchor="{anchor}"{extra} opacity="{opacity}">{escape(text)}</text>'
    )


def mono(x, y, text, size=15, fill=MUTED, weight=600, anchor="start", spacing=3):
    return t(x, y, text, size=size, fill=fill, weight=weight, anchor=anchor, family=MONO, spacing=spacing)


def rect(x, y, w, h, r=30, fill=WHITE, stroke=LINE, sw=2, shadow=False, opacity=1.0):
    filt = ' filter="url(#soft)"' if shadow else ""
    return (
        f'<rect x="{x}" y="{y}" width="{w}" height="{h}" rx="{r}" fill="{fill}" '
        f'stroke="{stroke}" stroke-width="{sw}" opacity="{opacity}"{filt}/>'
    )


def pill(x, y, w, h, label, size=15, fill=TINT, stroke=PINK_LINE, color=ACCENT_SAFE, weight=700, spacing=1.4):
    return (
        rect(x, y, w, h, h / 2, fill=fill, stroke=stroke, sw=2)
        + mono(x + w / 2, y + h / 2 + size * 0.36, label, size=size, fill=color, weight=weight, anchor="middle", spacing=spacing)
    )


def card(x, y, w, h, r=34, fill=WHITE, stroke=LINE):
    return f'<g filter="url(#soft)">{rect(x, y, w, h, r, fill, stroke, 2.5)}</g>'


def bubble(cx, cy, r, opacity=0.5):
    return f'<circle cx="{cx}" cy="{cy}" r="{r}" fill="none" stroke="{PINK_LINE}" stroke-width="2.5" opacity="{opacity}"/>'


def check(cx, cy, color=ACCENT_SAFE):
    return f'<path d="M{cx - 7} {cy} l5 6 10-13" fill="none" stroke="{color}" stroke-width="3.4" stroke-linecap="round" stroke-linejoin="round"/>'


def head(title, desc, w, h, glow="#FFD7E8", glow2="#FFE9D6"):
    return f'''<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 {w} {h}" role="img" aria-labelledby="title desc">
  <title id="title">{escape(title)}</title>
  <desc id="desc">{escape(desc)}</desc>
  <defs>
    <radialGradient id="glowA" cx="0.12" cy="0.02" r="0.72">
      <stop offset="0" stop-color="{glow}" stop-opacity="0.55"/>
      <stop offset="1" stop-color="{glow}" stop-opacity="0"/>
    </radialGradient>
    <radialGradient id="glowB" cx="0.96" cy="0.98" r="0.72">
      <stop offset="0" stop-color="{glow2}" stop-opacity="0.38"/>
      <stop offset="1" stop-color="{glow2}" stop-opacity="0"/>
    </radialGradient>
    <linearGradient id="pinkGrad" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0" stop-color="#FF6FB5"/>
      <stop offset="0.55" stop-color="#E6006F"/>
      <stop offset="1" stop-color="#A80050"/>
    </linearGradient>
    <linearGradient id="barGrad" x1="0" y1="0" x2="1" y2="0">
      <stop offset="0" stop-color="#FF9CC6"/>
      <stop offset="1" stop-color="#E6006F"/>
    </linearGradient>
    <filter id="soft" x="-20%" y="-20%" width="140%" height="150%">
      <feDropShadow dx="0" dy="14" stdDeviation="16" flood-color="#140A19" flood-opacity="0.07"/>
    </filter>
  </defs>
  <rect width="{w}" height="{h}" fill="{WHITE}"/>
  <rect width="{w}" height="{h}" fill="url(#glowA)"/>
  <rect width="{w}" height="{h}" fill="url(#glowB)"/>'''


def mark(x, y, size):
    s = size / 800
    return (
        f'<g transform="translate({x},{y}) scale({s})">'
        f'<rect x="72" y="72" width="656" height="656" rx="196" fill="url(#pinkGrad)"/>'
        f'<path d="M520 306a150 150 0 1 0 0 188" fill="none" stroke="#FFFFFF" stroke-width="74" stroke-linecap="round"/>'
        f'<circle cx="602" cy="246" r="26" fill="#FFFFFF" opacity="0.94"/>'
        f'<circle cx="700" cy="162" r="12" fill="#FFD1E2" opacity="0.9"/>'
        f'</g>'
    )


def eyebrow(x, y, label):
    return (
        f'<rect x="{x}" y="{y - 14}" width="46" height="4" rx="2" fill="{ACCENT}"/>'
        + mono(x + 60, y - 4, label, size=17, fill=ACCENT_SAFE, weight=700, spacing=4)
    )


def footer(w, left, right):
    return (
        f'<line x1="96" y1="840" x2="{w - 96}" y2="840" stroke="{LINE}" stroke-width="2"/>'
        + mono(96, 876, left, size=14, fill=MUTED, weight=600, spacing=3.2)
        + mono(w - 96, 876, right, size=14, fill=MUTED, weight=600, anchor="end", spacing=3.2)
    )


def tokenomics():
    w, h = 1600, 900
    parts = [head(
        "Custoria tokenomics note",
        "A light Custoria tokenomics infographic: 1,000,000,000 TRF, a Pump fair launch, dev holdings routed to a black-hole address, and two operating revenue rails, token buy and sell fees plus application fees.",
        w, h,
    )]
    parts.append(eyebrow(96, 112, "CUSTORIA / TOKENOMICS NOTE 001"))
    parts.append(t(96, 206, "Fair launch.", 68, INK, 700, spacing=-2.2))
    parts.append(t(96, 280, "Clear rails.", 68, ACCENT_SAFE, 700, spacing=-2.2))
    parts.append(t(96, 328, "$TRF has one fixed supply and two operating fee sources.", 23, MUTED))

    # Supply card
    parts.append(card(96, 356, 640, 360, 36))
    parts.append(mono(136, 406, "TOTAL SUPPLY", 17, MUTED, 600, spacing=4))
    parts.append(t(136, 492, "1,000,000,000", 70, INK, 700, spacing=-2.2))
    parts.append(mono(136, 528, "TRF", 19, ACCENT_SAFE, 700, spacing=4))
    parts.append(f'<rect x="136" y="552" width="330" height="10" rx="5" fill="{LINE}"/>')
    parts.append(f'<rect x="136" y="552" width="250" height="10" rx="5" fill="url(#barGrad)"/>')
    parts.append(pill(136, 580, 250, 38, "PUMP FAIR LAUNCH", 14))
    parts.append(t(136, 648, "Same public launch rules for every buyer.", 19, MUTED))
    parts.append(f'<line x1="136" y1="668" x2="696" y2="668" stroke="{LINE}" stroke-width="2"/>')
    parts.append(mono(136, 700, "DEV HOLDINGS \u2192 BLACK HOLE", 15, ACCENT_SAFE, 700, spacing=2.4))

    # Rails
    for y, no, title, desc in [
        (356, "RAIL 01", "Token buy / sell fees", "Realized trading fees from the token."),
        (536, "RAIL 02", "Application fees", "Fees from marketplace activity."),
    ]:
        parts.append(card(776, y, 728, 150, 32))
        parts.append(f'<circle cx="852" cy="{y + 75}" r="33" fill="{TINT}" stroke="{PINK_LINE}" stroke-width="2"/>')
        parts.append(f'<path d="M837 {y + 75}h30M852 {y + 60}v30" stroke="{ACCENT}" stroke-width="3.4" stroke-linecap="round"/>')
        parts.append(mono(910, y + 56, no, 15, ACCENT_SAFE, 700, spacing=4))
        parts.append(t(910, y + 94, title, 31, INK, 700, spacing=-0.8))
        parts.append(t(910, y + 124, desc, 18, MUTED))

    # Funding principle
    parts.append(rect(96, 742, 1408, 62, 31, INK, INK, 0))
    parts.append(mono(136, 782, "FUNDING PRINCIPLE", 15, "#FF9CC6", 700, spacing=3.6))
    parts.append(t(420, 784, "Operations and rewards use realized fees only.", 24, WHITE, 600))
    parts.append(bubble(1490, 90, 120, 0.5))
    parts.append(bubble(1410, 210, 54, 0.45))
    parts.append(footer(w, "FIXED SUPPLY / PUBLIC FAIR LAUNCH / DEV HOLDINGS BURNED", "NO PRICE OR RETURN PROMISE"))
    parts.append("</svg>")
    return "\n".join(parts)


def burn_flow():
    w, h = 1600, 900
    parts = [head(
        "Custoria burn-to-NFT flow",
        "A seven-step Custoria flow diagram: buyer pays TRF, funds enter escrow, seller submits a continuous destruction video and raw metadata, an evidence hash is recorded and an administrator reviews it, an Item NFT is minted into escrow, a 48 to 72 hour dispute window runs, and the Item NFT plus Trade Proof NFTs are released after no dispute. A failed review results in no mint.",
        w, h,
    )]
    parts.append(eyebrow(96, 112, "CUSTORIA / ITEM NFT FLOW 002"))
    parts.append(t(96, 200, "From token trade", 62, INK, 700, spacing=-2))
    parts.append(t(96, 268, "to Item NFT.", 62, ACCENT_SAFE, 700, spacing=-2))
    parts.append(t(96, 316, "Every step is recorded, reviewed and signed before a mint.", 22, MUTED))

    steps = [
        ("01", "Buyer pays", "Payment moves in TRF."),
        ("02", "Funds enter escrow", "The order holds the payment."),
        ("03", "Seller submits video", "Continuous destruction plus raw metadata."),
        ("04", "Evidence hash", "Hash and timestamp are recorded."),
        ("05", "Admin review", "An administrator verifies the evidence."),
        ("06", "Item NFT in escrow", "Minted into escrow, not the buyer yet."),
        ("07", "48\u201372h dispute window", "No dispute, then release."),
    ]
    parts.append(card(96, 356, 872, 460, 36))
    y = 404
    for i, (no, title, desc) in enumerate(steps):
        parts.append(f'<circle cx="146" cy="{y + 20}" r="21" fill="{TINT}" stroke="{PINK_LINE}" stroke-width="2"/>')
        parts.append(mono(146, y + 26, no, 13, ACCENT_SAFE, 700, anchor="middle", spacing=0.6))
        parts.append(t(190, y + 16, title, 22, INK, 700, spacing=-0.6))
        parts.append(t(190, y + 40, desc, 17, MUTED))
        if i < len(steps) - 1:
            parts.append(f'<line x1="146" y1="{y + 44}" x2="146" y2="{y + 54}" stroke="{PINK_LINE}" stroke-width="2.5"/>')
        y += 56

    # Release card
    parts.append(card(1000, 356, 504, 234, 36))
    parts.append(f'<rect x="1040" y="392" width="80" height="4" rx="2" fill="{ACCENT}"/>')
    parts.append(mono(1134, 398, "ON RELEASE", 15, ACCENT_SAFE, 700, spacing=3.4))
    parts.append(t(1040, 458, "Item NFT +", 32, INK, 700, spacing=-1.2))
    parts.append(t(1040, 498, "Trade Proof NFTs", 32, INK, 700, spacing=-1.2))
    parts.append(t(1040, 536, "Buyer gets the item; both sides get proof.", 18, MUTED))
    parts.append(f'<circle cx="1046" cy="564" r="7" fill="{ACCENT}"/>')
    parts.append(t(1064, 570, "Two credentials per completed trade.", 18, MUTED))

    # Failed review card
    parts.append(card(1000, 614, 504, 202, 36, TINT, PINK_LINE))
    parts.append(mono(1040, 660, "FAILED REVIEW", 15, ACCENT_SAFE, 700, spacing=3.4))
    parts.append(t(1040, 716, "No approval, no Item NFT.", 27, INK, 700, spacing=-0.8))
    parts.append(t(1040, 752, "Cancel, reject or default means no mint.", 18, MUTED))
    parts.append(footer(w, "TRF \u2192 ESCROW \u2192 EVIDENCE \u2192 REVIEW \u2192 ITEM NFT \u2192 RELEASE", "DRAFT PROTOCOL"))
    parts.append(bubble(1530, 120, 110, 0.5))
    parts.append("</svg>")
    return "\n".join(parts)


def staking():
    w, h = 1600, 900
    parts = [head(
        "Custoria staking and fee-funded rewards",
        "A light Custoria staking infographic showing realized token buy and sell fees plus app fees flowing into a reward pool, then being distributed by the formula current reward pool times user weight divided by all valid weight. It lists 30, 90 and 180 day lock multipliers and Collector Pass and Genesis Pass multipliers, with a no fixed APY disclosure.",
        w, h,
    )]
    parts.append(eyebrow(96, 112, "CUSTORIA / STAKING NOTE 003"))
    parts.append(t(96, 200, "Rewards come from", 62, INK, 700, spacing=-2))
    parts.append(t(96, 268, "realized fees.", 62, ACCENT_SAFE, 700, spacing=-2))
    parts.append(t(96, 316, "Fees in. Weights out. No fixed APY, no promise.", 22, MUTED))

    # Flow card
    parts.append(card(96, 356, 840, 268, 36))
    parts.append(mono(136, 402, "REWARD POOL", 15, MUTED, 600, spacing=4))
    parts.append(t(136, 458, "Realized fees", 32, INK, 700, spacing=-1))
    parts.append(t(136, 492, "+ governance-approved budget", 19, MUTED))
    parts.append(pill(136, 532, 340, 42, "FUNDED BY REALIZED FEES", 14))
    parts.append(f'<line x1="514" y1="386" x2="514" y2="594" stroke="{LINE}" stroke-width="2"/>')
    parts.append(mono(552, 402, "DISTRIBUTION FORMULA", 15, MUTED, 600, spacing=4))
    parts.append(t(552, 448, "pool \u00d7 your weight", 28, INK, 700, spacing=-0.8))
    parts.append(f'<line x1="552" y1="466" x2="896" y2="466" stroke="{INK}" stroke-width="3"/>')
    parts.append(t(552, 506, "all valid weight", 28, INK, 700, spacing=-0.8))
    parts.append(t(552, 556, "Weekly distribution, variable amount.", 18, MUTED))

    # Lock multipliers
    parts.append(mono(96, 692, "LOCK MULTIPLIERS", 15, MUTED, 600, spacing=4))
    for i, (days, factor) in enumerate([("30d", "1.00\u00d7"), ("90d", "1.25\u00d7"), ("180d", "1.60\u00d7")]):
        x = 96 + i * 216
        parts.append(card(x, 712, 196, 100, 28))
        parts.append(mono(x + 24, 752, days, 15, MUTED, 600, spacing=2))
        parts.append(t(x + 24, 794, factor, 32, INK, 700, spacing=-1.4))

    # Membership card
    parts.append(card(976, 356, 528, 268, 36))
    parts.append(mono(1016, 402, "MEMBERSHIP MULTIPLIER", 15, MUTED, 600, spacing=4))
    parts.append(t(1016, 452, "Collector Pass", 25, INK, 700, spacing=-0.6))
    parts.append(mono(1464, 452, "1.10\u00d7", 23, ACCENT_SAFE, 700, anchor="end", spacing=0))
    parts.append(f'<line x1="1016" y1="472" x2="1464" y2="472" stroke="{LINE}" stroke-width="2"/>')
    parts.append(t(1016, 510, "Genesis Pass", 25, INK, 700, spacing=-0.6))
    parts.append(mono(1464, 510, "1.25\u00d7", 23, ACCENT_SAFE, 700, anchor="end", spacing=0))
    parts.append(f'<line x1="1016" y1="530" x2="1464" y2="530" stroke="{LINE}" stroke-width="2"/>')
    parts.append(t(1016, 572, "Membership adds weight, not a fixed return.", 18, MUTED))
    parts.append(f'<circle cx="1022" cy="598" r="7" fill="{ACCENT}"/>')
    parts.append(t(1040, 604, "Draft parameters may change.", 18, MUTED))

    # Disclosure
    parts.append(card(976, 652, 528, 148, 32, "#FFFBE8", "#F2E2B8"))
    parts.append(mono(1016, 696, "NO FIXED APY", 15, "#8A5A00", 700, spacing=3.4))
    parts.append(t(1016, 738, "Rewards depend on realized", 21, INK, 600))
    parts.append(t(1016, 766, "revenue and the approved budget.", 21, INK, 600))

    parts.append(footer(w, "30 / 90 / 180 DAY LOCKS / COLLECTOR 1.10\u00d7 / GENESIS 1.25\u00d7", "DRAFT PARAMETERS"))
    parts.append(bubble(1520, 150, 100, 0.5))
    parts.append("</svg>")
    return "\n".join(parts)


def physical_to_nft():
    w, h = 1600, 900
    parts = [head(
        "Custoria physical to NFT",
        "A Custoria flow graphic: a physical collectible moves through escrow to an Item NFT and a Trade Proof NFT on Solana, with the headline Real collectibles, on-chain proof.",
        w, h,
    )]
    parts.append(eyebrow(96, 112, "CUSTORIA / PHYSICAL FIRST"))
    parts.append(t(96, 200, "Real collectibles.", 66, INK, 700, spacing=-2.2))
    parts.append(t(96, 272, "On-chain proof.", 66, ACCENT_SAFE, 700, spacing=-2.2))
    parts.append(t(96, 320, "The object is destroyed on camera; the record stays verifiable.", 22, MUTED))

    cards = [
        ("01 / PHYSICAL", "Physical item", "Photos, purchase proof and serial details build the record."),
        ("02 / ESCROW", "Escrow", "Payment is held by the order until evidence is reviewed."),
        ("03 / ITEM NFT", "Item NFT", "Minted into escrow after an administrator approves the video."),
        ("04 / TRADE PROOF", "Trade Proof NFT", "Both sides receive a non-transferable proof of the trade."),
    ]
    for i, (no, title, desc) in enumerate(cards):
        x = 96 + i * 356
        parts.append(card(x, 372, 312, 292, 34))
        parts.append(f'<circle cx="{x + 44}" cy="418" r="20" fill="{TINT}" stroke="{PINK_LINE}" stroke-width="2"/>')
        parts.append(mono(x + 44, 424, str(i + 1), 15, ACCENT_SAFE, 700, anchor="middle", spacing=0))
        parts.append(mono(x + 78, 424, no, 13, MUTED, 600, spacing=2.4))
        parts.append(t(x + 28, 500, title, 27, INK, 700, spacing=-0.8))
        parts.append(f'<line x1="{x + 28}" y1="524" x2="{x + 284}" y2="524" stroke="{LINE}" stroke-width="2"/>')
        words = desc.split()
        line, lines = "", []
        for word in words:
            candidate = f"{line} {word}".strip()
            if len(candidate) > 29 and line:
                lines.append(line)
                line = word
            else:
                line = candidate
        lines.append(line)
        for j, text in enumerate(lines[:3]):
            parts.append(t(x + 28, 560 + j * 26, text, 17, MUTED))
        if i < len(cards) - 1:
            parts.append(f'<path d="M{x + 318} 500h22m-8-8 8 8-8 8" fill="none" stroke="{PINK_LINE}" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>')

    parts.append(rect(96, 700, 1408, 114, 30, INK, INK, 0))
    parts.append(mono(136, 742, "BEFORE MINT", 14, "#FF9CC6", 700, spacing=3.2))
    parts.append(t(326, 746, "Photos + purchase proof + serial record + administrator review.", 23, WHITE, 600))
    parts.append(mono(136, 782, "AFTER RELEASE", 14, "#FF9CC6", 700, spacing=3.2))
    parts.append(t(326, 786, "Item NFT in the buyer wallet, Trade Proof NFTs on both sides.", 23, WHITE, 600))
    parts.append(footer(w, "PHYSICAL \u2192 ESCROW \u2192 BURN VIDEO \u2192 REVIEW \u2192 MINT", "INDEPENDENT MARKETPLACE"))
    parts.append(bubble(1550, 110, 96, 0.45))
    parts.append("</svg>")
    return "\n".join(parts)


def first_tweet():
    w, h = 1600, 900
    parts = [head(
        "Custoria launch graphic",
        "The Custoria launch image: a pink bubble mark, the wordmark and the headline Real collectibles. On-chain proof. with escrow, seller bonds, Item NFTs and Trade Proof NFTs on Solana.",
        w, h,
    )]
    parts.append(mark(96, 84, 116))
    parts.append(t(228, 160, "custoria", 42, INK, 700, spacing=-1.6))
    parts.append(mono(230, 186, "COLLECT WITH CONTEXT.", 13, MUTED, 600, spacing=3.6))
    parts.append(pill(1226, 96, 278, 52, "SOLANA \u00b7 BETA SOON", 15))

    parts.append(t(96, 372, "Real collectibles.", 90, INK, 700, spacing=-3))
    parts.append(t(96, 468, "On-chain proof.", 90, ACCENT_SAFE, 700, spacing=-3))
    parts.append(t(96, 528, "Escrow, seller bonds, Item NFTs and Trade Proof NFTs", 25, MUTED))
    parts.append(t(96, 564, "connect real-world ownership with on-chain records.", 25, MUTED))

    items = [
        ("ESCROW", "Payment held until review."),
        ("SELLER BONDS", "Trades backed by staked TRF."),
        ("ITEM NFT", "A credential after destruction."),
        ("TRADE PROOF", "A record for both sides."),
    ]
    for i, (title, desc) in enumerate(items):
        x = 96 + i * 356
        parts.append(card(x, 636, 312, 148, 30))
        parts.append(check(x + 42, 682))
        parts.append(mono(x + 28, 726, title, 16, ACCENT_SAFE, 700, spacing=3))
        parts.append(t(x + 28, 754, desc, 17, MUTED))

    parts.append(footer(w, "VERIFIED COLLECTIBLE TRADES ON SOLANA", "CUSTORIA.TOP"))
    parts.append(bubble(1450, 700, 190, 0.45))
    parts.append(bubble(1540, 420, 70, 0.4))
    parts.append("</svg>")
    return "\n".join(parts)


def banner():
    w, h = 1500, 500
    parts = [head(
        "Custoria X banner",
        "The Custoria X header banner: the pink bubble mark, the custoria.top wordmark and the line Real collectibles, on-chain proof, with escrow, Item NFT and Trade Proof pills.",
        w, h,
    )]
    parts.append(mark(420, 108, 120))
    parts.append(t(560, 186, "custoria", 52, INK, 700, spacing=-1.8))
    parts.append(mono(562, 216, "COLLECT WITH CONTEXT.", 13, MUTED, 600, spacing=3.6))
    parts.append(t(420, 302, "Real collectibles. On-chain proof.", 44, INK, 700, spacing=-1.4))
    parts.append(pill(450, 330, 168, 44, "ESCROW", 14))
    parts.append(pill(634, 330, 196, 44, "ITEM NFT", 14))
    parts.append(pill(846, 330, 248, 44, "TRADE PROOF", 14))
    parts.append(bubble(240, 120, 120, 0.5))
    parts.append(bubble(1300, 380, 150, 0.45))
    parts.append(bubble(1180, 110, 54, 0.4))
    parts.append("</svg>")
    return "\n".join(parts)


def write_all():
    files = {
        "tokenomics-graphic.svg": tokenomics(),
        "burn-to-nft-graphic.svg": burn_flow(),
        "staking-fee-graphic.svg": staking(),
        "physical-to-nft-graphic.svg": physical_to_nft(),
        "first-tweet-graphic.svg": first_tweet(),
        "banner.svg": banner(),
    }
    for name, content in files.items():
        target = OUT / name
        target.write_text(content + "\n", encoding="utf-8", newline="\n")
        print(f"{name}: {len(content)} bytes")


if __name__ == "__main__":
    write_all()
