const {
  configure,
  executeACTR
} = require('../../dist/index');
const {
  getDom
} = require('@qualweb/get-dom-puppeteer');
const { expect } = require('chai');

describe('Rule QW-ACT-R11', function () {

  const tests = [
    {
      url: 'https://act-rules.github.io/testcases/97a4e1/3f1791e11d02c11f950a13172fc1c03d9e84f7cf.html',
      outcome: 'passed'
    },
    {
      url: 'https://act-rules.github.io/testcases/97a4e1/d408cca4ab3468dde1dec3fb48e51c508cbb70d7.html',
      outcome: 'passed'
    },
    {
      url: 'https://act-rules.github.io/testcases/97a4e1/104a9256c8e8b0752c43ae0821daf92c18781ce8.html',
      outcome: 'passed'
    },
    {
      url: 'https://act-rules.github.io/testcases/97a4e1/83899857cdc304726341cea593e3f72efc7e22ee.html',
      outcome: 'passed'
    },
    {
      url: 'https://act-rules.github.io/testcases/97a4e1/064ac1119c78804ee67d6fc4001b86279675466f.html',
      outcome: 'passed'
    },
    {
      url: 'https://act-rules.github.io/testcases/97a4e1/46ceea6d3ce5a938db807802a3cd8914ce154c14.html',
      outcome: 'passed'
    },
    {
      url: 'https://act-rules.github.io/testcases/97a4e1/cce47b593783fb76f84de37a53cd8af0f15a889f.html',
      outcome: 'passed'
    },
    {
      url: 'https://act-rules.github.io/testcases/97a4e1/3378832ac24e2a6460efededb922a1355a1ccfba.html',
      outcome: 'passed'
    },
    {
      url: 'https://act-rules.github.io/testcases/97a4e1/9cf07b4a24c6a3e24dd6093d967599518d26846a.html',
      outcome: 'passed'
    },

    {
      url: 'https://act-rules.github.io/testcases/97a4e1/a6c40a95f261ac27993f8205d91f7f4540f91f23.html',
      outcome: 'failed'
    },
    {
      url: 'https://act-rules.github.io/testcases/97a4e1/34247af6724ee7bcdc0a71e0def98d5410e7363e.html',
      outcome: 'failed'
    },
    {
      url: 'https://act-rules.github.io/testcases/97a4e1/9cd3d7152dbd99cc60b83939ffb3003ab1a3d7de.html',
      outcome: 'failed'
    },
    {
      url: 'https://act-rules.github.io/testcases/97a4e1/8eb7978d588ab8fd27918075581699ba3ec3d57e.html',
      outcome: 'failed'
    },

    {
      url: 'https://act-rules.github.io/testcases/97a4e1/18536a16b216da886cf45842e7a16ffebf80af8c.html',
      outcome: 'inapplicable'
    },
    {
      url: 'https://act-rules.github.io/testcases/97a4e1/20901e2525d4f6c77476caacf41ec9d5c234a59a.html',
      outcome: 'inapplicable'
    },
    {
      url: 'https://act-rules.github.io/testcases/97a4e1/6cd354877d9f74fb27e250616b44abe1d70ed41e.html',
      outcome: 'inapplicable'
    },
    {
      url: 'https://act-rules.github.io/testcases/97a4e1/e34c1f2a007d5711980c45f6051a3f2e52b66847.html',
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
        configure({ rules: ['QW-ACT-R11'] });
        const report = await executeACTR(test.url, source.html.parsed, processed.html.parsed, stylesheets);
        expect(report.rules['QW-ACT-R11'].metadata.outcome).to.be.equal(test.outcome);
      });
    });
  }
});
