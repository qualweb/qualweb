import puppeteer from 'puppeteer';

describe('QualWeb page', function() {
  it('Testing css rules mapping', async function() {
    this.timeout(1000 * 1000);
    const browser = await puppeteer.connect({ browserURL: 'http://127.0.0.1:9222/', defaultViewport: null });

    const page = await browser.newPage();
    await page.setBypassCSP(true);

    await page.goto('https://www.accessibility.nl/wai-tools/validation-test-sites/wikipedia-wikipedia/', {
      timeout: 0,
      waitUntil: ['networkidle2', 'domcontentloaded']
    });

    await page.addScriptTag({
      path: require.resolve('../dist/qwPage.js')
    });

    await page.evaluate(() => {
      new QWPage.QWPage(document, window, true);
    });
  });
});