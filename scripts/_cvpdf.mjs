import { createRequire } from 'module';
const require = createRequire(import.meta.url);
const puppeteer = require('puppeteer');

const url = 'http://localhost:3000/cv-kalvis-zeibots.html';
const out = 'd:/Documents/Desktop/AI_APP/CV-Kalvis-Zeibots.pdf';

const browser = await puppeteer.launch({ headless: 'new', args: ['--no-sandbox','--disable-setuid-sandbox'] });
const page = await browser.newPage();
await page.emulateMediaType('screen');      // keep dark on-screen styles, not @media print
await page.goto(url, { waitUntil: 'networkidle0', timeout: 30000 });
// Fit the A4 page exactly: drop body padding, full-bleed dark .page
await page.addStyleTag({ content: `
  @page { size: A4; margin: 0; }
  html, body { background: #2b2b2b !important; padding: 0 !important; }
  .page { border: none !important; width: 100% !important; min-height: 297mm !important; }
` });
await new Promise(r => setTimeout(r, 600));
await page.pdf({
  path: out,
  format: 'A4',
  printBackground: true,
  margin: { top: '0', right: '0', bottom: '0', left: '0' },
});
await browser.close();
console.log('Saved:', out);
