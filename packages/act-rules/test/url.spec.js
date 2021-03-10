import { expect } from 'chai';
import puppeteer from 'puppeteer';
import { Dom } from '@qualweb/dom';

describe('Running tests', function () {
  it('Evaluates url', async function () {
    this.timeout(100 * 1000);
    const url = 'https://act-rules.github.io/testcases/afw4f7/8edb54199f19f6b983aafe6dfd04a4710f23c3ea.html'
    const browser = await puppeteer.launch({ headless: false });
    const dom = new Dom();
    const { page } = await dom.getDOM(browser, { execute: { act: true } }, "", `<p style="color: #CCC; background: #fff;" id="p"></p>
<script>
	const shadowRoot = document.getElementById('p').attachShadow({ mode: 'open' })
	shadowRoot.innerHTML = '<span style="color: #333;">Some text in English</span>'
</script>`);

    await page.addScriptTag({
      path: require.resolve('@qualweb/qw-page')
    });

    await page.addScriptTag({
      path: require.resolve('../dist/act.js')
    });
    
    const report = await page.evaluate(() => {
      const actRules = new ACTRules.ACTRules({ rules: ['QW-ACT-R37'] });
      return actRules.execute([], new QWPage.QWPage(document, window, true));
    });
    console.log(JSON.stringify(report, null, 2))
    expect(report);
  });
});