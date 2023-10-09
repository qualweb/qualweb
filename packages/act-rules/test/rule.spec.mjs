import fetch from 'node-fetch';
import { Dom } from '@qualweb/dom';
import { expect } from 'chai';
import locales from '@qualweb/locale';
import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { fileURLToPath, URL } from 'node:url';
import { createRequire } from 'module';
import { launchBrowser } from './util.mjs';
const require = createRequire(import.meta.url);

async function getTestCases() {
  const response = await fetch('https://www.w3.org/WAI/content-assets/wcag-act-rules/testcases.json');
  return await response.json();
}

const mapping = {
  'QW-ACT-R1': '2779a5',
  'QW-ACT-R2': 'b5c3f8',
  'QW-ACT-R3': '5b7ae0',
  'QW-ACT-R4': 'bc659a',
  'QW-ACT-R5': 'bf051a',
  'QW-ACT-R6': '59796f',
  'QW-ACT-R7': 'b33eff',
  'QW-ACT-R9': 'b20e66',
  'QW-ACT-R10': '4b1c6c',
  'QW-ACT-R11': '97a4e1',
  'QW-ACT-R12': 'c487ae',
  'QW-ACT-R13': '6cfa84',
  'QW-ACT-R14': 'b4f0c3',
  'QW-ACT-R15': '80f0bf',
  'QW-ACT-R16': 'e086e5',
  'QW-ACT-R17': '23a2a8',
  'QW-ACT-R18': '3ea0c8',
  'QW-ACT-R19': 'cae760',
  'QW-ACT-R20': '674b10',
  'QW-ACT-R21': '7d6734',
  'QW-ACT-R22': 'de46e4',
  'QW-ACT-R23': 'c5a4ea',
  'QW-ACT-R24': '73f2c2',
  'QW-ACT-R25': '5c01ea',
  'QW-ACT-R26': 'eac66b',
  'QW-ACT-R27': '5f99a7',
  'QW-ACT-R28': '4e8ab6',
  'QW-ACT-R29': 'e7aa44',
  'QW-ACT-R30': '2ee8b8',
  'QW-ACT-R31': 'c3232f',
  'QW-ACT-R32': '1ec09b',
  'QW-ACT-R33': 'ff89c9',
  'QW-ACT-R34': '6a7281',
  'QW-ACT-R35': 'ffd0e9',
  'QW-ACT-R36': 'a25f45',
  'QW-ACT-R37': 'afw4f7',
  'QW-ACT-R38': 'bc4a75',
  'QW-ACT-R39': 'd0f69e',
  'QW-ACT-R40': '59br37',
  'QW-ACT-R41': '36b590',
  'QW-ACT-R42': '8fc3b6',
  'QW-ACT-R43': '0ssw9k',
  'QW-ACT-R44': 'fd3a94',
  'QW-ACT-R48': '46ca7f',
  'QW-ACT-R49': 'aaa1bf',
  'QW-ACT-R50': '4c31df',
  'QW-ACT-R51': 'fd26cf',
  'QW-ACT-R52': 'ac7dc6',
  'QW-ACT-R53': 'ee13b5',
  'QW-ACT-R54': 'd7ba54',
  'QW-ACT-R55': '1ea59c',
  'QW-ACT-R56': 'ab4d13',
  'QW-ACT-R57': 'f196ce',
  'QW-ACT-R58': '2eb176',
  'QW-ACT-R59': 'afb423',
  'QW-ACT-R60': 'f51b46',
  'QW-ACT-R61': '1a02b0',
  'QW-ACT-R62': 'oj04fd',
  'QW-ACT-R63': 'b40fd1',
  'QW-ACT-R64': '047fe0',
  'QW-ACT-R65': '307n5z',
  'QW-ACT-R66': 'm6b1q3',
  'QW-ACT-R67': '24afc2',
  'QW-ACT-R68': '78fd32',
  'QW-ACT-R69': '9e45ec',
  'QW-ACT-R70': 'akn7bn',
  'QW-ACT-R71': 'bisz58',
  'QW-ACT-R72': '8a213c',
  'QW-ACT-R73': '3e12e1',
  'QW-ACT-R74': 'ye5d6e',
  'QW-ACT-R75': 'cf77f2',
  'QW-ACT-R76': '09o5cg'
};

// If a single QW-ACT-R?? was passed as an argument, run just that test.
// Otherwise, run all tests.
const rulesToTest = Object.keys(mapping);

const __dirname = fileURLToPath(new URL('.', import.meta.url));

const actTestCases = JSON.parse(readFileSync(resolve(__dirname, 'fixtures/testcases.json')));

const PASSED = 'passed';
const FAILED = 'failed';
const INAPPLICABLE = 'inapplicable';
const CANTTELL = 'cantTell';

const consistencyMapping = {
  'passed': [PASSED, INAPPLICABLE, CANTTELL],
  'failed': [FAILED, CANTTELL],
  'inapplicable': [PASSED, INAPPLICABLE, CANTTELL],
};

describe('ACT rules', () => {
  let browser = null;
  let incognito = null;

  before(async () => {
    // Fire up Puppeteer before any test runs. All tests should be running in
    // their own tab/page, so relaunching Puppeteer/Chrome between cases should
    // not be necessary.
    browser = await launchBrowser();

    incognito = await browser.createIncognitoBrowserContext();
  });

  for (const ruleToTest of rulesToTest) {
    const ruleId = mapping[ruleToTest];

    describe(`Rule ${ruleToTest} (${ruleId})`, function () {
      let tests = null;
  
      tests = actTestCases.testcases
      .filter((t) => t.ruleId === ruleId)
      .map((t) => {
        return {
          title: t.testcaseTitle,
          url: t.url,
          outcome: t.expected,
        };
      });

      for (const test of tests) {
        it(test.title, async function () {
          this.timeout(0);

          const page = await incognito.newPage();
          try {
            const dom = new Dom(page);
            const { sourceHtmlHeadContent } = await dom.process(
              {
                execute: { act: true },
                'act-rules': {
                  rules: [ruleToTest]
                },
                waitUntil: ruleToTest === 'QW-ACT-R4' || ruleToTest === 'QW-ACT-R71' ? ['load', 'networkidle0'] : 'load'
              },
              test.url,
              ''
            );

            await page.addScriptTag({
              path: require.resolve('@qualweb/qw-page')
            });

            await page.addScriptTag({
              path: require.resolve('@qualweb/util')
            });

            await page.addScriptTag({
              path: require.resolve('../dist/act.bundle.js')
            });

            await page.evaluate(
              (locale, options) => {
                window.act = new ACTRules({ translate: locale, fallback: locale }, options);
              },
              locales.default.en,
              { rules: [ruleToTest] }
            );

            if (ruleId === '8a213c') {
              await page.keyboard.press('Tab'); // for R72 that needs to check the first focusable element
            }
            await page.evaluate((sourceHtmlHeadContent) => {
              window.act.validateFirstFocusableElementIsLinkToNonRepeatedContent();

              const parser = new DOMParser();
              const sourceDoc = parser.parseFromString('', 'text/html');

              sourceDoc.head.innerHTML = sourceHtmlHeadContent;

              const elements = sourceDoc.querySelectorAll('meta');
              const metaElements = new Array();
              for (const element of elements) {
                metaElements.push(window.qwPage.createQWElement(element));
              }

              window.act.validateMetaElements(metaElements);
              window.act.executeAtomicRules();
              window.act.executeCompositeRules();
            }, sourceHtmlHeadContent);

            if (ruleId === '59br37') {
              await page.setViewport({
                width: 640,
                height: 512
              });
            }

            const report = await page.evaluate(() => {
              window.act.validateZoomedTextNodeNotClippedWithCSSOverflow();
              return window.act.getReport();
            });

            // Retrieve the outcome. "warning" is QW-specific, so treat that as "cantTell" for these tests.
            const outcome = report.assertions[ruleToTest].metadata.outcome !== 'warning'
              ? report.assertions[ruleToTest].metadata.outcome
              : CANTTELL;

            expect(outcome).to.be.oneOf(consistencyMapping[test.outcome]);
          } finally {
            // Pages should *always* close after the test.
              await page.close();
          }
        });
      }
    });
  }

  after(async () => {
    // Close test bench
    if (incognito) {
      await incognito.close();
    }
    if (browser) {
      await browser.close();
    }
  });
});