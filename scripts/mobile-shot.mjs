import { createRequire } from 'module';
import { readdirSync } from 'fs';
const require = createRequire(import.meta.url);
const puppeteer = require('puppeteer');
const dir = 'd:/Documents/Desktop/AI_APP/temporary screenshots';
let n = readdirSync(dir).filter(f => f.endsWith('.png')).length;

const url = process.argv[2] || 'http://localhost:3000/dessert-deagle-site/index.html';
const tag = process.argv[3] || 'mob';

const browser = await puppeteer.launch({ headless: 'new', args: ['--no-sandbox','--disable-setuid-sandbox'] });
const page = await browser.newPage();
// iPhone-ish viewport
await page.setViewport({ width: 390, height: 844, deviceScaleFactor: 2, isMobile: true, hasTouch: true });
await page.goto(url, { waitUntil: 'networkidle0', timeout: 45000 });
await new Promise(r => setTimeout(r, 1800));

// horizontal overflow check
const overflow = await page.evaluate(() => {
  const de = document.documentElement;
  return { scrollW: de.scrollWidth, clientW: de.clientWidth, overflow: de.scrollWidth - de.clientWidth };
});
console.log('OVERFLOW:', JSON.stringify(overflow));

const positions = [0, 700, 1500, 2400, 3300, 4300, 5400, 6500, 7600, 8800];
for (let i = 0; i < positions.length; i++) {
  await page.evaluate(y => window.scrollTo({ top: y, behavior: 'instant' }), positions[i]);
  await new Promise(r => setTimeout(r, 500));
  n++;
  await page.screenshot({ path: `${dir}/screenshot-${n}-${tag}${i}.png` });
}
console.log('LAST_N', n);
await browser.close();
