const {
  configure,
  executeNotMappedACTR
} = require('../../dist/index');
const {
  getDom
} = require('@qualweb/get-dom-puppeteer');
const { expect } = require('chai');

describe('Rule QW-ACT-R7', function () {

  // const URL = 'https://act-rules.github.io/testcases/b33eff/cd018789b49540702f2d4a43e7c4fdba43868d73.html';

  // describe('Configuration', function () {
  //   describe('The rule should...', function() {
  //     it('... run', async function () {
  //       this.timeout(10 * 1000);
  //       const { source, processed } = await getDom(URL);
  //       const report = await executeACTR(source.html.parsed, processed.html.parsed);
  //       expect(Object.keys(report.rules)).to.be.an('array').and.to.include('QW-ACT-R7');
  //     });
  //   });
  // });

  const tests = [
    {
      "testcaseId": "cd018789b49540702f2d4a43e7c4fdba43868d73",
      "url": "https://act-rules.github.io/testcases/b33eff/cd018789b49540702f2d4a43e7c4fdba43868d73.html",
      "relativePath": "testcases/b33eff/cd018789b49540702f2d4a43e7c4fdba43868d73.html",
      "outcome": "passed",
      "ruleId": "b33eff",
      "ruleName": "Orientation of the page is not restricted using CSS transform property",
      "rulePage": "https://act-rules.github.io/rules/b33eff",
      "ruleAccessibilityRequirements": {
        "wcag21:1.3.4": {
          "forConformance": true,
          "failed": "not satisfied",
          "passed": "further testing needed",
          "inapplicable": "further testing needed"
        }
      }
    },
    {
      "testcaseId": "2a565685e5eff487582e927c88b57dbab76cb8fc",
      "url": "https://act-rules.github.io/testcases/b33eff/2a565685e5eff487582e927c88b57dbab76cb8fc.html",
      "relativePath": "testcases/b33eff/2a565685e5eff487582e927c88b57dbab76cb8fc.html",
      "outcome": "passed",
      "ruleId": "b33eff",
      "ruleName": "Orientation of the page is not restricted using CSS transform property",
      "rulePage": "https://act-rules.github.io/rules/b33eff",
      "ruleAccessibilityRequirements": {
        "wcag21:1.3.4": {
          "forConformance": true,
          "failed": "not satisfied",
          "passed": "further testing needed",
          "inapplicable": "further testing needed"
        }
      }
    },
    {
      "testcaseId": "2caf0636361e576d50b3b20aef24c11329465ec7",
      "url": "https://act-rules.github.io/testcases/b33eff/2caf0636361e576d50b3b20aef24c11329465ec7.html",
      "relativePath": "testcases/b33eff/2caf0636361e576d50b3b20aef24c11329465ec7.html",
      "outcome": "passed",
      "ruleId": "b33eff",
      "ruleName": "Orientation of the page is not restricted using CSS transform property",
      "rulePage": "https://act-rules.github.io/rules/b33eff",
      "ruleAccessibilityRequirements": {
        "wcag21:1.3.4": {
          "forConformance": true,
          "failed": "not satisfied",
          "passed": "further testing needed",
          "inapplicable": "further testing needed"
        }
      }
    },
    {
      "testcaseId": "0ac7841fba568c64ef44aaf0817f51508603cf4a",
      "url": "https://act-rules.github.io/testcases/b33eff/0ac7841fba568c64ef44aaf0817f51508603cf4a.html",
      "relativePath": "testcases/b33eff/0ac7841fba568c64ef44aaf0817f51508603cf4a.html",
      "outcome": "failed",
      "ruleId": "b33eff",
      "ruleName": "Orientation of the page is not restricted using CSS transform property",
      "rulePage": "https://act-rules.github.io/rules/b33eff",
      "ruleAccessibilityRequirements": {
        "wcag21:1.3.4": {
          "forConformance": true,
          "failed": "not satisfied",
          "passed": "further testing needed",
          "inapplicable": "further testing needed"
        }
      }
    },
    {
      "testcaseId": "70d571c05bb64f851b46e4b6fd9b82e174860f66",
      "url": "https://act-rules.github.io/testcases/b33eff/70d571c05bb64f851b46e4b6fd9b82e174860f66.html",
      "relativePath": "testcases/b33eff/70d571c05bb64f851b46e4b6fd9b82e174860f66.html",
      "outcome": "failed",
      "ruleId": "b33eff",
      "ruleName": "Orientation of the page is not restricted using CSS transform property",
      "rulePage": "https://act-rules.github.io/rules/b33eff",
      "ruleAccessibilityRequirements": {
        "wcag21:1.3.4": {
          "forConformance": true,
          "failed": "not satisfied",
          "passed": "further testing needed",
          "inapplicable": "further testing needed"
        }
      }
    },
    {
      "testcaseId": "7e666e7c0116bc2ad66e691a66e159fa0873a778",
      "url": "https://act-rules.github.io/testcases/b33eff/7e666e7c0116bc2ad66e691a66e159fa0873a778.html",
      "relativePath": "testcases/b33eff/7e666e7c0116bc2ad66e691a66e159fa0873a778.html",
      "outcome": "inapplicable",
      "ruleId": "b33eff",
      "ruleName": "Orientation of the page is not restricted using CSS transform property",
      "rulePage": "https://act-rules.github.io/rules/b33eff",
      "ruleAccessibilityRequirements": {
        "wcag21:1.3.4": {
          "forConformance": true,
          "failed": "not satisfied",
          "passed": "further testing needed",
          "inapplicable": "further testing needed"
        }
      }
    },
    {
      "testcaseId": "d288295be774625969b1efa1086ab590c0066667",
      "url": "https://act-rules.github.io/testcases/b33eff/d288295be774625969b1efa1086ab590c0066667.html",
      "relativePath": "testcases/b33eff/d288295be774625969b1efa1086ab590c0066667.html",
      "outcome": "inapplicable",
      "ruleId": "b33eff",
      "ruleName": "Orientation of the page is not restricted using CSS transform property",
      "rulePage": "https://act-rules.github.io/rules/b33eff",
      "ruleAccessibilityRequirements": {
        "wcag21:1.3.4": {
          "forConformance": true,
          "failed": "not satisfied",
          "passed": "further testing needed",
          "inapplicable": "further testing needed"
        }
      }
    },
    {
      "testcaseId": "6c82b06a37af7bdc4937f2b3b7225b13bf10ba79",
      "url": "https://act-rules.github.io/testcases/b33eff/6c82b06a37af7bdc4937f2b3b7225b13bf10ba79.html",
      "relativePath": "testcases/b33eff/6c82b06a37af7bdc4937f2b3b7225b13bf10ba79.html",
      "outcome": "inapplicable",
      "ruleId": "b33eff",
      "ruleName": "Orientation of the page is not restricted using CSS transform property",
      "rulePage": "https://act-rules.github.io/rules/b33eff",
      "ruleAccessibilityRequirements": {
        "wcag21:1.3.4": {
          "forConformance": true,
          "failed": "not satisfied",
          "passed": "further testing needed",
          "inapplicable": "further testing needed"
        }
      }
    },
    {
      "testcaseId": "99fccda1d8c85bbfc30f8706b644c8d36cdbdfda",
      "url": "https://act-rules.github.io/testcases/b33eff/99fccda1d8c85bbfc30f8706b644c8d36cdbdfda.html",
      "relativePath": "testcases/b33eff/99fccda1d8c85bbfc30f8706b644c8d36cdbdfda.html",
      "outcome": "inapplicable",
      "ruleId": "b33eff",
      "ruleName": "Orientation of the page is not restricted using CSS transform property",
      "rulePage": "https://act-rules.github.io/rules/b33eff",
      "ruleAccessibilityRequirements": {
        "wcag21:1.3.4": {
          "forConformance": true,
          "failed": "not satisfied",
          "passed": "further testing needed",
          "inapplicable": "further testing needed"
        }
      }
    },
    {
      "testcaseId": "c3deb42f8c65d190d89da433d2e5816057a2e5dc",
      "url": "https://act-rules.github.io/testcases/b33eff/c3deb42f8c65d190d89da433d2e5816057a2e5dc.html",
      "relativePath": "testcases/b33eff/c3deb42f8c65d190d89da433d2e5816057a2e5dc.html",
      "outcome": "inapplicable",
      "ruleId": "b33eff",
      "ruleName": "Orientation of the page is not restricted using CSS transform property",
      "rulePage": "https://act-rules.github.io/rules/b33eff",
      "ruleAccessibilityRequirements": {
        "wcag21:1.3.4": {
          "forConformance": true,
          "failed": "not satisfied",
          "passed": "further testing needed",
          "inapplicable": "further testing needed"
        }
      }
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
    describe(`${test.testcaseId} ${test.outcome.charAt(0).toUpperCase() + test.outcome.slice(1)} example ${i}`, function () {
      it(`should have outcome="${test.outcome}"`, async function () {
        this.timeout(10 * 1000);
        const { stylesheets } = await getDom(test.url);
        configure({ rules: ['QW-ACT-R7'] });
        const report = await executeNotMappedACTR(['QW-ACT-R7'], stylesheets);
        expect(report.rules['QW-ACT-R7'].metadata.outcome).to.be.equal(test.outcome);
      });
    });
  }
});