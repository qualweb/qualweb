const {
  configure,
  executeACTR
} = require('../../dist/index');
const {
  getDom
} = require('@qualweb/get-dom-puppeteer');
const { expect } = require('chai');

describe('Rule QW-ACT-R6', function () {

  const tests = [
    {
      url: 'https://act-rules.github.io/testcases/59796f/2400cdac870a6244889b8fccea54425320e8749f.html',
      outcome: 'passed'
    },
    {
      url: 'https://act-rules.github.io/testcases/59796f/10f5d07893139a4850d92800c6fec26424253310.html',
      outcome: 'passed'
    },
    {
      url: 'https://act-rules.github.io/testcases/59796f/48e5a8f7cb212b2f7605487e139f262545caca89.html',
      outcome: 'passed'
    },
    {
      url: 'https://act-rules.github.io/testcases/59796f/006dd89a7eeebee98ec012a2666a03844e64b01a.html',
      outcome: 'passed'
    },
    {
      url: 'https://act-rules.github.io/testcases/59796f/4d797a9fddf365ae209130e381de006becda625e.html',
      outcome: 'passed'
    },
    {
      url: 'https://act-rules.github.io/testcases/59796f/d3344a3aaf532b7ec1347568509f96cadd8d873d.html',
      outcome: 'passed'
    },
    {
      url: 'https://act-rules.github.io/testcases/59796f/b4cf33cf32e6fbe05149de31fe2ab3480f7f2319.html',
      outcome: 'failed'
    },
    {
      url: 'https://act-rules.github.io/testcases/59796f/366185c2831d044c6a9036b1cf76eb13c81d2816.html',
      outcome: 'failed'
    },
    {
      url: 'https://act-rules.github.io/testcases/59796f/ba6e135ea5b6b57b49e024d3bbb5fcfa57a54fc5.html',
      outcome: 'failed'
    },
    {
      url: 'https://act-rules.github.io/testcases/59796f/d40c0add6e960291598091cc969d69efc29038a1.html',
      outcome: 'failed'
    },
    {
      url: 'https://act-rules.github.io/testcases/59796f/d5a13c0bbfbbec0bc88d8494136fc631f0ce2eb7.html',
      outcome: 'inapplicable'
    },
    {
      url: 'https://act-rules.github.io/testcases/59796f/7c635bd92a10272be1d00dedecec994ff5e55756.html',
      outcome: 'inapplicable'
    },
    {
      url: 'https://act-rules.github.io/testcases/59796f/d9637a5b12d6333e136309db4dbbdde3cbdb8071.html',
      outcome: 'inapplicable'
    },
    {
      url: 'https://act-rules.github.io/testcases/59796f/c0efc676b15593b863c81607ae43ad9175969736.html',
      outcome: 'inapplicable'
    },
    {
      url: 'https://act-rules.github.io/testcases/59796f/79adbfb491069d70cc39446655c1815c7b765d6a.html',
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
        const { source, processed } = await getDom(test.url);
        configure({ rules: ['QW-ACT-R6'] });
        const report = await executeACTR(source.html.parsed, processed.html.parsed);
        expect(report.rules['QW-ACT-R6'].metadata.outcome).to.be.equal(test.outcome);
      });
    });
  }
});
