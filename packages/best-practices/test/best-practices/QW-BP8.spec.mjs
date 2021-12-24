import { expect } from 'chai';
import puppeteer from 'puppeteer';
import { Dom } from '@qualweb/dom';
import locales from '@qualweb/locale';
import { createRequire } from 'module';
const require = createRequire(import.meta.url);

describe('Best Practice QW-BP8', function () {
  const tests = [
    /*{
      url: 'http://accessible-serv.lasige.di.fc.ul.pt/~bandrade/bp8/headingWithText.html',
      outcome: 'inapplicable'
    } ,
    {
      url: 'http://accessible-serv.lasige.di.fc.ul.pt/~bandrade/bp8/headingWithoutText.html',
      outcome: 'inapplicable'
    },
    {
      url: 'http://accessible-serv.lasige.di.fc.ul.pt/~bandrade/bp8/headingWithImageWithText.html',
      outcome: 'passed'
    },
    {
      url: 'http://accessible-serv.lasige.di.fc.ul.pt/~bandrade/bp8/headingWithImageWithAltWithText.html',
      outcome: 'passed'
    },
    {
      url: 'http://accessible-serv.lasige.di.fc.ul.pt/~bandrade/bp8/headingWithImageWithAlt.html',
      outcome: 'passed'
    },
    {
      url: 'http://accessible-serv.lasige.di.fc.ul.pt/~bandrade/bp8/headingWithImagesAlts.html',
      outcome: 'passed'
    },
    {
      url: 'http://accessible-serv.lasige.di.fc.ul.pt/~bandrade/bp8/headingWithImagesAltAndNoAlt.html',
      outcome: 'passed'
    },
    {
      url: 'http://accessible-serv.lasige.di.fc.ul.pt/~bandrade/bp8/svgWithAccessibleName.html',
      outcome: 'passed'
    },
    {
      url: 'http://accessible-serv.lasige.di.fc.ul.pt/~bandrade/bp8/headingWithImageWithoutText.html',
      outcome: 'failed'
    },*/
    {
      url: 'http://accessible-serv.lasige.di.fc.ul.pt/~bandrade/bp8/svgWithoutAccessibleName.html',
      outcome: 'failed'
    }
  ];

  let browser = null;
  let incognito = null;

  it('Starting test bench', async function () {
    this.timeout(0);
    browser = await puppeteer.launch({ headless: false });
    incognito = await browser.createIncognitoBrowserContext();

    describe('Running tests', function () {
      tests.forEach(function (test) {
        it('Testing', async function () {
          this.timeout(0);

          const page = await incognito.newPage();
          try {
            const dom = new Dom(page);
            await dom.process(
              {
                execute: { bp: true },
                'best-practices': {
                  bestPractices: ['QW-BP8']
                }
              },
              '',
              `
                <html>
                  <head></head>
                  <body>
                    <h1>
                      <p id="ola" style="visibility: hidden;">ola</p>
                      <span>
                        <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink%22%3E">
                        </svg>
                      </span>
                      <p>
                        <svg viewBox="0 0 100 100" aria-labelledby="ola" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink%22%3E">
                        </svg>
                      </p>
                    </h1>
                  </body>
                </html>
              `
            );

            await page.addScriptTag({
              path: require.resolve('@qualweb/qw-page')
            });

            await page.addScriptTag({
              path: require.resolve('@qualweb/util')
            });

            await page.addScriptTag({
              path: require.resolve('../../dist/bp.bundle.js')
            });

            const report = await page.evaluate(
              (locale, options) => {
                const bp = new BestPractices({ translate: locale, fallback: locale }, options);
                return bp.execute();
              },
              locales.default.en,
              { bestPractices: ['QW-BP8'] }
            );

            console.log(JSON.stringify(report, null, 2));
            expect(report.assertions['QW-BP8'].metadata.outcome).to.be.equal(test.outcome);
          } finally {
            //await page.close();
          }
        });
      });
    });

    describe(`Closing test bench`, async function () {
      it(`Closed`, async function () {
        if (incognito) {
          //await incognito.close();
        }
        if (browser) {
          //await browser.close();
        }
      });
    });
  });
});
