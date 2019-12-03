const {
  configure,
  executeACTR
} = require('../../dist/index');
const {
  getDom
} = require('@qualweb/get-dom-puppeteer');
const { expect } = require('chai');
const puppeteer = require('puppeteer');
const {
  getDom
} = require('../getDom');


describe('Rule QW-ACT-R10', function () {

  const tests = [
    {
      url:'https://act-rules.github.io/testcases/4b1c6c/0d9ecd85172bbc610f6b3f6044ecc7abcf0dd4a9.html',
      outcome: 'passed'
    },
    {
      url:'https://act-rules.github.io/testcases/4b1c6c/42ecf2e3877c617b7cca23e66128667097b10615.html',
      outcome: 'passed'
    },
    {
      url:'https://act-rules.github.io/testcases/4b1c6c/50e2f7fe6d14508b23d12fc459a17e1727a5ee35.html',
      outcome: 'passed'
    },
    {
      url:'https://act-rules.github.io/testcases/4b1c6c/e05deb9fec0f9d9248cdd82f48a93444b5b01a6b.html',
      outcome: 'warning'
    },
    {
      url:'https://act-rules.github.io/testcases/4b1c6c/9b72ae9993b01aff166269587ddab682eda83968.html',
      outcome: 'passed'
    },
    {
      url:'https://act-rules.github.io/testcases/4b1c6c/4087ebdab0b5a49bb6ab4dcdc797f9883fab45cf.html',
      outcome: 'passed'
    },
    {
      url:'https://act-rules.github.io/testcases/4b1c6c/8d8853da7cc4c5edba3c7c01ca2902b6d63bb0e5.html',
      outcome: 'warning'
    },
    {
      url:'https://act-rules.github.io/testcases/4b1c6c/903659b4e50a42b17c6e31e10956fb500ab226a5.html',
      outcome: 'warning'
    },
    {
      url:'https://act-rules.github.io/testcases/4b1c6c/f219492e558617a2f90e9175241d0db999b409d6.html',
      outcome: 'warning'
    },
    {
      url:'https://act-rules.github.io/testcases/4b1c6c/85f3a632257d9636048a9cdc7b743b3f197b045f.html',
      outcome: 'warning'
    },
    {
      url:'https://act-rules.github.io/testcases/4b1c6c/43cbfc7d60b68f61f97603db6e9235a8ffa1a57a.html',
      outcome: 'warning'
    },
    {
      url:'https://act-rules.github.io/testcases/4b1c6c/9e367d5040f04daf2a290dacd08ae064b0660a09.html',
      outcome: 'inapplicable'
    },
    {
      url:'https://act-rules.github.io/testcases/4b1c6c/0555a0ff603c5fd088bf86faf1fa8f1168ae4959.html',
      outcome: 'inapplicable'
    },
    {
      url:'https://act-rules.github.io/testcases/4b1c6c/2567d269e621304c3387272a1570e3c3cba63e50.html',
      outcome: 'inapplicable'
    },
    {
      url:'https://act-rules.github.io/testcases/4b1c6c/a66d585c8509f682c134c01ab5a289d441dee083.html',
      outcome: 'inapplicable'
    },
    {
      url:'https://act-rules.github.io/testcases/4b1c6c/4a84cbdab2950ef543b179b7e9242cfef2342877.html',
      outcome: 'inapplicable'
    },
    {
      url:'https://act-rules.github.io/testcases/4b1c6c/a3d6f56f0c388cad7192425a824e5dd9a87edb00.html',
      outcome: 'inapplicable'
    },
    {
      url:'https://act-rules.github.io/testcases/4b1c6c/26f7c515afc63a486eaeebb6fe109f545892cd32.html',
      outcome: 'inapplicable'
    },
    {
      url:'https://act-rules.github.io/testcases/4b1c6c/8d845213abc0081ac5685e72adb78663539b4009.html',
      outcome: 'inapplicable'
    },
    {
      url:'https://act-rules.github.io/testcases/4b1c6c/b9a511b23e547d7a6e276b95ff42992dc31f23bb.html',
      outcome: 'inapplicable'
    },
    {
      url:'https://act-rules.github.io/testcases/4b1c6c/b20b4c1fbf9161bf474d6425bf9296940db4310e.html',
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
        const browser = await puppeteer.launch();
        const { sourceHtml, page, stylesheets } = await getDom(browser,test.url);
        configure({ rules: ['QW-ACT-R10'] });
        const report = await executeACTR(sourceHtml, page, stylesheets );
        await browser.close();
        expect(report.rules['QW-ACT-R10'].metadata.outcome).to.be.equal(test.outcome);
      });
    });
  }
});
