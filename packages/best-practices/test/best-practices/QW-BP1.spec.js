const { executeBestPractices } = require('../../dist/index');
const { expect } = require('chai');
const { getDom } = require('@qualweb/get-dom-puppeteer');

describe('Technique QW-BP1', function () {
  const tests = [
    {
      url: 'http://accessible-serv.lasige.di.fc.ul.pt/~bandrade/h42/warning1.html',
      outcome: 'warning'
    },
    {
      url: 'http://accessible-serv.lasige.di.fc.ul.pt/~bandrade/h42/failed1.html',
      outcome: 'failed'
    }
  ];

  let i = 0;
  let lastOutcome = 'warning';
  for (const test of tests || []) {
    if (test.outcome !== lastOutcome) {
      lastOutcome = test.outcome;
      i = 0;
    }
    i++;
    describe(`${test.outcome.charAt(0).toUpperCase() + test.outcome.slice(1)} example ${i}`, function () {
      it(`should have outcome="${test.outcome}"`, async function () {
        this.timeout(10 * 1000);
        const { source, processed } = await getDom(test.url);

        const report = await executeBestPractices(source.html.parsed, processed.html.parsed);
        expect(report['best-practices']['QW-BP1'].metadata.outcome).to.be.equal(test.outcome);
      });
    });
  }
});