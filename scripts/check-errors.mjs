import puppeteer from 'puppeteer';

const browser = await puppeteer.launch({ headless: true });
const page = await browser.newPage();
await page.setViewport({ width: 1440, height: 900 });

const networkErrors = [];
const consoleErrors = [];

page.on('response', resp => {
  if (resp.status() >= 400) networkErrors.push(resp.status() + ' ' + resp.url());
});
page.on('console', msg => {
  if (msg.type() === 'error') consoleErrors.push(msg.text());
});
page.on('pageerror', err => consoleErrors.push('PAGEERROR: ' + err.message));

await page.goto('http://localhost:3000', { waitUntil: 'networkidle2', timeout: 15000 });
await new Promise(r => setTimeout(r, 3000));

console.log('Network 4xx/5xx errors:');
networkErrors.forEach(e => console.log(' ', e));
console.log('\nConsole errors:');
consoleErrors.forEach(e => console.log(' ', e));

await browser.close();
