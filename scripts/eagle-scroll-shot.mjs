import { createRequire } from 'module';
import { readdirSync } from 'fs';
const require = createRequire(import.meta.url);
const puppeteer = require('puppeteer');

const dir = 'd:/Documents/Desktop/AI_APP/temporary screenshots';
let n = readdirSync(dir).filter(f => f.endsWith('.png')).length;

const browser = await puppeteer.launch({ headless: 'new', args: ['--no-sandbox','--disable-setuid-sandbox'] });
const page = await browser.newPage();
await page.setViewport({ width: 1440, height: 900, deviceScaleFactor: 1.5 });
await page.goto('http://localhost:3001', { waitUntil: 'networkidle0', timeout: 30000 });
await new Promise(r => setTimeout(r, 2000));

const shots = [
  [null,       'hero'],
  ['#about',   'about'],
  ['#services','services'],
  ['#pricing', 'pricing'],
  ['#reviews', 'reviews'],
  ['#booking', 'booking'],
  ['#contact', 'contact'],
];

for (const [sel, label] of shots) {
  if (sel) {
    await page.evaluate(s => document.querySelector(s)?.scrollIntoView({ behavior: 'instant', block: 'start' }), sel);
    await new Promise(r => setTimeout(r, 900));
  }
  n++;
  const path = `${dir}/screenshot-${n}-eagle-${label}.png`;
  await page.screenshot({ path, fullPage: false });
  console.log('Saved:', label);
}

await browser.close();
