import { createRequire } from 'module';
import { readdirSync } from 'fs';
const require = createRequire(import.meta.url);
const puppeteer = require('puppeteer');

const dir = 'd:/Documents/Desktop/AI_APP/temporary screenshots';
let n = readdirSync(dir).filter(f => f.endsWith('.png')).length;

const browser = await puppeteer.launch({ headless: 'new', args: ['--no-sandbox','--disable-setuid-sandbox'] });
const page = await browser.newPage();
await page.setViewport({ width: 1440, height: 900, deviceScaleFactor: 1.5 });
await page.goto('http://localhost:3000/chademy-lv-prototype.html', { waitUntil: 'networkidle0', timeout: 30000 });
await new Promise(r => setTimeout(r, 2000));

const shots = [
  ['#why',       'why'],
  ['#virzieni',  'virzieni'],
  ['#process',   'process'],
  ['#community', 'community'],
  ['#tools',     'tools'],
  ['#faq',       'faq'],
  ['#cta',       'cta'],
];

for (const [sel, label] of shots) {
  await page.evaluate(s => document.querySelector(s)?.scrollIntoView({ behavior: 'instant', block: 'start' }), sel);
  await new Promise(r => setTimeout(r, 900));
  n++;
  const path = `${dir}/screenshot-${n}-proto-${label}.png`;
  await page.screenshot({ path, fullPage: false });
  console.log('Saved:', label);
}

await browser.close();
