const puppeteer = require('puppeteer');

describe('QualWeb page', function() {
  it('Testing css rules mapping', async function() {
    this.timeout(1000 * 1000);
    const browser = await puppeteer.connect({ browserURL: 'http://127.0.0.1:9222/', defaultViewport: null });

    //const browser = await puppeteer.launch({headless:false});
    const page = await browser.newPage({
      bypassCSP: true
    });

    await page.goto('https://act-rules.github.io/testcases/24afc2/74d8b65bddd2568319787ffcf1e80635ddcfaa58.html', {
      timeout: 0,
      waitUntil: 'networkidle2'
    });

    await page.addScriptTag({
      path: require.resolve('../dist/qwPage.js')
    });

    await page.evaluate(() => {
      // @ts-ignore
      window.page = new QWPage.QWPage(document, window, true);
    });

    await page.evaluate(() => {
      console.log(window.page);
      //new QWPage.QWPage(document, window, true);
    });

    //await page.close();
    //await browser.close();
  });
});