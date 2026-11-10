import fs from 'node:fs/promises'
import { chromium } from 'playwright-core'

const CHROME = 'C:/Program Files/Google/Chrome/Application/chrome.exe'
const OUT = 'E:/workspace/chuangye/solana/ppmt2s/website/.reskin/tools'
const URL = 'http://127.0.0.1:4321/'

const browser = await chromium.launch({
  executablePath: CHROME,
  headless: true,
  args: ['--no-sandbox', '--disable-dev-shm-usage', '--hide-scrollbars', '--force-color-profile=srgb'],
})
const page = await browser.newPage({ viewport: { width: 1600, height: 900 }, deviceScaleFactor: 2 })
await page.goto(URL, { waitUntil: 'networkidle' })
await page.waitForTimeout(900)

// Hide the floating chrome so the capture reads as a product surface, not a browser.
await page.addStyleTag({ content: '.orb-dock,.orb-hud,.orb-spine{display:none !important}' })

const shots = [
  ['capture-market.png', '#market'],
  ['capture-protocol.png', '#protocol'],
  ['capture-cover.png', '#top'],
]

for (const [name, selector] of shots) {
  await page.evaluate((sel) => {
    const el = document.querySelector(sel)
    if (el) window.scrollTo({ top: el.getBoundingClientRect().top + window.scrollY - 40, behavior: 'instant' })
  }, selector)
  await page.waitForTimeout(500)
  await page.screenshot({ path: `${OUT}/${name}` })
  const s = await fs.stat(`${OUT}/${name}`)
  console.log(name, `${(s.size / 1024).toFixed(0)} KB`)
}

await browser.close()
