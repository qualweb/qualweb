import playwright from 'playwright';

describe('QualWeb page', function() {
  it('Testing css rules mapping', async function() {
    this.timeout(1000 * 1000);
    //const browser = await playwright['chromium'].connect({ browserURL: 'http://127.0.0.1:9222/', defaultViewport: null });

    const browser = await playwright.chromium.launch();
    const context = await browser.newContext({ userAgent: 'chromium' });
    const page = await context.newPage({
      bypassCSP: true
    });

    await page.goto('https://www.pcdiga.com/', {
      timeout: 0,
      waitUntil: 'networkidle'
    });

    await page.addScriptTag({
      path: require.resolve('../dist/qwPage.js')
    });

    await page.evaluate(() => {
      // @ts-ignore
      const page = new QWPage.QWPage(document, window, true);
    });

    await page.evaluate(() => {
      //console.log(page);
      //new QWPage.QWPage(document, window, true);
    });

    await page.close();
    await browser.close();
  });
});