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
await new Promise(r => setTimeout(r, 2200));

// Scroll through full page in steps to trigger reveals + capture
const positions = [900, 1700, 2500, 3300, 4100, 4900, 5700, 6500, 7300];
for (let i = 0; i < positions.length; i++) {
  await page.evaluate(y => window.scrollTo({ top: y, behavior: 'instant' }), positions[i]);
  await new Promise(r => setTimeout(r, 700));
  n++;
  await page.screenshot({ path: `${dir}/screenshot-${n}-pity-s${i+1}.png`, fullPage: false });
  console.log('Saved s' + (i+1) + ' @ ' + positions[i]);
}
await browser.close();
