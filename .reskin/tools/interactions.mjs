import fs from 'node:fs/promises'
import path from 'node:path'
import { chromium } from 'playwright-core'

const CHROME = 'C:/Program Files/Google/Chrome/Application/chrome.exe'
const OUT = 'E:/workspace/chuangye/solana/ppmt2s/website/.reskin/detail'
const URL = 'http://127.0.0.1:4321/'

await fs.mkdir(OUT, { recursive: true })

const browser = await chromium.launch({
  executablePath: CHROME,
  headless: true,
  args: ['--no-sandbox', '--disable-dev-shm-usage', '--hide-scrollbars', '--force-color-profile=srgb'],
})

const results = []
const check = (name, ok, detail = '') => {
  results.push({ name, ok, detail })
  console.log(`${ok ? 'ok  ' : 'FAIL'} ${name}${detail ? ` — ${detail}` : ''}`)
}

const errors = []

async function newPage(viewport) {
  const page = await browser.newPage({ viewport, deviceScaleFactor: 1 })
  page.on('console', (m) => { if (m.type() === 'error') errors.push(m.text()) })
  page.on('pageerror', (e) => errors.push(String(e.message || e)))
  await page.goto(URL, { waitUntil: 'networkidle' })
  await page.waitForTimeout(400)
  return page
}

/* ------------------------------------------------------------- desktop */
const page = await newPage({ width: 1440, height: 900 })

// search filters the rail
await page.fill('.orb-search input', 'molly')
await page.waitForTimeout(300)
const filtered = await page.locator('.orb-lot').count()
check('search filters listings', filtered === 1, `${filtered} lot(s) for "molly"`)
await page.fill('.orb-search input', '')
await page.waitForTimeout(250)

// sort by price low
await page.selectOption('.orb-sort select', 'low')
await page.waitForTimeout(300)
const firstPrice = await page.locator('.orb-lot-price strong').first().innerText()
check('sort low-to-high', firstPrice.trim() === '980', `first price ${firstPrice.trim()}`)
await page.selectOption('.orb-sort select', 'recommended')
await page.waitForTimeout(200)

// favourite toggles + toast
await page.locator('.orb-lot-fav').first().click()
await page.waitForTimeout(350)
const favOn = await page.locator('.orb-lot-fav-on').count()
const toastVisible = await page.locator('.orb-toast').count()
check('favourite toggle', favOn === 1, `${favOn} active heart(s)`)
check('toast appears', toastVisible === 1)

// category filter count on the favourites tab
const favCount = await page.locator('.orb-filter').last().innerText()
check('favourites counter updates', favCount.includes('1'), favCount.replace(/\s+/g, ' '))

// item dialog
await page.locator('.orb-lot-open').first().click()
await page.waitForTimeout(500)
const dialogOpen = await page.locator('.orb-dialog').count()
check('item dialog opens', dialogOpen === 1)
await page.screenshot({ path: path.join(OUT, 'dialog-item.png') })

// proof tab
await page.locator('.orb-tab').nth(1).click()
await page.waitForTimeout(350)
const historyRows = await page.locator('.orb-history-step').count()
check('proof tab renders history', historyRows === 5, `${historyRows} step(s)`)
await page.screenshot({ path: path.join(OUT, 'dialog-proof.png') })

// checkout preview
await page.locator('.orb-dialog-actions .orb-buy').click()
await page.waitForTimeout(400)
const checkoutHeading = await page.locator('.orb-dialog-head h2').innerText()
check('checkout preview renders', /cost|费用/i.test(checkoutHeading), checkoutHeading)
await page.screenshot({ path: path.join(OUT, 'dialog-checkout.png') })

// escape closes
await page.keyboard.press('Escape')
await page.waitForTimeout(400)
const dialogClosed = await page.locator('.orb-dialog').count()
check('escape closes dialog', dialogClosed === 0)

// seller panel
await page.locator('.orb-hud-btn').first().click()
await page.waitForTimeout(450)
check('seller panel opens', (await page.locator('.orb-panel').count()) === 1)
await page.screenshot({ path: path.join(OUT, 'panel-seller.png') })
await page.keyboard.press('Escape')
await page.waitForTimeout(350)

// wallet panel
await page.locator('.orb-hud-primary').click()
await page.waitForTimeout(450)
check('wallet panel opens', (await page.locator('.orb-panel').count()) === 1)
await page.screenshot({ path: path.join(OUT, 'panel-wallet.png') })
await page.keyboard.press('Escape')
await page.waitForTimeout(350)

// staking sandbox: lock period + membership
await page.locator('#rewards').scrollIntoViewIfNeeded()
await page.waitForTimeout(300)
await page.locator('.orb-segment-btn').nth(2).click()
await page.selectOption('.orb-select select', 'genesis')
await page.waitForTimeout(350)
const weight = await page.locator('.orb-weight strong').innerText()
check('staking sandbox recalculates', weight.replace(/\s+/g, '').startsWith('5,000'), weight.replace(/\s+/g, ' '))
await page.screenshot({ path: path.join(OUT, 'rewards-state.png') })

// tokenomics head + allocation
await page.locator('#tokenomics').scrollIntoViewIfNeeded()
await page.waitForTimeout(300)
await page.screenshot({ path: path.join(OUT, 'tokenomics.png') })

// dialogs get focus rings
await page.keyboard.press('Escape')
await page.evaluate(() => window.scrollTo(0, 0))
await page.waitForTimeout(300)
for (let i = 0; i < 6; i += 1) await page.keyboard.press('Tab')
const focusShot = await page.screenshot({ path: path.join(OUT, 'focus-traversal.png') })
check('focus traversal captured', Boolean(focusShot))

// Chinese locale
await page.locator('.orb-locale').click()
await page.waitForTimeout(500)
const htmlLang = await page.evaluate(() => document.documentElement.lang)
check('locale switches to zh', htmlLang === 'zh', htmlLang)
const zhOverflow = await page.evaluate(() => document.documentElement.scrollWidth > document.documentElement.clientWidth + 2)
check('zh has no horizontal overflow', !zhOverflow)
await page.screenshot({ path: path.join(OUT, 'locale-zh.png') })
await page.locator('.orb-locale').click()
await page.waitForTimeout(400)

/* -------------------------------------------------------------- mobile */
const mp = await newPage({ width: 390, height: 844 })
await mp.screenshot({ path: path.join(OUT, 'mobile-fold.png') })
const dockVisible = await mp.locator('.orb-dock-link').first().isVisible()
check('mobile dock visible', dockVisible)
await mp.locator('.orb-dock-menu').click()
await mp.waitForTimeout(350)
check('mobile menu opens', (await mp.locator('.orb-sheet').count()) === 1)
await mp.screenshot({ path: path.join(OUT, 'mobile-menu.png') })
await mp.locator('.orb-dock-menu').click()
await mp.waitForTimeout(250)

await mp.locator('.orb-lot-open').first().click()
await mp.waitForTimeout(500)
check('mobile dialog opens', (await mp.locator('.orb-dialog').count()) === 1)
await mp.screenshot({ path: path.join(OUT, 'mobile-dialog.png') })
await mp.keyboard.press('Escape')
await mp.waitForTimeout(300)

const overflow = await mp.evaluate(() => document.documentElement.scrollWidth > document.documentElement.clientWidth + 2)
check('mobile has no horizontal overflow', !overflow)

check('no console errors', errors.length === 0, errors.slice(0, 2).join(' | '))

await fs.writeFile(path.join(OUT, 'interaction-report.json'), JSON.stringify({ results, errors }, null, 2), 'utf8')
await browser.close()

const failed = results.filter((r) => !r.ok)
console.log(`\n${failed.length === 0 ? 'ALL PASS' : `${failed.length} FAILED`} — ${results.length} checks`)
if (failed.length) process.exitCode = 1
