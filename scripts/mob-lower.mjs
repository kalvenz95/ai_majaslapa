import { createRequire } from 'module';
import { readdirSync } from 'fs';
const require = createRequire(import.meta.url);
const puppeteer = require('puppeteer');
const dir = 'd:/Documents/Desktop/AI_APP/temporary screenshots';
let n = readdirSync(dir).filter(f => f.endsWith('.png')).length;
const url = process.argv[2] || 'http://localhost:3000/lv';
const tag = process.argv[3] || 'mlo';
const browser = await puppeteer.launch({ headless: 'new', args: ['--no-sandbox','--disable-setuid-sandbox'] });
const page = await browser.newPage();
await page.setViewport({ width: 390, height: 844, deviceScaleFactor: 2, isMobile: true, hasTouch: true });
await page.goto(url, { waitUntil: 'networkidle0', timeout: 45000 });
await new Promise(r => setTimeout(r, 1500));
const total = await page.evaluate(() => document.body.scrollHeight);
console.log('TOTAL_H', total);
const positions = [9600, 10500, 11400, 12300, 13200, 14100, 15000, 15900, 16800, 17700, 18600];
for (let i = 0; i < positions.length; i++) {
  if (positions[i] > total) break;
  await page.evaluate(y => window.scrollTo({ top: y, behavior: 'instant' }), positions[i]);
  await new Promise(r => setTimeout(r, 500));
  n++;
  await page.screenshot({ path: `${dir}/screenshot-${n}-${tag}${i}.png` });
  console.log('shot', positions[i], '->', n);
}
await browser.close();
