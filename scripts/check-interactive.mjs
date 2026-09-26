import puppeteer from 'puppeteer';

const browser = await puppeteer.launch({ headless: true });
const page = await browser.newPage();
await page.setViewport({ width: 1440, height: 900 });

const errors = [];
const logs = [];
page.on('console', msg => logs.push('[' + msg.type() + '] ' + msg.text()));
page.on('pageerror', err => errors.push(err.message));

await page.goto('http://localhost:3000', { waitUntil: 'networkidle2', timeout: 15000 });
await new Promise(r => setTimeout(r, 2000));

await page.evaluate(() => {
  const el = document.getElementById('tools');
  if (el) el.scrollIntoView();
});
await new Promise(r => setTimeout(r, 500));

const btnResult = await page.evaluate(() => {
  const buttons = document.querySelectorAll('#tools button');
  if (buttons.length === 0) return 'NO BUTTONS FOUND';
  buttons[0].click();
  return 'Clicked button: "' + buttons[0].textContent.trim().slice(0, 50) + '"';
});

await new Promise(r => setTimeout(r, 500));

const accordionState = await page.evaluate(() => {
  const divs = document.querySelectorAll('#tools [style*="max-height"]');
  if (divs.length === 0) return 'NO ANIMATED DIVS FOUND';
  return Array.from(divs).map(d => 'maxHeight: ' + d.style.maxHeight).join(', ');
});

console.log('Button click result:', btnResult);
console.log('Accordion state:', accordionState);
console.log('\nErrors:', errors.length ? errors.join('\n') : 'NONE');
const relevant = logs.filter(l => l.toLowerCase().includes('error') || l.includes('Warning') || l.includes('hydrat'));
console.log('\nRelevant logs:', relevant.length ? relevant.join('\n') : 'none');

await browser.close();
