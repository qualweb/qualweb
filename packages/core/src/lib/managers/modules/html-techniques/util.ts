'use strict';

const puppeteer = require('puppeteer');

async function getNumberOfOpenPages(url: string) {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto(url, { 'waitUntil': 'networkidle0', timeout: 5000 });
  let pages = await browser.pages();
  await browser.close();
  return pages.length-1;
}

async function isFocusableBrowser(url: string, selector: string) {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto(url, { 'waitUntil': 'networkidle0', timeout: 60000 });
  await page.focus(selector);
  const hrefElement = await page.$(selector);

  let options = {
    root:hrefElement
  }

  const snapshot = await page.accessibility.snapshot(options);
 
  await browser.close();

  return snapshot &&  snapshot.focused!== undefined;
}
/*
function findFocusedNode(node,i:string) {
  let l = 0;
  if (node.focused)
    return i+l;
  for (const child of node.children || []) {
    console.log(child);
    const foundNode = findFocusedNode(child,);
    return foundNode;
  }
  return null;
}*/


export {
  getNumberOfOpenPages,
  isFocusableBrowser
};
