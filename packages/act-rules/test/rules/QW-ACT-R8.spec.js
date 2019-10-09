const {
  configure,
  executeACTR
} = require('../../dist/index');
const {
  getDom
} = require('@qualweb/get-dom-puppeteer');
const { expect } = require('chai');

describe('Rule QW-ACT-R8', function () {

  const tests = [
    {
      url: 'https://act-rules.github.io/testcases/9eb3f6/cfff293d583d51b90968a15ff490738f20b2f3e3.html',
      outcome: 'passed'
    },
    {
      url: 'https://act-rules.github.io/testcases/9eb3f6/b59a4f8e74efb991834ccca17073145e005dd4df.html',
      outcome: 'passed'
    },
    {
      url: 'https://act-rules.github.io/testcases/9eb3f6/a95117f337e44cf426c3c5c4660b44ac8a29e6be.html',
      outcome: 'failed'
    },
    {
      url: 'https://act-rules.github.io/testcases/9eb3f6/ca6974e4e54a97ad7229a0f71755676cf2181a91.html',
      outcome: 'failed'
    },
    {
      url: 'https://act-rules.github.io/testcases/9eb3f6/2c2d8b081bc8908ee21605c2aa420a9e90a39307.html',
      outcome: 'inapplicable'
    },
    {
      url: 'https://act-rules.github.io/testcases/9eb3f6/f9b9dad23c0ad60bef126ac4bba8a01b17a2d42f.html',
      outcome: 'inapplicable'
    },
    {
      url: 'https://act-rules.github.io/testcases/9eb3f6/6e2edec42ae47953bf4281cbd9dc86e63107d36e.html',
      outcome: 'inapplicable'
    },
    {
      url: 'https://act-rules.github.io/testcases/9eb3f6/f1b3be194f69c6f222f53cfd46cad299d94c8445.html',
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
        configure({ rules: ['QW-ACT-R8'] });
        const report = await executeACTR(source.html.parsed, processed.html.parsed);
        expect(report.rules['QW-ACT-R8'].metadata.outcome).to.be.equal(test.outcome);
      });
    });
  }
});
