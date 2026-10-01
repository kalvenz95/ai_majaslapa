import { createRequire } from 'module';
import { readdirSync } from 'fs';
const require = createRequire(import.meta.url);
const puppeteer = require('puppeteer');
const dir = 'd:/Documents/Desktop/AI_APP/temporary screenshots';
let n = readdirSync(dir).filter(f => f.endsWith('.png')).length;
const url = process.argv[2];
const tag = process.argv[3] || 'desk';
const positions = (process.argv[4] || '0,750,1500,2400,3300,4300,5400,6500').split(',').map(Number);

const browser = await puppeteer.launch({ headless: 'new', args: ['--no-sandbox','--disable-setuid-sandbox'] });
const page = await browser.newPage();
await page.setViewport({ width: 1440, height: 900, deviceScaleFactor: 1.4 });
await page.goto(url, { waitUntil: 'networkidle0', timeout: 45000 });
await new Promise(r => setTimeout(r, 1800));
for (let i = 0; i < positions.length; i++) {
  await page.evaluate(y => window.scrollTo({ top: y, behavior: 'instant' }), positions[i]);
  await new Promise(r => setTimeout(r, 600));
  n++;
  await page.screenshot({ path: `${dir}/screenshot-${n}-${tag}${i}.png` });
}
console.log('LAST_N', n);
await browser.close();
