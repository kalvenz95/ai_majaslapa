import puppeteer from 'puppeteer';
import { existsSync, mkdirSync, readdirSync } from 'fs';
import { join } from 'path';

const dir = './temporary screenshots';
let n = readdirSync(dir).filter(f => f.endsWith('.png')).length;

const browser = await puppeteer.launch({ headless: true });
const page = await browser.newPage();
await page.setViewport({ width: 1440, height: 900 });
await page.goto('http://localhost:3000', { waitUntil: 'networkidle2', timeout: 15000 });
await new Promise(r => setTimeout(r, 2000));

// Click "Par mums" nav link
const clicked = await page.evaluate(() => {
  const links = Array.from(document.querySelectorAll('nav a'));
  const parMums = links.find(l => l.textContent.trim() === 'Par mums');
  if (!parMums) return 'Link NOT found';
  parMums.click();
  return 'Clicked: ' + parMums.href;
});
console.log('Nav click result:', clicked);
await new Promise(r => setTimeout(r, 800));

n++;
await page.screenshot({ path: join(dir, 'screenshot-' + n + '-par-mums-scroll.png') });
console.log('Screenshot saved');

// Check current scroll position
const scrollY = await page.evaluate(() => window.scrollY);
console.log('Scroll Y after click:', scrollY, '(should be > 0)');

await browser.close();
