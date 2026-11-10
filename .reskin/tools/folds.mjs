import { chromium } from 'playwright-core'

const CHROME = 'C:/Program Files/Google/Chrome/Application/chrome.exe'
const OUT = 'E:/workspace/chuangye/solana/ppmt2s/website/.reskin/detail'
const URL = 'http://127.0.0.1:4321/'

const browser = await chromium.launch({
  executablePath: CHROME,
  headless: true,
  args: ['--no-sandbox', '--hide-scrollbars', '--force-color-profile=srgb'],
})

for (const [w, h, name] of [[1440, 900, 'fold-1440x900'], [1366, 768, 'fold-1366x768'], [1280, 720, 'fold-1280x720'], [1920, 1080, 'fold-1920x1080'], [390, 844, 'fold-390x844']]) {
  const page = await browser.newPage({ viewport: { width: w, height: h } })
  await page.goto(URL, { waitUntil: 'networkidle' })
  await page.waitForTimeout(700)
  const box = await page.evaluate(() => {
    const btn = document.querySelector('.orb-cta')
    const dock = document.querySelector('.orb-dock')
    const note = document.querySelector('.orb-cover-note')
    const r1 = btn.getBoundingClientRect()
    const r2 = dock.getBoundingClientRect()
    const r3 = note.getBoundingClientRect()
    return {
      ctaBottom: Math.round(r1.bottom),
      noteBottom: Math.round(r3.bottom),
      dockTop: Math.round(r2.top),
      ctaOverlap: r1.bottom > r2.top,
      noteOverlap: r3.bottom > r2.top,
    }
  })
  console.log(name, JSON.stringify(box))
  await page.screenshot({ path: `${OUT}/${name}.png` })
  await page.close()
}

await browser.close()
