import { createRequire } from 'module';
const require = createRequire(import.meta.url);
const puppeteer = require('puppeteer');

const browser = await puppeteer.launch({ headless: 'new', args: ['--no-sandbox','--disable-setuid-sandbox'] });
const page = await browser.newPage();
await page.setViewport({ width: 1440, height: 900, deviceScaleFactor: 1 });
await page.goto('http://localhost:3000', { waitUntil: 'networkidle0', timeout: 30000 });
await new Promise(r => setTimeout(r, 2000));

const sections = [
  ['#how', '225-how'],
  ['#learn', '226-learn'],
  ['#projects', '227-projects'],
  ['#tools', '228-tools'],
];

for (const [sel, name] of sections) {
  await page.evaluate((s) => {
    document.querySelector(s).scrollIntoView({ behavior: 'instant', block: 'start' });
  }, sel);
  await new Promise(r => setTimeout(r, 1000));
  await page.screenshot({ path: `d:/Documents/Desktop/AI_APP/temporary screenshots/screenshot-${name}.png` });
  console.log('Saved:', name);
}

await browser.close();
