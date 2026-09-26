import puppeteer from 'puppeteer';
import { existsSync, mkdirSync, readdirSync } from 'fs';
import { join } from 'path';

const dir = './temporary screenshots';
if (!existsSync(dir)) mkdirSync(dir);

const browser = await puppeteer.launch({ headless: true });
const page = await browser.newPage();
await page.setViewport({ width: 1440, height: 900 });
await page.goto('http://localhost:3000', { waitUntil: 'networkidle2', timeout: 15000 });
await new Promise(r => setTimeout(r, 2000));

const sections = [
  { label: 'hero', scroll: 0 },
  { label: 'whyai', scroll: 900 },
  { label: 'fastwin', scroll: 1800 },
  { label: 'services', scroll: 2700 },
  { label: 'pricing', scroll: 3800 },
  { label: 'tools', scroll: 5200 },
  { label: 'testimonials', scroll: 4500 },
  { label: 'cta', scroll: 6200 },
];

let n = readdirSync(dir).filter(f => f.endsWith('.png')).length;
for (const s of sections) {
  await page.evaluate(y => window.scrollTo(0, y), s.scroll);
  await new Promise(r => setTimeout(r, 400));
  n++;
  const fp = join(dir, 'screenshot-' + n + '-' + s.label + '.png');
  await page.screenshot({ path: fp });
  console.log('Saved: ' + fp);
}

await browser.close();
