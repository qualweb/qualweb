const puppeteer = require('puppeteer');

describe('QualWeb page', function() {
  it('Testing css rules mapping', async function() {
    this.timeout(1000 * 1000);
    //const browser = await playwright['chromium'].connect({ browserURL: 'http://127.0.0.1:9222/', defaultViewport: null });

    const browser = await puppeteer.launch({headless:false});
    const page = await browser.newPage({
      bypassCSP: true
    });

    await page.goto('https://www.sapo.pt/', {
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
<<<<<<< HEAD
      console.log(window.page);
=======
      //console.log(page);
>>>>>>> d74fc9bfcd0677af6042c326398e2f3e32817627
      //new QWPage.QWPage(document, window, true);
    });

    await page.close();
    await browser.close();
  });
});