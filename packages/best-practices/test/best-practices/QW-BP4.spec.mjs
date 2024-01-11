import { buildTest } from './test_template.mjs';

buildTest('QW-BP4', [
  {
    // url: 'http://accessible-serv.lasige.di.fc.ul.pt/~bandrade/bp4/failed.html',
    path: '../fixtures/~bandrade/bp4/failed.html',
    outcome: 'failed'
  },
  {
    // url: 'http://accessible-serv.lasige.di.fc.ul.pt/~bandrade/bp4/failed2.html',
    path: '../fixtures/~bandrade/bp4/failed2.html',
    outcome: 'failed'
  },
  {
    // url: 'http://accessible-serv.lasige.di.fc.ul.pt/~bandrade/bp4/failed3.html',
    path: '../fixtures/~bandrade/bp4/failed3.html',
    outcome: 'failed'
  },
  {
    // url: 'http://accessible-serv.lasige.di.fc.ul.pt/~bandrade/bp4/failed4.html',
    path: '../fixtures/~bandrade/bp4/failed4.html',
    outcome: 'failed'
  },
  {
    // url: 'http://accessible-serv.lasige.di.fc.ul.pt/~bandrade/bp4/inapplicable.html',
    path: '../fixtures/~bandrade/bp4/inapplicable.html',
    outcome: 'inapplicable'
  }
]);

// const { BestPractices } = require('../../dist/index');
// const { expect } = require('chai');
// const puppeteer = require('puppeteer');
// const { getDom } = require('@qualweb/dom');
// import { createRequire } from 'module';
// const require = createRequire(import.meta.url);

// describe('Best Practice QW-BP4', function () {
//   const tests = [
//     {
//       url: 'http://accessible-serv.lasige.di.fc.ul.pt/~bandrade/bp4/failed.html',
//       outcome: 'failed'
//     },
//     {
//       url: 'http://accessible-serv.lasige.di.fc.ul.pt/~bandrade/bp4/failed2.html',
//       outcome: 'failed'
//     },
//     {
//       url: 'http://accessible-serv.lasige.di.fc.ul.pt/~bandrade/bp4/failed3.html',
//       outcome: 'failed'
//     },
//     {
//       url: 'http://accessible-serv.lasige.di.fc.ul.pt/~bandrade/bp4/failed4.html',
//       outcome: 'failed'
//     },
//     {
//       url: 'http://accessible-serv.lasige.di.fc.ul.pt/~bandrade/bp4/inapplicable.html',
//       outcome: 'inapplicable'
//     }
//   ];
//   let browser;
//   it('pup open', async function () {
//     browser = await puppeteer.launch();
//   });
//   let i = 0;
//   let lastOutcome = 'warning';
//   for (const test of tests || []) {
//     if (test.outcome !== lastOutcome) {
//       lastOutcome = test.outcome;
//       i = 0;
//     }
//     i++;
//     describe(`${test.outcome.charAt(0).toUpperCase() + test.outcome.slice(1)} example ${i}`, function () {
//       it(`should have outcome="${test.outcome}"`, async function () {
//         this.timeout(10 * 1000);
//         const { sourceHtml, page, stylesheets } = await getDom(browser, test.url);
//         await page.addScriptTag({
//           path: require.resolve('@qualweb/qw-page').replace('index.js', 'qwPage.js')
//         });
//         await page.addScriptTag({
//           path: require.resolve('../../dist/bp.js')
//         });
//         const report = await page.evaluate(
//           (rules) => {
//             const bp = new BestPractices.BestPractices(rules);
//             let report = bp.execute(new QWPage.QWPage(document, window));
//             return report;
//           },
//           { bestPractices: ['QW-BP4'] }
//         );

//         expect(report['assertions']['QW-BP4'].metadata.outcome).to.be.equal(test.outcome);
//       });
//     });
//   }
//   describe(``, function () {
//     it(`pup shutdown`, async function () {
//       await browser.close();
//     });
//   });
// });
