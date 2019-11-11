'use strict';

const puppeteer = require('puppeteer');

async function getAccessibleNameSVG(url: string, selector: string) {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto(url, {'waitUntil': 'networkidle0', timeout: 60000});
  const hrefElement = await page.$(selector);

  let options = {
    root: hrefElement
  }

  const snapshot = await page.accessibility.snapshot(options);
  let result;

  if (snapshot && snapshot.name)
    result = snapshot.name;
  
  browser.close();

  return result;
}

export = getAccessibleNameSVG;
