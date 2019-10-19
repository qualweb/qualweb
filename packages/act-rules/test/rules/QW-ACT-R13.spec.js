const {
  configure,
  executeACTR
} = require('../../dist/index');
const {
  getDom
} = require('@qualweb/get-dom-puppeteer');
const { expect } = require('chai');

describe('Rule QW-ACT-R13', function () {

  const tests = [
    {
      url: 'https://act-rules.github.io/testcases/6cfa84/031ce334e0405bc42f3028964a8f1d94b0c06afc.html',
      outcome: 'passed'
    },
    {
      url: 'https://act-rules.github.io/testcases/6cfa84/da5e04b7672db2b6d31cada644bb1f64e925456d.html',
      outcome: 'passed'
    },
    {
      url: 'https://act-rules.github.io/testcases/6cfa84/f2314113af607a4c18bc36185e7ae59e8c0f5b68.html',
      outcome: 'passed'
    },
    {
      url: 'https://act-rules.github.io/testcases/6cfa84/4c9a75a7f2fa6f4b5eaa55e93d9d5638b34f6575.html',
      outcome: 'passed'
    },
    {
      url: 'https://act-rules.github.io/testcases/6cfa84/30d2fd76fac324265b6c5059972630ddf3131022.html',
      outcome: 'passed'
    },
    {
      url: 'https://act-rules.github.io/testcases/6cfa84/78ab7e01e487828a19c59119308ab400ba598153.html',
      outcome: 'passed'
    },

    {
      url: 'https://act-rules.github.io/testcases/6cfa84/9fce299a6ff222196867bda8ce1479b42eac4607.html',
      outcome: 'failed'
    },
    {
      url: 'https://act-rules.github.io/testcases/6cfa84/ba7c8fac5b065a5f0662b886e51ddf62c7ffdcba.html',
      outcome: 'failed'
    },
    {
      url: 'https://act-rules.github.io/testcases/6cfa84/43ad8b0f5df88f9c17bae00ddd52dbb56871b993.html',
      outcome: 'failed'
    },
    {
      url: 'https://act-rules.github.io/testcases/6cfa84/67784ff95d4fd496d9e2139cf855b3bfab19fb49.html',
      outcome: 'failed'
    },
    {
      url: 'https://act-rules.github.io/testcases/6cfa84/cecb4c0a9872981475d4240e1e0e00fd72130432.html',
      outcome: 'failed'
    },

    {
      url: 'https://act-rules.github.io/testcases/6cfa84/69bdf98fd12aeb0a2608112a8f5d9c76dbe75aa9.html',
      outcome: 'inapplicable'
    },
    {
      url: 'https://act-rules.github.io/testcases/6cfa84/5fb4319a6f555f90dd42ae45be96ee85ca5523c3.html',
      outcome: 'inapplicable'
    },
    {
      url: 'https://act-rules.github.io/testcases/6cfa84/83e4a31694a45ef604060a365dff22c38ef307c0.html',
      outcome: 'inapplicable'
    }
  ];

  let i = 0;
  let lastOutcome = 'passed';
  for (const test of tests || []) {
    if (test.outcome !== lastOutcome) {
      lastOutcome = test.outcome;
      i = 0;
    }
    i++;
    describe(`${test.outcome.charAt(0).toUpperCase() + test.outcome.slice(1)} example ${i}`, function () {
      it(`should have outcome="${test.outcome}"`, async function () {
        this.timeout(10 * 1000);
        const { source, processed, stylesheets } = await getDom(test.url);
        configure({ rules: ['QW-ACT-R13'] });
        const report = await executeACTR(test.url, source.html.parsed, processed.html.parsed, stylesheets);
        expect(report.rules['QW-ACT-R13'].metadata.outcome).to.be.equal(test.outcome);
      });
    });
  }
});
