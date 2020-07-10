import { Dom } from '@qualweb/dom';

describe('QualWeb page', function() {
  it('Testing qualweb page evaluation', async function() {
    this.timeout(1000 * 1000);
    const browser = await puppeteer.connect({ browserURL: 'http://127.0.0.1:9222/', defaultViewport: null });

    const dom = new Dom(browser);

    const { page } = dom.getDOM(browser, { viewport: null }, 'http://accessible-serv.lasige.di.fc.ul.pt/~jvicente/test2/');

    await page.addScriptTag({
      path: require.resolve('@qualweb/qw-page').replace('index.js', 'qwPage.js')
    });

    await page.evaluate(() => {
      
    });
  });
});