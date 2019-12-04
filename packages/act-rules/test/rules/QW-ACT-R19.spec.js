const {
  configure,
  executeACTR,
  resetConfiguration
} = require('../../dist/index');
const {
  getDom
} = require('@qualweb/get-dom-puppeteer');
const { expect } = require('chai');
//const request = require('request-promise');

describe('Rule QW-ACT-R19', function () {

  const json = {
  "name": "[object Object] test cases",
  "website": "https://act-rules.github.io",
  "license": "https://act-rules.github.io/pages/license/",
  "description": "Accessibility conformance testing rules for HTML",
  "count": 600,
  "testcases": [{
    "testcaseId": "0e79c04a2b68022220995516f5ab77eae78aebde",
    "url": "https://act-rules.github.io/testcases/cae760/0e79c04a2b68022220995516f5ab77eae78aebde.html",
    "relativePath": "testcases/cae760/0e79c04a2b68022220995516f5ab77eae78aebde.html",
    "expected": "passed",
    "ruleId": "cae760",
    "ruleName": "`iframe` element has accessible name",
    "rulePage": "https://act-rules.github.io/rules/cae760",
    "ruleAccessibilityRequirements": {
      "wcag20:4.1.2": {
        "forConformance": true,
        "failed": "not satisfied",
        "passed": "further testing needed",
        "inapplicable": "further testing needed"
      }
    }
  },
  {
    "testcaseId": "35042dc3f9ace0082d260df87848f44c10babf35",
    "url": "https://act-rules.github.io/testcases/cae760/35042dc3f9ace0082d260df87848f44c10babf35.html",
    "relativePath": "testcases/cae760/35042dc3f9ace0082d260df87848f44c10babf35.html",
    "expected": "passed",
    "ruleId": "cae760",
    "ruleName": "`iframe` element has accessible name",
    "rulePage": "https://act-rules.github.io/rules/cae760",
    "ruleAccessibilityRequirements": {
      "wcag20:4.1.2": {
        "forConformance": true,
        "failed": "not satisfied",
        "passed": "further testing needed",
        "inapplicable": "further testing needed"
      }
    }
  },
  {
    "testcaseId": "f68bdbf79e416e510f4ae296cbf28179f825ba71",
    "url": "https://act-rules.github.io/testcases/cae760/f68bdbf79e416e510f4ae296cbf28179f825ba71.html",
    "relativePath": "testcases/cae760/f68bdbf79e416e510f4ae296cbf28179f825ba71.html",
    "expected": "passed",
    "ruleId": "cae760",
    "ruleName": "`iframe` element has accessible name",
    "rulePage": "https://act-rules.github.io/rules/cae760",
    "ruleAccessibilityRequirements": {
      "wcag20:4.1.2": {
        "forConformance": true,
        "failed": "not satisfied",
        "passed": "further testing needed",
        "inapplicable": "further testing needed"
      }
    }
  },
  {
    "testcaseId": "8d878dd328b0d13342cfaa2beb56bd0ec16ec64a",
    "url": "https://act-rules.github.io/testcases/cae760/8d878dd328b0d13342cfaa2beb56bd0ec16ec64a.html",
    "relativePath": "testcases/cae760/8d878dd328b0d13342cfaa2beb56bd0ec16ec64a.html",
    "expected": "passed",
    "ruleId": "cae760",
    "ruleName": "`iframe` element has accessible name",
    "rulePage": "https://act-rules.github.io/rules/cae760",
    "ruleAccessibilityRequirements": {
      "wcag20:4.1.2": {
        "forConformance": true,
        "failed": "not satisfied",
        "passed": "further testing needed",
        "inapplicable": "further testing needed"
      }
    }
  },
  {
    "testcaseId": "ea12dfb737753fe07adb69f3858a5e0c89b1e976",
    "url": "https://act-rules.github.io/testcases/cae760/ea12dfb737753fe07adb69f3858a5e0c89b1e976.html",
    "relativePath": "testcases/cae760/ea12dfb737753fe07adb69f3858a5e0c89b1e976.html",
    "expected": "failed",
    "ruleId": "cae760",
    "ruleName": "`iframe` element has accessible name",
    "rulePage": "https://act-rules.github.io/rules/cae760",
    "ruleAccessibilityRequirements": {
      "wcag20:4.1.2": {
        "forConformance": true,
        "failed": "not satisfied",
        "passed": "further testing needed",
        "inapplicable": "further testing needed"
      }
    }
  },
  {
    "testcaseId": "65d73c7dfeef2e7cdce2d77be76960179aa9b0a1",
    "url": "https://act-rules.github.io/testcases/cae760/65d73c7dfeef2e7cdce2d77be76960179aa9b0a1.html",
    "relativePath": "testcases/cae760/65d73c7dfeef2e7cdce2d77be76960179aa9b0a1.html",
    "expected": "failed",
    "ruleId": "cae760",
    "ruleName": "`iframe` element has accessible name",
    "rulePage": "https://act-rules.github.io/rules/cae760",
    "ruleAccessibilityRequirements": {
      "wcag20:4.1.2": {
        "forConformance": true,
        "failed": "not satisfied",
        "passed": "further testing needed",
        "inapplicable": "further testing needed"
      }
    }
  },
  {
    "testcaseId": "a07b51429f368df4f017dc0de0a01e2615639b59",
    "url": "https://act-rules.github.io/testcases/cae760/a07b51429f368df4f017dc0de0a01e2615639b59.html",
    "relativePath": "testcases/cae760/a07b51429f368df4f017dc0de0a01e2615639b59.html",
    "expected": "failed",
    "ruleId": "cae760",
    "ruleName": "`iframe` element has accessible name",
    "rulePage": "https://act-rules.github.io/rules/cae760",
    "ruleAccessibilityRequirements": {
      "wcag20:4.1.2": {
        "forConformance": true,
        "failed": "not satisfied",
        "passed": "further testing needed",
        "inapplicable": "further testing needed"
      }
    }
  },
  {
    "testcaseId": "733c9ca6db504f361b71d568affd7fba1ee4dc02",
    "url": "https://act-rules.github.io/testcases/cae760/733c9ca6db504f361b71d568affd7fba1ee4dc02.html",
    "relativePath": "testcases/cae760/733c9ca6db504f361b71d568affd7fba1ee4dc02.html",
    "expected": "failed",
    "ruleId": "cae760",
    "ruleName": "`iframe` element has accessible name",
    "rulePage": "https://act-rules.github.io/rules/cae760",
    "ruleAccessibilityRequirements": {
      "wcag20:4.1.2": {
        "forConformance": true,
        "failed": "not satisfied",
        "passed": "further testing needed",
        "inapplicable": "further testing needed"
      }
    }
  },
  {
    "testcaseId": "7b44ee66dcb848000bd6be9c98934c5779c1bd31",
    "url": "https://act-rules.github.io/testcases/cae760/7b44ee66dcb848000bd6be9c98934c5779c1bd31.html",
    "relativePath": "testcases/cae760/7b44ee66dcb848000bd6be9c98934c5779c1bd31.html",
    "expected": "failed",
    "ruleId": "cae760",
    "ruleName": "`iframe` element has accessible name",
    "rulePage": "https://act-rules.github.io/rules/cae760",
    "ruleAccessibilityRequirements": {
      "wcag20:4.1.2": {
        "forConformance": true,
        "failed": "not satisfied",
        "passed": "further testing needed",
        "inapplicable": "further testing needed"
      }
    }
  },
  {
    "testcaseId": "6ac3ff2ce45bef735fdebb8f874900aeaad2f02e",
    "url": "https://act-rules.github.io/testcases/cae760/6ac3ff2ce45bef735fdebb8f874900aeaad2f02e.html",
    "relativePath": "testcases/cae760/6ac3ff2ce45bef735fdebb8f874900aeaad2f02e.html",
    "expected": "failed",
    "ruleId": "cae760",
    "ruleName": "`iframe` element has accessible name",
    "rulePage": "https://act-rules.github.io/rules/cae760",
    "ruleAccessibilityRequirements": {
      "wcag20:4.1.2": {
        "forConformance": true,
        "failed": "not satisfied",
        "passed": "further testing needed",
        "inapplicable": "further testing needed"
      }
    }
  },
  {
    "testcaseId": "9ae9916e3d3db923ad7c687d8e2353967c4a57f6",
    "url": "https://act-rules.github.io/testcases/cae760/9ae9916e3d3db923ad7c687d8e2353967c4a57f6.html",
    "relativePath": "testcases/cae760/9ae9916e3d3db923ad7c687d8e2353967c4a57f6.html",
    "expected": "failed",
    "ruleId": "cae760",
    "ruleName": "`iframe` element has accessible name",
    "rulePage": "https://act-rules.github.io/rules/cae760",
    "ruleAccessibilityRequirements": {
      "wcag20:4.1.2": {
        "forConformance": true,
        "failed": "not satisfied",
        "passed": "further testing needed",
        "inapplicable": "further testing needed"
      }
    }
  },
  {
    "testcaseId": "1cc9fdb1a9dc67f09c440c43308c2d29824baf1e",
    "url": "https://act-rules.github.io/testcases/cae760/1cc9fdb1a9dc67f09c440c43308c2d29824baf1e.html",
    "relativePath": "testcases/cae760/1cc9fdb1a9dc67f09c440c43308c2d29824baf1e.html",
    "expected": "inapplicable",
    "ruleId": "cae760",
    "ruleName": "`iframe` element has accessible name",
    "rulePage": "https://act-rules.github.io/rules/cae760",
    "ruleAccessibilityRequirements": {
      "wcag20:4.1.2": {
        "forConformance": true,
        "failed": "not satisfied",
        "passed": "further testing needed",
        "inapplicable": "further testing needed"
      }
    }
  },
  {
    "testcaseId": "ea0b2facc10851c5136a690fb65c52ee22c90923",
    "url": "https://act-rules.github.io/testcases/cae760/ea0b2facc10851c5136a690fb65c52ee22c90923.html",
    "relativePath": "testcases/cae760/ea0b2facc10851c5136a690fb65c52ee22c90923.html",
    "expected": "inapplicable",
    "ruleId": "cae760",
    "ruleName": "`iframe` element has accessible name",
    "rulePage": "https://act-rules.github.io/rules/cae760",
    "ruleAccessibilityRequirements": {
      "wcag20:4.1.2": {
        "forConformance": true,
        "failed": "not satisfied",
        "passed": "further testing needed",
        "inapplicable": "further testing needed"
      }
    }
  }]
};

  afterEach(function() {
    resetConfiguration();
  });

  const ruleId = 'cae760';

  /*before('Downloading tests cases', function() {
    //const json = JSON.parse(await request('https://act-rules.github.io/testcases.json'));
    testCases = json.testcases.filter(tc => tc.ruleId === ruleId);
  });*/

  //setTimeout(function() {
    testCases = json.testcases.filter(tc => tc.ruleId === ruleId);
    let i = 0;
    let lastOutcome = 'passed';
    for (const test of testCases || []) {
      if (test.expected !== lastOutcome) {
        lastOutcome = test.expected;
        i = 0;
      }
      i++;
      describe(`${test.expected.charAt(0).toUpperCase() + test.expected.slice(1)} example ${i}`, function () {
        it(`should have outcome="${test.expected}"`, async function () {
          this.timeout(10 * 1000);
          const { source, processed, stylesheets } = await getDom(test.url);
          configure({
            rules: ['QW-ACT-R19']
          });
          const report = await executeACTR(test.url, source.html.parsed, processed.html.parsed, stylesheets);
          expect(report.rules['QW-ACT-R19'].metadata.outcome).to.be.equal(test.expected);
        });
      });
    }
  //}, 5000);
});