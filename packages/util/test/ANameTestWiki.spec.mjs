// import AccessibilityUtils from '../dist/util.bundle.js';

import { expect } from 'chai';
import { usePuppeteer } from './util.mjs';
import { Dom } from '@qualweb/dom';

import { createRequire } from 'node:module';

const require = createRequire(import.meta.url);

describe('ANameTestWiki', function () {
  const proxy = usePuppeteer();

  // This test relies on calling AccessibilityUtils.getAccessibleName. I think
  // the function itself must be used from within a browser context, although we
  // could probably import it specifically if we converted the unit tests to
  // TypeScript (so they can import original source files).
  it('getAccessibleName', async function () {
    this.timeout(10 * 100000000);

    let url = " https://www.accessibility.nl/wai-tools/validation-test-sites/low-fare-calendar-sas/"//"https://www.accessibility.nl/wai-tools/validation-test-sites/wikipedia-wikipedia/";

    const dom = new Dom(proxy.page);

    await dom.process({}, url);

    await proxy.page.addScriptTag({
      path: require.resolve('@qualweb/qw-page')
    });

    await proxy.page.addScriptTag({
      path: require.resolve('../dist/util.bundle.js')
    });

    let links = await proxy.page.$$("a");
    let aNameList=[];
    let aName;

    console.debug(links);
    
    for (let link of links) {
      aName =await await AccessibilityUtils.getAccessibleName(link, proxy.page);
      aNameList.push(aName);
    }
    
    // console.log(aNameList);
    
    expect("").to.be.equal('');
  });
});