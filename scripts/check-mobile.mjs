import puppeteer from 'puppeteer';
import { existsSync, mkdirSync, readdirSync } from 'fs';
import { join } from 'path';

const dir = './temporary screenshots';
if (!existsSync(dir)) mkdirSync(dir);
let n = readdirSync(dir).filter(f => f.endsWith('.png')).length;

const browser = await puppeteer.launch({ headless: true });

// MOBILE VIEW
const mobile = await browser.newPage();
await mobile.setViewport({ width: 390, height: 844 });
await mobile.goto('http://localhost:3000', { waitUntil: 'networkidle2', timeout: 15000 });
await new Promise(r => setTimeout(r, 2000));
n++;
await mobile.screenshot({ path: join(dir, 'screenshot-' + n + '-mobile-hero.png') });
console.log('Mobile hero saved');

// Click hamburger menu
const menuBtn = await mobile.$('nav button');
if (menuBtn) {
  await menuBtn.click();
  await new Promise(r => setTimeout(r, 400));
  n++;
  await mobile.screenshot({ path: join(dir, 'screenshot-' + n + '-mobile-menu-open.png') });
  console.log('Mobile menu open saved');
} else {
  console.log('NO HAMBURGER BUTTON FOUND');
}

// DESKTOP - Pricing section
const desktop = await browser.newPage();
await desktop.setViewport({ width: 1440, height: 900 });
await desktop.goto('http://localhost:3000#pricing', { waitUntil: 'networkidle2', timeout: 15000 });
await new Promise(r => setTimeout(r, 2000));
await desktop.evaluate(() => window.scrollTo(0, 4800));
await new Promise(r => setTimeout(r, 400));
n++;
await desktop.screenshot({ path: join(dir, 'screenshot-' + n + '-pricing-section.png') });
console.log('Pricing section saved');

// Tools section
await desktop.evaluate(() => window.scrollTo(0, 6000));
await new Promise(r => setTimeout(r, 400));
n++;
await desktop.screenshot({ path: join(dir, 'screenshot-' + n + '-tools-section.png') });
console.log('Tools section saved');

await browser.close();
