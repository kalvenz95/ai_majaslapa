import { createRequire } from 'module';
import { readdirSync } from 'fs';
const require = createRequire(import.meta.url);
const puppeteer = require('puppeteer');
const dir = 'd:/Documents/Desktop/AI_APP/temporary screenshots';
let n = readdirSync(dir).filter(f => f.endsWith('.png')).length;

const url = process.argv[2] || 'http://localhost:3000/lv';
const selectors = process.argv[3].split(',');
const tag = process.argv[4] || 'sec';

const browser = await puppeteer.launch({ headless: 'new', args: ['--no-sandbox','--disable-setuid-sandbox'] });
const page = await browser.newPage();
await page.setViewport({ width: 1440, height: 900, deviceScaleFactor: 1.4 });
await page.goto(url, { waitUntil: 'networkidle0', timeout: 45000 });
await new Promise(r => setTimeout(r, 1500));

for (const sel of selectors) {
  const found = await page.evaluate((s) => {
    const el = document.querySelector(s);
    if (!el) return false;
    el.scrollIntoView({ block: 'start', behavior: 'instant' });
    return true;
  }, sel);
  if (!found) { console.log('NOT FOUND:', sel); continue; }
  await new Promise(r => setTimeout(r, 700));
  n++;
  const safe = sel.replace(/[^a-zA-Z0-9]/g, '');
  await page.screenshot({ path: `${dir}/screenshot-${n}-${tag}-${safe}.png` });
  console.log('Saved', sel);
}
await browser.close();
