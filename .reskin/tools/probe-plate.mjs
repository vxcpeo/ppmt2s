import { chromium } from 'playwright-core'

const browser = await chromium.launch({
  executablePath: 'C:/Program Files/Google/Chrome/Application/chrome.exe',
  headless: true,
  args: ['--no-sandbox', '--hide-scrollbars'],
})
const page = await browser.newPage({ viewport: { width: 1366, height: 768 } })
await page.goto('http://127.0.0.1:4321/', { waitUntil: 'networkidle' })
await page.waitForTimeout(700)
const info = await page.evaluate(() => {
  const media = document.querySelector('.orb-plate-media')
  const img = document.querySelector('.orb-plate-img')
  const plate = document.querySelector('.orb-plate')
  const cs = getComputedStyle(media)
  const pick = (el) => { const r = el.getBoundingClientRect(); return { w: Math.round(r.width), h: Math.round(r.height) } }
  return {
    media: pick(media),
    img: pick(img),
    plate: pick(plate),
    style: { aspectRatio: cs.aspectRatio, blockSize: cs.blockSize, maxBlockSize: cs.maxBlockSize, justifySelf: cs.justifySelf, inlineSize: cs.inlineSize },
    href: document.querySelector('link[rel="stylesheet"]')?.getAttribute('href') || [...document.querySelectorAll('link')].map((l) => l.getAttribute('href')),
  }
})
console.log(JSON.stringify(info, null, 2))
await browser.close()
