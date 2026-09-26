import puppeteer from 'puppeteer';
import { existsSync, mkdirSync, readdirSync } from 'fs';
import { join } from 'path';

const dir = './temporary screenshots';
if (!existsSync(dir)) mkdirSync(dir);
let n = readdirSync(dir).filter(f => f.endsWith('.png')).length;

const browser = await puppeteer.launch({ headless: true });
const page = await browser.newPage();
await page.setViewport({ width: 1440, height: 900 });
await page.goto('http://localhost:3000', { waitUntil: 'networkidle2', timeout: 15000 });
await new Promise(r => setTimeout(r, 2000));

// Scroll to #about section
await page.evaluate(() => {
  const el = document.getElementById('about');
  if (el) el.scrollIntoView({ behavior: 'instant' });
  else console.log('NO #about ELEMENT FOUND');
});
await new Promise(r => setTimeout(r, 600));

n++;
await page.screenshot({ path: join(dir, 'screenshot-' + n + '-buildpack.png') });
console.log('BuildPack section screenshot saved');

// Scroll to Tools section
await page.evaluate(() => {
  const el = document.getElementById('tools');
  if (el) el.scrollIntoView({ behavior: 'instant' });
});
await new Promise(r => setTimeout(r, 600));

n++;
await page.screenshot({ path: join(dir, 'screenshot-' + n + '-tools-after.png') });
console.log('Tools section screenshot saved');

// Check if gradient-text-cyan has background-image
const cssCheck = await page.evaluate(() => {
  const els = document.querySelectorAll('.gradient-text-cyan');
  if (els.length === 0) return 'NO ELEMENTS WITH gradient-text-cyan';
  const styles = window.getComputedStyle(els[0]);
  return 'gradient-text-cyan found: ' + els.length + ' elements, bg=' + styles.backgroundImage.slice(0, 50);
});
console.log('CSS check:', cssCheck);

await browser.close();
