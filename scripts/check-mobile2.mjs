import puppeteer from 'puppeteer';
import { existsSync, mkdirSync, readdirSync } from 'fs';
import { join } from 'path';

const dir = './temporary screenshots';
if (!existsSync(dir)) mkdirSync(dir);
let n = readdirSync(dir).filter(f => f.endsWith('.png')).length;

const browser = await puppeteer.launch({ headless: true });
const page = await browser.newPage();
await page.setViewport({ width: 390, height: 844 });
await page.goto('http://localhost:3000', { waitUntil: 'networkidle2', timeout: 15000 });
await new Promise(r => setTimeout(r, 2000));

// Find hamburger button via JS
const menuResult = await page.evaluate(() => {
  // Find the last button in nav (hamburger)
  const nav = document.querySelector('nav');
  if (!nav) return 'NO NAV';
  const btns = nav.querySelectorAll('button');
  const visibleBtns = Array.from(btns).filter(b => {
    const r = b.getBoundingClientRect();
    return r.width > 0 && r.height > 0;
  });
  return 'Visible buttons: ' + visibleBtns.length + ' | First: ' + (visibleBtns[0]?.className || 'none');
});
console.log('Nav buttons:', menuResult);

// Click hamburger via JS evaluate
await page.evaluate(() => {
  const nav = document.querySelector('nav');
  const btns = Array.from(nav.querySelectorAll('button')).filter(b => {
    const r = b.getBoundingClientRect();
    return r.width > 0 && r.height > 0 && !b.className.includes('btn-primary');
  });
  if (btns.length > 0) btns[btns.length - 1].click();
});
await new Promise(r => setTimeout(r, 500));
n++;
await page.screenshot({ path: join(dir, 'screenshot-' + n + '-mobile-menu.png') });
console.log('Mobile menu screenshot saved');

// Check if menu is open
const menuState = await page.evaluate(() => {
  const menu = document.querySelector('nav .md\:hidden:not(button)');
  return menu ? 'Menu found: ' + menu.className : 'No menu div found';
});
console.log('Menu state:', menuState);

await browser.close();
