import { chromium } from 'playwright-core'

const CHROME = 'C:/Program Files/Google/Chrome/Application/chrome.exe'
const browser = await chromium.launch({ executablePath: CHROME, headless: true, args: ['--no-sandbox'] })
const page = await browser.newPage({ viewport: { width: 1440, height: 900 } })
await page.goto('http://127.0.0.1:4321/', { waitUntil: 'networkidle' })
await page.waitForTimeout(500)

const found = await page.evaluate(() => {
  const out = []
  for (const el of document.querySelectorAll('#market *')) {
    const cs = getComputedStyle(el)
    const r = el.getBoundingClientRect()
    if (r.height > 0 && r.height <= 12 && /gradient/.test(cs.backgroundImage)) {
      out.push({ cls: el.className, tag: el.tagName, h: r.height, w: r.width, top: r.top, bg: cs.backgroundImage.slice(0, 80), pos: cs.position })
    }
  }
  const row = document.querySelector('.orb-filter-row')
  const rcs = row ? getComputedStyle(row) : null
  return {
    out,
    row: rcs ? { overflowX: rcs.overflowX, scrollbarWidth: rcs.scrollbarWidth, height: row.getBoundingClientRect().height, bw: rcs.borderBottomWidth } : null,
  }
})
console.log(JSON.stringify(found, null, 2))
await browser.close()
