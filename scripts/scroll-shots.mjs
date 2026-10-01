import { createRequire } from 'module';
import { mkdirSync, readdirSync, existsSync } from 'fs';

const require = createRequire(import.meta.url);
const puppeteer = require('puppeteer');

const url   = process.argv[2] || 'http://localhost:3000';
const label = process.argv[3] ? `-${process.argv[3]}` : '';
const width = Number(process.argv[4] || 1440);
const dir   = 'd:/Documents/Desktop/AI_APP/temporary screenshots';

if (!existsSync(dir)) mkdirSync(dir, { recursive: true });

const browser = await puppeteer.launch({ headless: 'new', args: ['--no-sandbox','--disable-setuid-sandbox'] });
const page    = await browser.newPage();
const height  = width < 600 ? 844 : 900;
await page.setViewport({ width, height, deviceScaleFactor: width < 600 ? 2 : 1.25 });
await page.goto(url, { waitUntil: 'networkidle0', timeout: 45000 });
await new Promise(r => setTimeout(r, 1500));

const startY = Number(process.argv[5] || 0);
const total = await page.evaluate(() => document.body.scrollHeight);
const step  = Math.round(height * 0.92);
let shot = 0;
for (let y = startY; y < total; y += step) {
  await page.evaluate((yy) => window.scrollTo({ top: yy, behavior: 'instant' }), y);
  await new Promise(r => setTimeout(r, 900));
  shot++;
  const files = readdirSync(dir).filter(f => f.endsWith('.png'));
  const file = `${dir}/screenshot-${files.length + 1}${label}-${shot}.png`;
  await page.screenshot({ path: file, fullPage: false });
  console.log('Saved:', file);
  if (shot >= Number(process.argv[6] || 18)) break;
}
await browser.close();
