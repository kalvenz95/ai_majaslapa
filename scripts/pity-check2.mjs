import { createRequire } from 'module';
import { readdirSync } from 'fs';
const require = createRequire(import.meta.url);
const puppeteer = require('puppeteer');
const dir = 'd:/Documents/Desktop/AI_APP/temporary screenshots';
let n = readdirSync(dir).filter(f => f.endsWith('.png')).length;
const browser = await puppeteer.launch({ headless: 'new', args: ['--no-sandbox','--disable-setuid-sandbox'] });
const page = await browser.newPage();
await page.setViewport({ width: 1440, height: 900, deviceScaleFactor: 1.4 });
await page.goto('http://localhost:3000/pity-store-site/index.html', { waitUntil: 'networkidle0', timeout: 40000 });
await new Promise(r => setTimeout(r, 1500));
// check broken images
const broken = await page.evaluate(() => {
  return Array.from(document.images).filter(i => !i.complete || i.naturalWidth === 0).map(i => i.getAttribute('data-replace') || i.alt || i.src.slice(0,60));
});
console.log('BROKEN IMAGES:', JSON.stringify(broken));
await page.evaluate(() => window.scrollTo({ top: 1150, behavior: 'instant' }));
await new Promise(r => setTimeout(r, 900));
n++;
await page.screenshot({ path: dir + '/screenshot-' + n + '-pity-about.png' });
console.log('Saved about @', n);
await browser.close();
