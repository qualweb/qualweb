import { expect } from 'chai';
import { usePuppeteer } from './util';

describe('ANameSVGTest', function () {
  const proxy = usePuppeteer();

  // What is this test *really* supposed to check? Currently, it injects code
  // from inject.js, which in turn runs AccessibilityUtils.getAccessibleNameSVG
  // for all SVG elements on the page. Is this purely to test execution of
  // injected code?
  it('Should correctly run injected code (inject.js)', function (done) {
    this.timeout(0);

    const { page } = proxy;

    Promise.all([
      page.addScriptTag({
        path: require.resolve('@qualweb/qw-page')
      }),
  
      page.addScriptTag({
        path: require.resolve('../dist/util.bundle.js')
      }),
  
      page.addScriptTag({
        path: require.resolve('./fixtures/inject.js')
      }),
    ]).catch((err) => {
      expect.fail(err);
    }).then(() => {
      done();
    });
  });
});
