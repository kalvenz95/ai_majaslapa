import { createRequire } from 'module';
import { readdirSync } from 'fs';
const require = createRequire(import.meta.url);
const puppeteer = require('puppeteer');
const dir = 'd:/Documents/Desktop/AI_APP/temporary screenshots';
let n = readdirSync(dir).filter(f => f.endsWith('.png')).length;
const b = await puppeteer.launch({ headless: 'new', args: ['--no-sandbox','--disable-setuid-sandbox'] });
const p = await b.newPage();
await p.setViewport({ width: 390, height: 844, deviceScaleFactor: 2, isMobile: true, hasTouch: true });
await p.goto('http://localhost:3000/lv', { waitUntil: 'networkidle0', timeout: 60000 });
const y = await p.evaluate(() => { const e = document.getElementById('about'); return e.getBoundingClientRect().top + window.scrollY; });
for (const [i,off] of [600,1300].entries()) {
  await p.evaluate(yy => window.scrollTo({ top: yy, behavior: 'instant' }), y+off);
  await new Promise(r => setTimeout(r, 900));
  n++; const f = dir + '/screenshot-' + n + '-whyai-mob' + i + '.png';
  await p.screenshot({ path: f }); console.log(f);
}
await b.close();
