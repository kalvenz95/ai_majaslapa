import { createRequire } from 'module';
import { mkdirSync, readdirSync, existsSync } from 'fs';

const require = createRequire(import.meta.url);
const puppeteer = require('puppeteer');

const url    = process.argv[2] || 'http://localhost:3000';
const scrollY = parseInt(process.argv[3] || '0');
const label  = process.argv[4] ? `-${process.argv[4]}` : '';
const dir    = 'd:/Documents/Desktop/AI_APP/temporary screenshots';

if (!existsSync(dir)) mkdirSync(dir, { recursive: true });
const files = existsSync(dir) ? readdirSync(dir).filter(f => f.endsWith('.png')) : [];
const file  = `${dir}/screenshot-${files.length + 1}${label}.png`;

const browser = await puppeteer.launch({ headless: 'new', args: ['--no-sandbox','--disable-setuid-sandbox'] });
const page    = await browser.newPage();
await page.setViewport({ width: 1440, height: 900, deviceScaleFactor: 1.5 });
await page.goto(url, { waitUntil: 'networkidle0', timeout: 30000 });
await new Promise(r => setTimeout(r, 1500));
if (scrollY > 0) await page.evaluate(y => window.scrollTo(0, y), scrollY);
await new Promise(r => setTimeout(r, 600));
await page.screenshot({ path: file, fullPage: false });
await browser.close();
console.log('Saved:', file);
