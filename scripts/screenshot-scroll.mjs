import puppeteer from 'puppeteer';
import path from 'path';
import fs from 'fs';

const url = process.argv[2] || 'http://localhost:3000';
const scrollY = parseInt(process.argv[3] || '0');
const label = process.argv[4] || 'scroll';

const browser = await puppeteer.launch({
  headless: 'new',
  executablePath: 'C:/Users/Kalvis24/.cache/puppeteer/chrome/win64-131.0.6778.204/chrome-win64/chrome.exe',
  args: ['--no-sandbox']
});

const page = await browser.newPage();
await page.setViewport({ width: 1280, height: 900 });
await page.goto(url, { waitUntil: 'networkidle2', timeout: 15000 }).catch(() => {});
await new Promise(r => setTimeout(r, 2000));
if (scrollY > 0) await page.evaluate(y => window.scrollTo(0, y), scrollY);
await new Promise(r => setTimeout(r, 500));

const dir = path.join(path.dirname(new URL(import.meta.url).pathname.slice(1)), 'temporary screenshots');
const files = fs.readdirSync(dir).filter(f => f.endsWith('.png'));
const n = files.length + 1;
const out = path.join(dir, `screenshot-${n}-${label}.png`);
await page.screenshot({ path: out });
console.log('Saved:', out);
await browser.close();
