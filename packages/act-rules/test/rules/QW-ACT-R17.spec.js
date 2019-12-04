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

describe('Rule QW-ACT-R17', function () {

  const json = {
  "name": "[object Object] test cases",
  "website": "https://act-rules.github.io",
  "license": "https://act-rules.github.io/pages/license/",
  "description": "Accessibility conformance testing rules for HTML",
  "count": 600,
  "testcases": [
    {
      "testcaseId": "583a0e65499c4629df374c06b56d33e89638cd4f",
      "testcaseTitle": "Passed Example 1",
      "url": "https://act-rules.github.io/testcases/23a2a8/583a0e65499c4629df374c06b56d33e89638cd4f.html",
      "relativePath": "testcases/23a2a8/583a0e65499c4629df374c06b56d33e89638cd4f.html",
      "expected": "passed",
      "ruleId": "23a2a8",
      "ruleName": "Image has accessible name",
      "rulePage": "https://act-rules.github.io/rules/23a2a8",
      "ruleAccessibilityRequirements": {
        "wcag20:1.1.1": {
          "forConformance": true,
          "failed": "not satisfied",
          "passed": "further testing needed",
          "inapplicable": "further testing needed"
        }
      }
    },
    {
      "testcaseId": "66b7482c8922e81b5979fd5e3ab2bfe7b24adb5a",
      "testcaseTitle": "Passed Example 2",
      "url": "https://act-rules.github.io/testcases/23a2a8/66b7482c8922e81b5979fd5e3ab2bfe7b24adb5a.html",
      "relativePath": "testcases/23a2a8/66b7482c8922e81b5979fd5e3ab2bfe7b24adb5a.html",
      "expected": "passed",
      "ruleId": "23a2a8",
      "ruleName": "Image has accessible name",
      "rulePage": "https://act-rules.github.io/rules/23a2a8",
      "ruleAccessibilityRequirements": {
        "wcag20:1.1.1": {
          "forConformance": true,
          "failed": "not satisfied",
          "passed": "further testing needed",
          "inapplicable": "further testing needed"
        }
      }
    },
    {
      "testcaseId": "dd51da9c880d14f83531e0d70e833fe842820937",
      "testcaseTitle": "Passed Example 3",
      "url": "https://act-rules.github.io/testcases/23a2a8/dd51da9c880d14f83531e0d70e833fe842820937.html",
      "relativePath": "testcases/23a2a8/dd51da9c880d14f83531e0d70e833fe842820937.html",
      "expected": "passed",
      "ruleId": "23a2a8",
      "ruleName": "Image has accessible name",
      "rulePage": "https://act-rules.github.io/rules/23a2a8",
      "ruleAccessibilityRequirements": {
        "wcag20:1.1.1": {
          "forConformance": true,
          "failed": "not satisfied",
          "passed": "further testing needed",
          "inapplicable": "further testing needed"
        }
      }
    },
    {
      "testcaseId": "7a6f79629edc46c6faf4f24e1362562df2978de8",
      "testcaseTitle": "Passed Example 4",
      "url": "https://act-rules.github.io/testcases/23a2a8/7a6f79629edc46c6faf4f24e1362562df2978de8.html",
      "relativePath": "testcases/23a2a8/7a6f79629edc46c6faf4f24e1362562df2978de8.html",
      "expected": "passed",
      "ruleId": "23a2a8",
      "ruleName": "Image has accessible name",
      "rulePage": "https://act-rules.github.io/rules/23a2a8",
      "ruleAccessibilityRequirements": {
        "wcag20:1.1.1": {
          "forConformance": true,
          "failed": "not satisfied",
          "passed": "further testing needed",
          "inapplicable": "further testing needed"
        }
      }
    },
    {
      "testcaseId": "6a3f75c730ba1b1cedd8295ffd0e60ee5ea237f5",
      "testcaseTitle": "Passed Example 5",
      "url": "https://act-rules.github.io/testcases/23a2a8/6a3f75c730ba1b1cedd8295ffd0e60ee5ea237f5.html",
      "relativePath": "testcases/23a2a8/6a3f75c730ba1b1cedd8295ffd0e60ee5ea237f5.html",
      "expected": "passed",
      "ruleId": "23a2a8",
      "ruleName": "Image has accessible name",
      "rulePage": "https://act-rules.github.io/rules/23a2a8",
      "ruleAccessibilityRequirements": {
        "wcag20:1.1.1": {
          "forConformance": true,
          "failed": "not satisfied",
          "passed": "further testing needed",
          "inapplicable": "further testing needed"
        }
      }
    },
    {
      "testcaseId": "400fab95efbe39d9717e57be6d6b342d5c2b59b7",
      "testcaseTitle": "Passed Example 6",
      "url": "https://act-rules.github.io/testcases/23a2a8/400fab95efbe39d9717e57be6d6b342d5c2b59b7.html",
      "relativePath": "testcases/23a2a8/400fab95efbe39d9717e57be6d6b342d5c2b59b7.html",
      "expected": "passed",
      "ruleId": "23a2a8",
      "ruleName": "Image has accessible name",
      "rulePage": "https://act-rules.github.io/rules/23a2a8",
      "ruleAccessibilityRequirements": {
        "wcag20:1.1.1": {
          "forConformance": true,
          "failed": "not satisfied",
          "passed": "further testing needed",
          "inapplicable": "further testing needed"
        }
      }
    },
    {
      "testcaseId": "c89a01969ed6b7b1e25496881da1446989194711",
      "testcaseTitle": "Passed Example 7",
      "url": "https://act-rules.github.io/testcases/23a2a8/c89a01969ed6b7b1e25496881da1446989194711.html",
      "relativePath": "testcases/23a2a8/c89a01969ed6b7b1e25496881da1446989194711.html",
      "expected": "passed",
      "ruleId": "23a2a8",
      "ruleName": "Image has accessible name",
      "rulePage": "https://act-rules.github.io/rules/23a2a8",
      "ruleAccessibilityRequirements": {
        "wcag20:1.1.1": {
          "forConformance": true,
          "failed": "not satisfied",
          "passed": "further testing needed",
          "inapplicable": "further testing needed"
        }
      }
    },
    {
      "testcaseId": "b7bc54b68b5f861c84def83b2cc8cde510072cfb",
      "testcaseTitle": "Passed Example 8",
      "url": "https://act-rules.github.io/testcases/23a2a8/b7bc54b68b5f861c84def83b2cc8cde510072cfb.html",
      "relativePath": "testcases/23a2a8/b7bc54b68b5f861c84def83b2cc8cde510072cfb.html",
      "expected": "passed",
      "ruleId": "23a2a8",
      "ruleName": "Image has accessible name",
      "rulePage": "https://act-rules.github.io/rules/23a2a8",
      "ruleAccessibilityRequirements": {
        "wcag20:1.1.1": {
          "forConformance": true,
          "failed": "not satisfied",
          "passed": "further testing needed",
          "inapplicable": "further testing needed"
        }
      }
    },
    {
      "testcaseId": "17be28658e16098158295ff4525a96b7d555b216",
      "testcaseTitle": "Failed Example 1",
      "url": "https://act-rules.github.io/testcases/23a2a8/17be28658e16098158295ff4525a96b7d555b216.html",
      "relativePath": "testcases/23a2a8/17be28658e16098158295ff4525a96b7d555b216.html",
      "expected": "failed",
      "ruleId": "23a2a8",
      "ruleName": "Image has accessible name",
      "rulePage": "https://act-rules.github.io/rules/23a2a8",
      "ruleAccessibilityRequirements": {
        "wcag20:1.1.1": {
          "forConformance": true,
          "failed": "not satisfied",
          "passed": "further testing needed",
          "inapplicable": "further testing needed"
        }
      }
    },
    {
      "testcaseId": "5ddf53a31b74138120bd60ded479061b0c155c17",
      "testcaseTitle": "Failed Example 2",
      "url": "https://act-rules.github.io/testcases/23a2a8/5ddf53a31b74138120bd60ded479061b0c155c17.html",
      "relativePath": "testcases/23a2a8/5ddf53a31b74138120bd60ded479061b0c155c17.html",
      "expected": "failed",
      "ruleId": "23a2a8",
      "ruleName": "Image has accessible name",
      "rulePage": "https://act-rules.github.io/rules/23a2a8",
      "ruleAccessibilityRequirements": {
        "wcag20:1.1.1": {
          "forConformance": true,
          "failed": "not satisfied",
          "passed": "further testing needed",
          "inapplicable": "further testing needed"
        }
      }
    },
    {
      "testcaseId": "6450b8d331930deb30196ae89b6ebb14a30dfe63",
      "testcaseTitle": "Failed Example 3",
      "url": "https://act-rules.github.io/testcases/23a2a8/6450b8d331930deb30196ae89b6ebb14a30dfe63.html",
      "relativePath": "testcases/23a2a8/6450b8d331930deb30196ae89b6ebb14a30dfe63.html",
      "expected": "failed",
      "ruleId": "23a2a8",
      "ruleName": "Image has accessible name",
      "rulePage": "https://act-rules.github.io/rules/23a2a8",
      "ruleAccessibilityRequirements": {
        "wcag20:1.1.1": {
          "forConformance": true,
          "failed": "not satisfied",
          "passed": "further testing needed",
          "inapplicable": "further testing needed"
        }
      }
    },
    {
      "testcaseId": "73f1cad142fa806afc01e529f85aeba986d9c2cf",
      "testcaseTitle": "Failed Example 4",
      "url": "https://act-rules.github.io/testcases/23a2a8/73f1cad142fa806afc01e529f85aeba986d9c2cf.html",
      "relativePath": "testcases/23a2a8/73f1cad142fa806afc01e529f85aeba986d9c2cf.html",
      "expected": "failed",
      "ruleId": "23a2a8",
      "ruleName": "Image has accessible name",
      "rulePage": "https://act-rules.github.io/rules/23a2a8",
      "ruleAccessibilityRequirements": {
        "wcag20:1.1.1": {
          "forConformance": true,
          "failed": "not satisfied",
          "passed": "further testing needed",
          "inapplicable": "further testing needed"
        }
      }
    },
    {
      "testcaseId": "b822562bd5065f116abc300050bbd4834f9aae90",
      "testcaseTitle": "Inapplicable Example 1",
      "url": "https://act-rules.github.io/testcases/23a2a8/b822562bd5065f116abc300050bbd4834f9aae90.html",
      "relativePath": "testcases/23a2a8/b822562bd5065f116abc300050bbd4834f9aae90.html",
      "expected": "inapplicable",
      "ruleId": "23a2a8",
      "ruleName": "Image has accessible name",
      "rulePage": "https://act-rules.github.io/rules/23a2a8",
      "ruleAccessibilityRequirements": {
        "wcag20:1.1.1": {
          "forConformance": true,
          "failed": "not satisfied",
          "passed": "further testing needed",
          "inapplicable": "further testing needed"
        }
      }
    },
    {
      "testcaseId": "e3f9ec2732be62b32a1fe4f1923eba0467e0886a",
      "testcaseTitle": "Inapplicable Example 2",
      "url": "https://act-rules.github.io/testcases/23a2a8/e3f9ec2732be62b32a1fe4f1923eba0467e0886a.html",
      "relativePath": "testcases/23a2a8/e3f9ec2732be62b32a1fe4f1923eba0467e0886a.html",
      "expected": "inapplicable",
      "ruleId": "23a2a8",
      "ruleName": "Image has accessible name",
      "rulePage": "https://act-rules.github.io/rules/23a2a8",
      "ruleAccessibilityRequirements": {
        "wcag20:1.1.1": {
          "forConformance": true,
          "failed": "not satisfied",
          "passed": "further testing needed",
          "inapplicable": "further testing needed"
        }
      }
    },
    {
      "testcaseId": "7140dd08775399add60ae17cf37caa16442bd12b",
      "testcaseTitle": "Inapplicable Example 3",
      "url": "https://act-rules.github.io/testcases/23a2a8/7140dd08775399add60ae17cf37caa16442bd12b.html",
      "relativePath": "testcases/23a2a8/7140dd08775399add60ae17cf37caa16442bd12b.html",
      "expected": "inapplicable",
      "ruleId": "23a2a8",
      "ruleName": "Image has accessible name",
      "rulePage": "https://act-rules.github.io/rules/23a2a8",
      "ruleAccessibilityRequirements": {
        "wcag20:1.1.1": {
          "forConformance": true,
          "failed": "not satisfied",
          "passed": "further testing needed",
          "inapplicable": "further testing needed"
        }
      }
    },
    {
      "testcaseId": "96d6ac9962b228649c1d3e21585e1248a74f1129",
      "testcaseTitle": "Inapplicable Example 4",
      "url": "https://act-rules.github.io/testcases/23a2a8/96d6ac9962b228649c1d3e21585e1248a74f1129.html",
      "relativePath": "testcases/23a2a8/96d6ac9962b228649c1d3e21585e1248a74f1129.html",
      "expected": "inapplicable",
      "ruleId": "23a2a8",
      "ruleName": "Image has accessible name",
      "rulePage": "https://act-rules.github.io/rules/23a2a8",
      "ruleAccessibilityRequirements": {
        "wcag20:1.1.1": {
          "forConformance": true,
          "failed": "not satisfied",
          "passed": "further testing needed",
          "inapplicable": "further testing needed"
        }
      }
    }
  ]
};

  afterEach(function() {
    resetConfiguration();
  });

  const ruleId = '23a2a8';
  let testCases = [];

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
            rules: ['QW-ACT-R17']
          });
          const report = await executeACTR(test.url, source.html.parsed, processed.html.parsed, stylesheets);
          expect(report.rules['QW-ACT-R17'].metadata.outcome).to.be.equal(test.expected);
        });
      });
    }
  //}, 5000);
});