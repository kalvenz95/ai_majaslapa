import { createRequire } from 'module';
const require = createRequire(import.meta.url);
const puppeteer = require('puppeteer');

const dir = 'd:/Documents/Desktop/AI_APP/ai-kursu-majaslapa/public/portfolio';
const sites = [
  { url: 'https://la-skrundo.vercel.app', file: 'la-skrundo.png' },
  { url: 'https://dessert-deagle-site.vercel.app', file: 'dessert-deagle.png' },
  { url: 'https://pity-store.vercel.app/', file: 'pity-store.png' },
];

const browser = await puppeteer.launch({ headless: 'new', args: ['--no-sandbox','--disable-setuid-sandbox'] });
const page = await browser.newPage();
await page.setViewport({ width: 1280, height: 800, deviceScaleFactor: 1.5 });

for (const s of sites) {
  await page.goto(s.url, { waitUntil: 'networkidle0', timeout: 60000 });
  await new Promise(r => setTimeout(r, 1800));
  await page.screenshot({ path: `${dir}/${s.file}` });
  console.log('Saved', s.file);
}
await browser.close();
