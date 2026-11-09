/**
 * Capture interaction states of the reskinned Custoria site with real Chrome.
 * Run from website/.reskin/tools against the local Vite preview server.
 */
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { chromium } from 'playwright-core';

const HERE = path.dirname(fileURLToPath(import.meta.url));
const OUT = path.resolve(HERE, '..', 'detail');
const BASE = process.env.PREVIEW_URL || 'http://127.0.0.1:4321/';
const CHROME = process.env.CHROME_PATH || 'C:/Program Files/Google/Chrome/Application/chrome.exe';

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

const browser = await chromium.launch({ executablePath: CHROME, headless: true });
const errors = [];
try {
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 }, deviceScaleFactor: 1 });
  page.on('pageerror', (err) => errors.push(String(err)));
  page.on('console', (msg) => { if (msg.type() === 'error') errors.push(msg.text()); });

  await page.goto(BASE, { waitUntil: 'networkidle' });
  await sleep(400);
  await page.screenshot({ path: path.join(OUT, 'desktop-fold.png') });

  // Item dialog
  await page.locator('button.cx-lot-open').first().click();
  await sleep(450);
  await page.screenshot({ path: path.join(OUT, 'dialog-item.png') });

  // Checkout pane
  await page.locator('button.cx-buy').first().click();
  await sleep(400);
  await page.screenshot({ path: path.join(OUT, 'dialog-checkout.png') });
  await page.locator('button.cx-dialog-close').first().click();
  await sleep(350);

  // Seller sheet
  await page.getByRole('button', { name: /become a seller/i }).first().click();
  await sleep(400);
  await page.screenshot({ path: path.join(OUT, 'dialog-seller.png') });
  await page.locator('button.cx-dialog-close').first().click();
  await sleep(350);

  // Wallet sheet
  await page.getByRole('button', { name: /connect wallet/i }).first().click();
  await sleep(400);
  await page.screenshot({ path: path.join(OUT, 'dialog-wallet.png') });
  await page.keyboard.press('Escape');
  await sleep(300);

  // Focus ring on the primary CTA
  await page.locator('a.cx-rail-cta, button.cx-rail-cta').first().focus();
  await page.screenshot({ path: path.join(OUT, 'focus-cta.png') });

  // Mobile states
  const mobile = await browser.newPage({ viewport: { width: 390, height: 844 }, deviceScaleFactor: 1 });
  mobile.on('pageerror', (err) => errors.push(String(err)));
  await mobile.goto(BASE, { waitUntil: 'networkidle' });
  await sleep(400);
  await mobile.screenshot({ path: path.join(OUT, 'mobile-fold.png') });
  await mobile.locator('button.cx-menu-btn').click();
  await sleep(350);
  await mobile.screenshot({ path: path.join(OUT, 'mobile-menu.png') });
  await mobile.locator('button.cx-menu-btn').click();
  await sleep(250);
  await mobile.evaluate(() => document.getElementById('market')?.scrollIntoView({ block: 'start' }));
  await sleep(600);
  await mobile.screenshot({ path: path.join(OUT, 'mobile-market.png') });
  await mobile.close();
} finally {
  await browser.close();
}
console.log(JSON.stringify({ ok: true, out: OUT, errors }, null, 2));
