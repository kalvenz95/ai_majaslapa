import { createRequire } from 'module';
const require = createRequire(import.meta.url);
const puppeteer = require('puppeteer');
const dir = 'd:/Documents/Desktop/AI_APP/temporary screenshots';
const b = await puppeteer.launch({ headless:'new', args:['--no-sandbox'] });
const p = await b.newPage();
const errs=[]; p.on('pageerror',e=>errs.push(String(e)));
await p.setViewport({ width:1440, height:1000, deviceScaleFactor:1.25 });
await p.goto('http://localhost:3001/lv',{waitUntil:'networkidle0',timeout:90000});
await new Promise(x=>setTimeout(x,1200));
await p.evaluate(()=>{ const el=document.getElementById('paraugi'); if(el) el.scrollIntoView(); });
await new Promise(x=>setTimeout(x,800));
// scroll to voice section bottom
await p.evaluate(()=>window.scrollBy(0, 1100));
await new Promise(x=>setTimeout(x,800));
await p.screenshot({ path: `${dir}/showcase-upload.png` });
await b.close();
console.log('errors:', errs.length, errs.slice(0,2).join(' | '));
