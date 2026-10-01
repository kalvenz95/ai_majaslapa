import { createRequire } from 'module';
const require = createRequire(import.meta.url);
const puppeteer = require('puppeteer');
const browser = await puppeteer.launch({ headless: 'new', args: ['--no-sandbox'] });
const page = await browser.newPage();
const reqs = [];
page.on('response', r => { const u = r.url(); if (u.includes('fontshare') || u.includes('.woff') || u.includes('cdn.fontshare')) reqs.push(`${r.status()} ${u.slice(0,110)}`); });
await page.goto('http://localhost:3000/lv', { waitUntil: 'networkidle0', timeout: 45000 });
const widths = await page.evaluate(() => {
  const mk = (fam) => {
    const el = document.createElement('span');
    el.style.cssText = `position:absolute;visibility:hidden;font:600 64px ${fam};white-space:nowrap`;
    el.textContent = 'Riepniecība AGRX';
    document.body.appendChild(el);
    const w = el.getBoundingClientRect().width;
    el.remove();
    return w;
  };
  return { generalSans: mk('"General Sans"'), interTight: mk('"Inter Tight"'), serif: mk('serif') };
});
console.log("font requests:", reqs.length ? reqs : "NONE");
console.log("widths:", JSON.stringify(widths));
await browser.close();
