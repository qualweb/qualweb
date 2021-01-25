import fetch from 'node-fetch';
import { expect } from 'chai';
import puppeteer from 'puppeteer';
import { Dom } from '@qualweb/dom';

async function getTestCases() {
  const response = await fetch('https://act-rules.github.io/testcases.json');
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
  'QW-ACT-R8': '9eb3f6',
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
  'QW-ACT-R45': 'c6f8a9',
  'QW-ACT-R46': 'a73be2',
  'QW-ACT-R47': 'b8bb68',
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
  'QW-ACT-R65': '307n5z',
  'QW-ACT-R66': 'm6b1q3',
  'QW-ACT-R67': '24afc2',
  'QW-ACT-R68': '78fd32',
  'QW-ACT-R69': '9e45ec',
  'QW-ACT-R70': 'akn7bn',
  'QW-ACT-R71': 'bisz58',
  'QW-ACT-R72': '8a213c'
};

const rule = process.argv[3].toUpperCase();
const ruleId = mapping[rule];

describe(`Rule ${rule}`, function () {
  let browser = null;
  let data = null;
  let tests = null;

  it('Starting testbench', async function () {
    browser = await puppeteer.launch({ headless: false });
    data = await getTestCases();
    tests = data.testcases.filter(t => t.ruleId === ruleId).map(t => {
      return { title: t.testcaseTitle, url: t.url, outcome: t.expected };
    });

    // tests = [
    //   {
    //     title: 'R72',
    //     url: 'http://127.0.0.1/a11y/',
    //     outcome: 'passed'
    //   }
    // ];

    describe('Running tests', function () {
      tests.forEach(function (test) {
        it(test.title, async function () {
          this.timeout(10 * 1000);
          const dom = new Dom();
          const { page } = await dom.getDOM(browser, { execute: { act: true } }, test.url, null);

          await page.addScriptTag({
            path: require.resolve('@qualweb/qw-page').replace('index.js', 'qwPage.js')
          });

          await page.addScriptTag({
            path: require.resolve('../dist/act.js')
          });

          const report = await page.evaluate((rules) => {
            const actRules = new ACTRules.ACTRules(rules);
            const report = actRules.execute([], new QWPage.QWPage(document, window, true));
            return report;
          }, { rules: [rule] });

          expect(report.assertions[rule].metadata.outcome).to.be.equal(test.outcome);
        });
      });
    });

    describe(`Closing testbench`, async function () {
      it(`Closed`, async function () {
        //await browser.close();
      });
    });
  });
});