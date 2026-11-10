import fs from 'node:fs/promises'
import path from 'node:path'
import { chromium } from 'playwright-core'

const SITE = 'E:/workspace/chuangye/solana/ppmt2s/website'
const TW = 'E:/workspace/chuangye/solana/ppmt2s/twitter'
const CHROME = 'C:/Program Files/Google/Chrome/Application/chrome.exe'

const C = {
  bg: '#05060B',
  bg2: '#0A0D16',
  ink: '#F4F5FA',
  muted: '#9A9DB2',
  faint: '#7E8299',
  accent: '#40B3FF',
  accent2: '#A78BFA',
  ok: '#5CE1A0',
  line: 'rgba(255,255,255,0.12)',
  line2: 'rgba(255,255,255,0.22)',
  surface: 'rgba(17,20,31,0.78)',
}
const DISPLAY = '"Century Gothic","Futura","Segoe UI",Arial,sans-serif'
const MONO = '"Cascadia Mono",ui-monospace,Consolas,monospace'

function rng(seed) {
  let s = seed >>> 0
  return () => {
    s = (s * 1664525 + 1013904223) >>> 0
    return s / 4294967296
  }
}

function stars(width, height, seed, count = 90) {
  const r = rng(seed)
  let out = ''
  for (let i = 0; i < count; i += 1) {
    const x = (r() * width).toFixed(1)
    const y = (r() * height).toFixed(1)
    const rad = (0.6 + r() * 1.6).toFixed(2)
    const op = (0.12 + r() * 0.45).toFixed(2)
    out += `<circle cx="${x}" cy="${y}" r="${rad}" fill="#FFFFFF" opacity="${op}"/>`
  }
  return out
}

function defs(prefix) {
  return `<defs>
    <linearGradient id="${prefix}-edge" x1="0" y1="1" x2="1" y2="0">
      <stop offset="0" stop-color="${C.accent2}"/><stop offset="0.55" stop-color="#7FD4FF"/><stop offset="1" stop-color="${C.accent}"/>
    </linearGradient>
    <radialGradient id="${prefix}-glow" cx="0.5" cy="0.5" r="0.5">
      <stop offset="0" stop-color="${C.accent}" stop-opacity="0.22"/><stop offset="1" stop-color="${C.accent}" stop-opacity="0"/>
    </radialGradient>
    <radialGradient id="${prefix}-glow2" cx="0.5" cy="0.5" r="0.5">
      <stop offset="0" stop-color="${C.accent2}" stop-opacity="0.18"/><stop offset="1" stop-color="${C.accent2}" stop-opacity="0"/>
    </radialGradient>
    <linearGradient id="${prefix}-tile" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0" stop-color="#122036"/><stop offset="1" stop-color="${C.bg}"/>
    </linearGradient>
  </defs>`
}

function mark(prefix, x, y, size) {
  const s = size / 800
  return `<g transform="translate(${x},${y}) scale(${s})">
    <rect width="800" height="800" rx="200" fill="url(#${prefix}-tile)"/>
    <circle cx="400" cy="400" r="300" fill="url(#${prefix}-glow)"/>
    <circle cx="400" cy="400" r="296" fill="none" stroke="#F4F5FA" stroke-opacity="0.14" stroke-width="8"/>
    <path d="M 668 275 A 296 296 0 1 1 122 299" fill="none" stroke="url(#${prefix}-edge)" stroke-width="12" stroke-linecap="round" stroke-opacity="0.92"/>
    <path d="M 310 272 L 310 528" fill="none" stroke="#F4F5FA" stroke-width="54" stroke-linecap="round"/>
    <path d="M 500 272 L 382 404" fill="none" stroke="url(#${prefix}-edge)" stroke-width="54" stroke-linecap="round"/>
    <path d="M 382 404 L 516 528" fill="none" stroke="#F4F5FA" stroke-width="54" stroke-linecap="round"/>
    <circle cx="668" cy="275" r="44" fill="none" stroke="${C.accent2}" stroke-opacity="0.35" stroke-width="4"/>
    <circle cx="668" cy="275" r="24" fill="${C.accent2}"/>
  </g>`
}

function panel(x, y, w, h, r = 26, fill = C.surface, stroke = C.line) {
  return `<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="${r}" fill="${fill}" stroke="${stroke}" stroke-width="1.5"/>`
}

function pill(x, y, label, color = C.muted, accent = true) {
  const w = 26 + label.length * 10.4
  return `<g>
    <rect x="${x}" y="${y}" width="${w}" height="34" rx="17" fill="rgba(255,255,255,0.04)" stroke="${C.line}" stroke-width="1.2"/>
    <circle cx="${x + 17}" cy="${y + 17}" r="4" fill="${accent ? C.accent : C.accent2}"/>
    <text x="${x + 30}" y="${y + 22}" font-family='${MONO}' font-size="13" letter-spacing="1.4" fill="${color}">${label}</text>
  </g>`
}

function label(x, y, text, color = C.faint, size = 13) {
  return `<text x="${x}" y="${y}" font-family='${MONO}' font-size="${size}" letter-spacing="3.2" fill="${color}">${text}</text>`
}

function frame(prefix, w, h, inner, topLeft = 'KEEPORA', topRight = 'SOLANA', bottom = '') {
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${w} ${h}" width="${w}" height="${h}">
  ${defs(prefix)}
  <rect width="${w}" height="${h}" fill="${C.bg}"/>
  <g>${stars(w, h, prefix.length * 977 + w)}</g>
  <ellipse cx="${w * 0.18}" cy="${h * 0.1}" rx="${w * 0.34}" ry="${h * 0.4}" fill="url(#${prefix}-glow)"/>
  <ellipse cx="${w * 0.9}" cy="${h * 0.95}" rx="${w * 0.32}" ry="${h * 0.45}" fill="url(#${prefix}-glow2)"/>
  <g>
    ${label(84, 76, topLeft)}
    <circle cx="228" cy="71" r="3.5" fill="${C.accent}"/>
    ${topRight ? label(w - 84 - topRight.length * 10.4, 76, topRight, C.muted) : ''}
  </g>
  <line x1="84" y1="${h - 62}" x2="${w - 84}" y2="${h - 62}" stroke="${C.line}" stroke-width="1"/>
  ${bottom ? label(84, h - 30, bottom, C.faint, 12) : ''}
  <text x="${w - 84}" y="${h - 30}" text-anchor="end" font-family='${MONO}' font-size="12" letter-spacing="2.4" fill="${C.faint}">keepora.xyz</text>
  ${inner}
</svg>
`
}

function headline(x, y, main, accent, size = 68) {
  return `<text x="${x}" y="${y}" font-family='${DISPLAY}' font-size="${size}" letter-spacing="-1" fill="${C.ink}">${main}</text>
  <text x="${x}" y="${y + size * 1.12}" font-family='${DISPLAY}' font-size="${size}" letter-spacing="-1" fill="${C.accent}">${accent}</text>`
}

/* ------------------------------------------------------------------ banner */

function banner() {
  const w = 1500
  const h = 500
  const pillW = (t) => 26 + t.length * 10.4
  const p1 = { x: 503, label: 'ESCROWED TRADES' }
  const p2 = { x: p1.x + pillW(p1.label) + 16, label: 'ITEM NFT' }
  const p3 = { x: p2.x + pillW(p2.label) + 16, label: 'TRADE PROOF' }
  const inner = `
  ${mark('bn', 250, 150, 200)}
  <text x="500" y="248" font-family='${DISPLAY}' font-size="66" letter-spacing="-1" fill="${C.ink}">keepora<tspan fill="${C.accent}">.xyz</tspan></text>
  <text x="503" y="298" font-family='${MONO}' font-size="20" letter-spacing="3.4" fill="${C.muted}">REAL COLLECTIBLES. ON-CHAIN PROOF.</text>
  ${pill(p1.x, 330, p1.label)}
  ${pill(p2.x, 330, p2.label)}
  ${pill(p3.x, 330, p3.label, C.muted, false)}
  <g opacity="0.5">
    <circle cx="1330" cy="250" r="190" fill="none" stroke="#F4F5FA" stroke-opacity="0.10" stroke-width="1.5"/>
    <circle cx="1330" cy="250" r="140" fill="none" stroke="${C.accent}" stroke-opacity="0.22" stroke-width="1.5" stroke-dasharray="6 10"/>
    <circle cx="1330" cy="250" r="90" fill="none" stroke="${C.accent2}" stroke-opacity="0.22" stroke-width="1.5"/>
    <circle cx="1240" cy="150" r="9" fill="${C.accent}"/>
    <circle cx="1440" cy="330" r="6" fill="${C.accent2}"/>
  </g>`
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${w} ${h}" width="${w}" height="${h}">
  ${defs('bn')}
  <rect width="${w}" height="${h}" fill="${C.bg}"/>
  <g>${stars(w, h, 4411, 70)}</g>
  <ellipse cx="300" cy="250" rx="360" ry="300" fill="url(#bn-glow)"/>
  ${inner}
</svg>
`
}

/* ----------------------------------------------------------------- problem */

function problem() {
  const inner = `
  ${headline(84, 210, 'A listing is a photo', 'and a price.', 62)}
  ${label(86, 400, 'EVERY RESALE TODAY')}
  ${panel(84, 430, 640, 340)}
  <rect x="108" y="454" width="300" height="292" rx="18" fill="rgba(255,255,255,0.05)" stroke="${C.line}" stroke-width="1.2"/>
  <text x="132" y="742" font-family='${MONO}' font-size="12" letter-spacing="2.6" fill="${C.faint}">DEMO PHOTO</text>
  <circle cx="258" cy="600" r="46" fill="none" stroke="${C.line2}" stroke-width="1.5"/>
  <path d="M 232 624 L 258 574 L 284 624 Z" fill="none" stroke="${C.faint}" stroke-width="2"/>
  <text x="432" y="506" font-family='${DISPLAY}' font-size="34" fill="${C.ink}">Blue Dragon Dunny</text>
  <text x="432" y="542" font-family='${MONO}' font-size="13" letter-spacing="1.6" fill="${C.faint}">DESIGNER VINYL · 001</text>
  <text x="432" y="618" font-family='${MONO}' font-size="40" fill="${C.ink}">2,480<tspan font-size="14" fill="${C.accent}" letter-spacing="2"> TRF</tspan></text>
  ${pill(432, 650, 'NO RECORD', C.muted, false)}
  ${label(86, 806, 'SOLD ONCE, THEN SOMEWHERE ELSE')}

  ${panel(780, 430, 736, 340, 26, 'rgba(10,13,22,0.72)', 'rgba(255,255,255,0.16)')}
  <rect x="780" y="430" width="736" height="340" rx="26" fill="none" stroke="${C.line2}" stroke-width="1.5" stroke-dasharray="9 9"/>
  ${label(816, 486, 'RECORD AFTER THE SALE')}
  ${['PURCHASE PROOF', 'DESTRUCTION VIDEO', 'REVIEWER', 'TRANSFER HISTORY'].map((t, i) => `
    <line x1="816" y1="${528 + i * 56}" x2="1480" y2="${528 + i * 56}" stroke="${C.line}" stroke-width="1"/>
    <text x="816" y="${522 + i * 56}" font-family='${MONO}' font-size="13" letter-spacing="2" fill="${C.muted}">${t}</text>
    <text x="1480" y="${522 + i * 56}" text-anchor="end" font-family='${MONO}' font-size="20" fill="${C.faint}">—</text>
  `).join('')}
  <text x="816" y="748" font-family='${MONO}' font-size="12" letter-spacing="2.4" fill="${C.faint}">NO HASH · NO VIDEO · NO REVIEW</text>`
  return frame('pm', 1600, 900, inner, 'KEEPORA', 'SOLANA', 'KEEPORA · PROBLEM 01')
}

/* ------------------------------------------------------------------- proof */

function proof() {
  const card = (x, y, title, rows, tone) => `
    ${panel(x, y, 690, 430)}
    <text x="${x + 32}" y="${y + 54}" font-family='${MONO}' font-size="15" letter-spacing="3.4" fill="${tone}">${title}</text>
    ${rows.map(([k, v], i) => `
      <line x1="${x + 32}" y1="${y + 106 + i * 76}" x2="${x + 658}" y2="${y + 106 + i * 76}" stroke="${C.line}" stroke-width="1"/>
      <text x="${x + 32}" y="${y + 98 + i * 76}" font-family='${MONO}' font-size="12" letter-spacing="2.4" fill="${C.faint}">${k}</text>
      <text x="${x + 32}" y="${y + 130 + i * 76}" font-family='${MONO}' font-size="18" fill="${C.ink}">${v}</text>
    `).join('')}`

  const inner = `
  ${headline(84, 210, 'Two records,', 'one trade.', 62)}
  ${card(84, 300, 'ITEM NFT · BUYER', [
    ['PURCHASE PROOF', 'sha256, recorded at listing'],
    ['DESTRUCTION VIDEO', 'sha256, recorded after sale'],
    ['REVIEWED BY', 'system administrator'],
    ['MINTED', 'after approval'],
  ], C.accent)}
  ${card(826, 300, 'TRADE PROOF · BOTH SIDES', [
    ['SELLER', 'signed order'],
    ['BUYER', 'signed order'],
    ['ESCROW', 'released after dispute window'],
    ['DISPUTE WINDOW', '48 to 72 hours'],
  ], C.accent2)}
  ${label(86, 792, 'ONE PHYSICAL ITEM · ONE CREDENTIAL · ONE SHARED PROOF')}`
  return frame('pf', 1600, 900, inner, 'KEEPORA', 'SOLANA', 'KEEPORA · RECORDS 03')
}

/* ------------------------------------------------------------------- usage */

function usage() {
  const steps = [
    ['01', 'PAY INTO ESCROW', 'buyer funds the order'],
    ['02', 'DESTROY ON VIDEO', 'one continuous take'],
    ['03', 'ADMIN REVIEW', 'hash and timestamp'],
    ['04', 'RELEASE THE RECORD', 'Item NFT + Trade Proof'],
  ]
  const inner = `
  ${headline(84, 210, 'The trade, in', 'four states.', 62)}
  <line x1="120" y1="392" x2="1480" y2="392" stroke="${C.line}" stroke-width="1"/>
  ${steps.map(([n, t, s], i) => {
    const x = 120 + i * 340
    return `
    <circle cx="${x + 20}" cy="392" r="9" fill="${i === 0 ? C.accent : C.bg}" stroke="${C.accent}" stroke-width="2"/>
    <text x="${x + 4}" y="452" font-family='${MONO}' font-size="46" fill="rgba(255,255,255,0.20)">${n}</text>
    <text x="${x + 4}" y="512" font-family='${MONO}' font-size="15" letter-spacing="2" fill="${C.ink}">${t}</text>
    <text x="${x + 4}" y="548" font-family='${DISPLAY}' font-size="20" fill="${C.muted}">${s}</text>`
  }).join('')}
  ${panel(84, 620, 1432, 130, 24, 'rgba(64,179,255,0.06)', 'rgba(64,179,255,0.30)')}
  <text x="116" y="676" font-family='${MONO}' font-size="13" letter-spacing="2.6" fill="${C.accent}">BEFORE ANY MINT</text>
  <text x="116" y="716" font-family='${DISPLAY}' font-size="26" fill="${C.ink}">No approval, no destruction video — no credential.</text>
  ${label(86, 806, 'ESCROW ON SOLANA · REVIEW BEFORE MINT · DISPUTE BEFORE RELEASE')}`
  return frame('us', 1600, 900, inner, 'KEEPORA', 'SOLANA', 'KEEPORA · FLOW 05')
}

/* ------------------------------------------------------------------ render */

async function render(browser, svgPath, pngPath, width, height, transparent = false) {
  const page = await browser.newPage({ viewport: { width, height }, deviceScaleFactor: 1 })
  await page.goto('file:///' + svgPath.replace(/\\/g, '/'))
  await page.waitForTimeout(120)
  await page.screenshot({ path: pngPath, omitBackground: transparent })
  const stat = await fs.stat(pngPath)
  await page.close()
  console.log(`  ${path.basename(pngPath)}  ${width}x${height}  ${(stat.size / 1024).toFixed(1)} KB`)
}

const files = [
  [path.join(TW, 'banner.svg'), banner()],
  [path.join(TW, 'problem-graphic.svg'), problem()],
  [path.join(TW, 'proof-graphic.svg'), proof()],
  [path.join(TW, 'usage-graphic.svg'), usage()],
]

for (const [file, svg] of files) await fs.writeFile(file, svg, 'utf8')

const browser = await chromium.launch({
  executablePath: CHROME,
  headless: true,
  args: ['--no-sandbox', '--disable-dev-shm-usage', '--hide-scrollbars', '--force-color-profile=srgb'],
})

console.log('rendering X kit:')
await render(browser, path.join(TW, 'banner.svg'), path.join(TW, 'banner.png'), 1500, 500)
await render(browser, path.join(TW, 'problem-graphic.svg'), path.join(TW, 'problem-graphic.png'), 1600, 900)
await render(browser, path.join(TW, 'proof-graphic.svg'), path.join(TW, 'proof-graphic.png'), 1600, 900)
await render(browser, path.join(TW, 'usage-graphic.svg'), path.join(TW, 'usage-graphic.png'), 1600, 900)
await render(browser, path.join(SITE, 'public/brand/logo.svg'), path.join(SITE, 'public/brand/logo.png'), 800, 800, true)
await render(browser, path.join(TW, 'logo.svg'), path.join(TW, 'logo.png'), 800, 800, true)

await browser.close()
console.log('done')
