const {
  configure,
  executeACTR,
  resetConfiguration
} = require('../../dist/index');
const {
  getDom
} = require('@qualweb/get-dom-puppeteer');
const {
  expect
} = require('chai');
const request = require('request-promise');

describe('Rule QW-ACT-R4', function () {

  const URL = 'http://accessible-serv.lasige.di.fc.ul.pt/~jvicente/test/';

  describe('Configuration', function () {
    describe('The rule should...', function () {
      it('...be executed without calling the "configure" function', async function () {
        this.timeout(10 * 1000);
        const {
          source, processed, stylesheets
        } = await getDom(URL);
        const report = await executeACTR(URL, source.html.parsed, processed.html.parsed, stylesheets);
        expect(Object.keys(report.rules)).to.be.an('array').and.to.include('QW-ACT-R4');
      });
      it('...be executed when using rules=["QW-ACT-R4"]', async function () {
        this.timeout(10 * 1000);
        const {
          source, processed, stylesheets
        } = await getDom(URL);
        configure({
          rules: ['QW-ACT-R4']
        });
        const report = await executeACTR(URL, source.html.parsed, processed.html.parsed, stylesheets);
        expect(Object.keys(report.rules)).to.be.an('array').and.to.include('QW-ACT-R4');
      });
      it('...be executed when using rules=["bc659a"]', async function () {
        this.timeout(10 * 1000);
        const {
          source, processed, stylesheets
        } = await getDom(URL);
        configure({
          rules: ['bc659a']
        });
        const report = await executeACTR(URL, source.html.parsed, processed.html.parsed, stylesheets);
        expect(Object.keys(report.rules)).to.be.an('array').and.to.include('QW-ACT-R4');
      });
      it('...be executed when using principle=["Operable"]', async function () {
        this.timeout(10 * 1000);
        const {
          source, processed, stylesheets
        } = await getDom(URL);
        configure({
          principles: ['Operable']
        });
        const report = await executeACTR(URL, source.html.parsed, processed.html.parsed, stylesheets);
        expect(Object.keys(report.rules)).to.be.an('array').and.to.include('QW-ACT-R4');
      });
      it('...be executed when using principle=["Understandable"]', async function () {
        this.timeout(10 * 1000);
        const {
          source, processed, stylesheets
        } = await getDom(URL);
        configure({
          principles: ['Understandable']
        });
        const report = await executeACTR(URL, source.html.parsed, processed.html.parsed, stylesheets);
        expect(Object.keys(report.rules)).to.be.an('array').and.to.include('QW-ACT-R4');
      });
      it('...be executed when using levels=["A"]', async function () {
        this.timeout(10 * 1000);
        const {
          source, processed, stylesheets
        } = await getDom(URL);
        configure({
          levels: ['A']
        });
        const report = await executeACTR(URL, source.html.parsed, processed.html.parsed, stylesheets);
        expect(Object.keys(report.rules)).to.be.an('array').and.to.include('QW-ACT-R4');
      });
      it('...be executed when using levels=["AAA"]', async function () {
        this.timeout(10 * 1000);
        const {
          source, processed, stylesheets
        } = await getDom(URL);
        configure({
          levels: ['AAA']
        });
        const report = await executeACTR(URL, source.html.parsed, processed.html.parsed, stylesheets);
        expect(Object.keys(report.rules)).to.be.an('array').and.to.include('QW-ACT-R4');
      });
      it('...be executed when using principles=["Operable"] and levels=["A"]', async function () {
        this.timeout(10 * 1000);
        const {
          source, processed, stylesheets
        } = await getDom(URL);
        configure({
          principles: ['Operable'],
          levels: ['A']
        });
        const report = await executeACTR(URL, source.html.parsed, processed.html.parsed, stylesheets);
        expect(Object.keys(report.rules)).to.be.an('array').and.to.include('QW-ACT-R4');
      });
      it('...be executed when using principles=["Operable"] and levels=["AAA"]', async function () {
        this.timeout(10 * 1000);
        const {
          source, processed, stylesheets
        } = await getDom(URL);
        configure({
          principles: ['Operable'],
          levels: ['AAA']
        });
        const report = await executeACTR(URL, source.html.parsed, processed.html.parsed, stylesheets);
        expect(Object.keys(report.rules)).to.be.an('array').and.to.include('QW-ACT-R4');
      });
      it('...be executed when using principles=["Understandable"] and levels=["AAA"]', async function () {
        this.timeout(10 * 1000);
        const {
          source, processed, stylesheets
        } = await getDom(URL);
        configure({
          principles: ['Understandable'],
          levels: ['AAA']
        });
        const report = await executeACTR(URL, source.html.parsed, processed.html.parsed, stylesheets);
        expect(Object.keys(report.rules)).to.be.an('array').and.to.include('QW-ACT-R4');
      });
      it('...be executed when using principle=["Perceivable", "Robust"] and levels=["AA"] and rules=["QW-ACT-R4"]', async function () {
        this.timeout(10 * 1000);
        const {
          source, processed, stylesheets
        } = await getDom(URL);
        configure({
          principles: ['Robust', 'Perceivable'],
          levels: ['AA'],
          rules: ['QW-ACT-R4']
        });
        const report = await executeACTR(URL, source.html.parsed, processed.html.parsed, stylesheets);
        expect(Object.keys(report.rules)).to.be.an('array').and.to.include('QW-ACT-R4');
      });
    });

    describe('The rule should not...', function () {
      it('...be executed when using other than rules=["QW-ACT-R4"] or rules=["bc659a"]', async function () {
        this.timeout(10 * 1000);
        const {
          source, processed, stylesheets
        } = await getDom(URL);
        configure({
          rules: ['QW-ACT-R2']
        });
        const report = await executeACTR(URL, source.html.parsed, processed.html.parsed, stylesheets);
        expect(Object.keys(report.rules)).to.be.an('array').and.to.not.include('QW-ACT-R4');
      });
      it('...be executed when using principle=["Perceivable"]', async function () {
        this.timeout(10 * 1000);
        const {
          source, processed, stylesheets
        } = await getDom(URL);
        configure({
          principles: ['Perceivable']
        });
        const report = await executeACTR(URL, source.html.parsed, processed.html.parsed, stylesheets);
        expect(Object.keys(report.rules)).to.be.an('array').and.to.not.include('QW-ACT-R4');
      });
      it('...be executed when using principle=["Robust"]', async function () {
        this.timeout(10 * 1000);
        const {
          source, processed, stylesheets
        } = await getDom(URL);
        configure({
          principles: ['Robust']
        });
        const report = await executeACTR(URL, source.html.parsed, processed.html.parsed, stylesheets);
        expect(Object.keys(report.rules)).to.be.an('array').and.to.not.include('QW-ACT-R4');
      });
      it('...be executed when using levels=["AA"]', async function () {
        this.timeout(10 * 1000);
        const {
          source, processed, stylesheets
        } = await getDom(URL);
        configure({
          levels: ['AA']
        });
        const report = await executeACTR(URL, source.html.parsed, processed.html.parsed, stylesheets);
        expect(Object.keys(report.rules)).to.be.an('array').and.to.not.include('QW-ACT-R4');
      });
      it('...be executed when using principle=["Operable"] and levels=["AA"]', async function () {
        this.timeout(10 * 1000);
        const {
          source, processed, stylesheets
        } = await getDom(URL);
        configure({
          principles: ['Operable'],
          levels: ['AA']
        });
        const report = await executeACTR(URL, source.html.parsed, processed.html.parsed, stylesheets);
        expect(Object.keys(report.rules)).to.be.an('array').and.to.not.include('QW-ACT-R4');
      });
      it('...be executed when using principle=["Understandable"] and levels=["A"]', async function () {
        this.timeout(10 * 1000);
        const {
          source, processed, stylesheets
        } = await getDom(URL);
        configure({
          principles: ['Understandable'],
          levels: ['A']
        });
        const report = await executeACTR(URL, source.html.parsed, processed.html.parsed, stylesheets);
        expect(Object.keys(report.rules)).to.be.an('array').and.to.not.include('QW-ACT-R4');
      });
      it('...be executed when using principle=["Understandable"] and levels=["AA"]', async function () {
        this.timeout(10 * 1000);
        const {
          source, processed, stylesheets
        } = await getDom(URL);
        configure({
          principles: ['Understandable'],
          levels: ['AA']
        });
        const report = await executeACTR(URL, source.html.parsed, processed.html.parsed, stylesheets);
        expect(Object.keys(report.rules)).to.be.an('array').and.to.not.include('QW-ACT-R4');
      });
      it('...be executed when using principle=["Perceivable"] and levels=["A"]', async function () {
        this.timeout(10 * 1000);
        const {
          source, processed, stylesheets
        } = await getDom(URL);
        configure({
          principles: ['Perceivable'],
          levels: ['A']
        });
        const report = await executeACTR(URL, source.html.parsed, processed.html.parsed, stylesheets);
        expect(Object.keys(report.rules)).to.be.an('array').and.to.not.include('QW-ACT-R4');
      });
      it('...be executed when using principle=["Perceivable"] and levels=["AAA"]', async function () {
        this.timeout(10 * 1000);
        const {
          source, processed, stylesheets
        } = await getDom(URL);
        configure({
          principles: ['Perceivable'],
          levels: ['AAA']
        });
        const report = await executeACTR(URL, source.html.parsed, processed.html.parsed, stylesheets);
        expect(Object.keys(report.rules)).to.be.an('array').and.to.not.include('QW-ACT-R4');
      });
      it('...be executed when using principle=["Robust"] and levels=["A"]', async function () {
        this.timeout(10 * 1000);
        const {
          source, processed, stylesheets
        } = await getDom(URL);
        configure({
          principles: ['Robust'],
          levels: ['A']
        });
        const report = await executeACTR(URL, source.html.parsed, processed.html.parsed, stylesheets);
        expect(Object.keys(report.rules)).to.be.an('array').and.to.not.include('QW-ACT-R4');
      });
      it('...be executed when using principle=["Robust"] and levels=["AAA"]', async function () {
        this.timeout(10 * 1000);
        const {
          source, processed, stylesheets
        } = await getDom(URL);
        configure({
          principles: ['Robust'],
          levels: ['AAA']
        });
        const report = await executeACTR(URL, source.html.parsed, processed.html.parsed, stylesheets);
        expect(Object.keys(report.rules)).to.be.an('array').and.to.not.include('QW-ACT-R4');
      });
    });
  });

  afterEach(function() {
    resetConfiguration();
  });

  const ruleId = 'bc659a';
  let testCases = [];

  before('Downloading tests cases', async function () {
    const json = JSON.parse(await request('https://act-rules.github.io/testcases.json'));
    testCases = json.testcases.filter(tc => tc.ruleId === ruleId);
  });

  setTimeout(function () {
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
          this.timeout(10 * 10000);
          const {
            source,
            processed,
            stylesheets
          } = await getDom(test.url);
          configure({
            rules: ['QW-ACT-R4']
          });
          const report = await executeACTR(test.url, source.html.parsed, processed.html.parsed, stylesheets);
          expect(report.rules['QW-ACT-R4'].metadata.outcome).to.be.equal(test.expected);
        });
      });
    }
  }, 5000);
});