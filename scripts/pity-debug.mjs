import { createRequire } from 'module';
const require = createRequire(import.meta.url);
const puppeteer = require('puppeteer');
const browser = await puppeteer.launch({ headless: 'new', args: ['--no-sandbox','--disable-setuid-sandbox'] });
const page = await browser.newPage();
await page.setViewport({ width: 1440, height: 900, deviceScaleFactor: 1 });
await page.goto('http://localhost:3000/pity-store-site/index.html', { waitUntil: 'networkidle0', timeout: 40000 });
await page.evaluate(() => window.scrollTo({ top: 1150, behavior: 'instant' }));
await new Promise(r => setTimeout(r, 1200));
const info = await page.evaluate(() => {
  const img = document.querySelector('img[data-replace="about-image"]');
  const cs = getComputedStyle(img);
  const r = img.getBoundingClientRect();
  return {
    hasVisible: img.classList.contains('visible'),
    clipPath: cs.clipPath,
    natural: img.naturalWidth + 'x' + img.naturalHeight,
    rect: Math.round(r.width) + 'x' + Math.round(r.height) + ' @ top=' + Math.round(r.top),
    src: img.currentSrc.slice(0, 70)
  };
});
console.log(JSON.stringify(info, null, 2));
await browser.close();
