import puppeteer from 'puppeteer';

export async function launchBrowser() {
  const args = [];

  if (process.env.CI)
    args.push('--no-sandbox');

  return await puppeteer.launch({
    headless: process.env.TEST_PUPPETEER_HEADLESS == false || true,
    args,
  });
}