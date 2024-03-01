import puppeteer, { Page, ScreenshotClip, ScreenshotOptions } from 'puppeteer';

export async function launchBrowser() {
  const args = [];

  if (process.env.CI) args.push('--no-sandbox');

  return await puppeteer.launch({
    headless: process.env.TEST_PUPPETEER_HEADLESS?.toLowerCase() === 'false' || 'new',
    args
  });
}

export async function processForR62(page: Page) {
  // get selectors of all elements that are part of the sequential focus navigation
  const selectors: string[] = await page.evaluate(() => {
    const selectors: string[] = [];
    const elements = window.qwPage.getElements('*');
    for (const elem of elements ?? []) {
      if (window.AccessibilityUtils.isPartOfSequentialFocusNavigation(elem)) {
        selectors.push(elem.getElementSelector());
      }
    }
    return selectors;
  });
  const extraMargin = 30;
  const body = await page.$('body');
  for (const selector of selectors) {
    // get the bounding box of the element
    const el = await page.$(selector);
    if (el === null) {
      process.stdout.write('.');
      continue;
    }
    await page.waitForSelector(selector);
    const rect = await el.boundingBox();
    if (rect === null) {
      continue;
    }
    // increase the bounding box to take a screenshot
    const screenClip: ScreenshotClip = {
      x: rect.x - extraMargin,
      y: rect.y - extraMargin,
      width: rect.width + extraMargin * 2,
      height: rect.height + extraMargin * 2
    };
    const options: ScreenshotOptions = {
      clip: screenClip,
      type: 'webp',
      quality: 0,
      optimizeForSpeed: true
    };
    // take a screenshot of the element
    const originalScreenshot = await page.screenshot(options);
    // focus the element
    el.focus();
    // take another screenshot of the element
    const focusedScreenshot = await page.screenshot(options);
    body?.focus();
    // compare the screenshots
    const diff = originalScreenshot.compare(focusedScreenshot) === 0 ? 'false' : 'true';
    await page.evaluate(
      (selector, diff) => {
        const elem = window.qwPage.getElement(selector)!;
        elem.setElementAttribute('data-qw-act-r62', diff);
      },
      selector,
      diff
    );
  }
}
