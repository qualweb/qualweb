const {
  configure,
  executeACTR
} = require('../../dist/index');
const {
  getDom
} = require('@qualweb/get-dom-puppeteer');
const { expect } = require('chai');

describe('Rule QW-ACT-R12', function () {

  const tests = [
    {
      url: 'https://act-rules.github.io/testcases/c487ae/d1f07599abd58fc65dfab94ae751d6563f412cae.html',
      outcome: 'passed'
    },
    {
      url: 'https://act-rules.github.io/testcases/c487ae/4a672d7fc7cd9d21cbd8ec11fd203af8fcb21c89.html',
      outcome: 'passed'
    },
    {
      url: 'https://act-rules.github.io/testcases/c487ae/8a9d4a82fefa279e535b75a6320ee9f331b45aa6.html',
      outcome: 'passed'
    },
    {
      url: 'https://act-rules.github.io/testcases/c487ae/937483d2bb5d92b57976697ac60b13a9a8c67101.html',
      outcome: 'passed'
    },
    {
      url: 'https://act-rules.github.io/testcases/c487ae/a18481a2e95e9a0faa7be86bb0ab6cf435bcf49b.html',
      outcome: 'passed'
    },
    {
      url: 'https://act-rules.github.io/testcases/c487ae/479488a7c98e91cfb6e77bb911eb46e521b053d4.html',
      outcome: 'passed'
    },
    {
      url: 'https://act-rules.github.io/testcases/c487ae/07c27fb40b99478508b3fac2274f3a30b154a57d.html',
      outcome: 'passed'
    },
    {
      url: 'https://act-rules.github.io/testcases/c487ae/1f2d5930bd9e3944e0e1c8325c254b8121db5fc6.html',
      outcome: 'passed'
    },
    {
      url: 'https://act-rules.github.io/testcases/c487ae/48f3f77aab68be7ed2ebef73206efedb4c3c44b6.html',
      outcome: 'passed'
    },
    {
      url: 'https://act-rules.github.io/testcases/c487ae/d94a2fb98a09f750a0ec50ac1acdd4c4687a93f9.html',
      outcome: 'passed'
    },
    {
      url: 'https://act-rules.github.io/testcases/c487ae/8bb73f82482912a3c75386069b0e24e64b9f0602.html',
      outcome: 'passed'
    },

    {
      url: 'https://act-rules.github.io/testcases/c487ae/b31a0c17f9acd123c31a3cd32f6aa2060e244e10.html',
      outcome: 'failed'
    },
    {
      url: 'https://act-rules.github.io/testcases/c487ae/7de512bf63013670682b30c93ed4dd2d520869cc.html',
      outcome: 'failed'
    },
    {
      url: 'https://act-rules.github.io/testcases/c487ae/0434a8c558225c9549ffc707223e648a87267483.html',
      outcome: 'failed'
    },
    {
      url: 'https://act-rules.github.io/testcases/c487ae/aa897f5c67f69e2d65d881f966a75424adad7255.html',
      outcome: 'failed'
    },
    {
      url: 'https://act-rules.github.io/testcases/c487ae/a21618f377da99e24c27b5c1b882ec8549cb62cf.html',
      outcome: 'failed'
    },
    {
      url: 'https://act-rules.github.io/testcases/c487ae/28eab2e7e33d679645bf798323064f116a833d9d.html',
      outcome: 'failed'
    },
    {
      url: 'https://act-rules.github.io/testcases/c487ae/2e95bd08250dc2132ccc18b08815f78ffa908547.html',
      outcome: 'failed'
    },
    {
      url: 'https://act-rules.github.io/testcases/c487ae/9ba871f146c5ec702a66ea812ffa8b776030c363.html',
      outcome: 'failed'
    },
    {
      url: 'https://act-rules.github.io/testcases/c487ae/480f191fa81ea7e71d6f6e441c907c6dd38195a1.html',
      outcome: 'failed'
    },
    {
      url: 'https://act-rules.github.io/testcases/c487ae/909670314cba06b98ca6d9f764ebc6cf11055da4.html',
      outcome: 'failed'
    },

    {
      url: 'https://act-rules.github.io/testcases/c487ae/b6158ffdfa9691d1d0d66020c3b68d99ed107f5b.html',
      outcome: 'inapplicable'
    },
    {
      url: 'https://act-rules.github.io/testcases/c487ae/efbc1e274198cf52f40ce2c3f44a182a5b90aa52.html',
      outcome: 'inapplicable'
    },
    {
      url: 'https://act-rules.github.io/testcases/c487ae/73382a76a584102a6a3bc0f1886d280eb8b78ce2.html',
      outcome: 'inapplicable'
    },
    {
      url: 'https://act-rules.github.io/testcases/c487ae/e236e380884824c869a8164f8c6ca055dc42a6eb.html',
      outcome: 'inapplicable'
    },
    {
      url: 'https://act-rules.github.io/testcases/c487ae/9d7c8586372ca2ec9551882ef42df94e3925388c.html',
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
        configure({ rules: ['QW-ACT-R12'] });
        const report = await executeACTR(test.url, source.html.parsed, processed.html.parsed, stylesheets);
        expect(report.rules['QW-ACT-R12'].metadata.outcome).to.be.equal(test.outcome);
      });
    });
  }
});
