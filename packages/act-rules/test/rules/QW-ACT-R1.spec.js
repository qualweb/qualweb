const {
  configure,
  executeACTR
} = require('../../dist/index');
const {
  getDom
} = require('@qualweb/get-dom-puppeteer');
const { expect } = require('chai');

describe('Rule QW-ACT-R1', function () {
  
  const URL = 'http://accessible-serv.lasige.di.fc.ul.pt/~jvicente/test/';

  describe('Configuration', function () {
    describe('The rule should...', function() {
      it('...be executed without calling the "configure" function', async function () {
        this.timeout(10 * 1000);
        const { source, processed } = await getDom(URL);
        const report = await executeACTR(source.html.parsed, processed.html.parsed);
        expect(Object.keys(report.rules)).to.be.an('array').and.to.include('QW-ACT-R1');
      });
      it('...be executed when using rules=["QW-ACT-R1"]', async function () {
        this.timeout(10 * 1000);
        const { source, processed } = await getDom(URL);
        configure({
          rules: ['QW-ACT-R1']
        });
        const report = await executeACTR(source.html.parsed, processed.html.parsed);
        expect(Object.keys(report.rules)).to.be.an('array').and.to.include('QW-ACT-R1');
      });
      it('...be executed when using rules=["2779a5"]', async function () {
        this.timeout(10 * 1000);
        const { source, processed } = await getDom(URL);
        configure({
          rules: ['2779a5']
        });
        const report = await executeACTR(source.html.parsed, processed.html.parsed);
        expect(Object.keys(report.rules)).to.be.an('array').and.to.include('QW-ACT-R1');
      });
      it('...be executed when using principle=["Operable"]', async function () {
        this.timeout(10 * 1000);
        const { source, processed } = await getDom(URL);
        configure({
          principles: ['Operable']
        });
        const report = await executeACTR(source.html.parsed, processed.html.parsed);
        expect(Object.keys(report.rules)).to.be.an('array').and.to.include('QW-ACT-R1');
      });
      it('...be executed when using levels=["A"]', async function () {
        this.timeout(10 * 1000);
        const { source, processed } = await getDom(URL);
        configure({
          levels: ['A']
        });
        const report = await executeACTR(source.html.parsed, processed.html.parsed);
        expect(Object.keys(report.rules)).to.be.an('array').and.to.include('QW-ACT-R1');
      });
      it('...be executed when using principles=["Operable"] and levels=["A"]', async function () {
        this.timeout(10 * 1000);
        const { source, processed } = await getDom(URL);
        configure({
          principles: ['Operable'],
          levels: ['A']
        });
        const report = await executeACTR(source.html.parsed, processed.html.parsed);
        expect(Object.keys(report.rules)).to.be.an('array').and.to.include('QW-ACT-R1');
      });
      it('...be executed when using principle=["Perceivable", "Understandable", "Robust"] and levels=["AA", "AAA"] and rules=["QW-ACT-R1"]', async function () {
        this.timeout(10 * 1000);
        const { source, processed } = await getDom(URL);
        configure({
          principles: ['Robust', 'Understandable', 'Perceivable'],
          levels: ['AA', 'AAA'],
          rules: ['QW-ACT-R1']
        });
        const report = await executeACTR(source.html.parsed, processed.html.parsed);
        expect(Object.keys(report.rules)).to.be.an('array').and.to.include('QW-ACT-R1');
      });
    });

    describe('The rule should not...', function() {
      it('...be executed when using other than rules=["QW-ACT-R1"] or rules=["2779a5"]', async function () {
        this.timeout(10 * 1000);
        const { source, processed } = await getDom(URL);
        configure({
          rules: ['QW-ACT-R2']
        });
        const report = await executeACTR(source.html.parsed, processed.html.parsed);
        expect(Object.keys(report.rules)).to.be.an('array').and.to.not.include('QW-ACT-R1');
      });
      it('...be executed when using principle=["Perceivable"]', async function () {
        this.timeout(10 * 1000);
        const { source, processed } = await getDom(URL);
        configure({
          principles: ['Perceivable']
        });
        const report = await executeACTR(source.html.parsed, processed.html.parsed);
        expect(Object.keys(report.rules)).to.be.an('array').and.to.not.include('QW-ACT-R1');
      });
      it('...be executed when using principle=["Understandable"]', async function () {
        this.timeout(10 * 1000);
        const { source, processed } = await getDom(URL);
        configure({
          principles: ['Understandable']
        });
        const report = await executeACTR(source.html.parsed, processed.html.parsed);
        expect(Object.keys(report.rules)).to.be.an('array').and.to.not.include('QW-ACT-R1');
      });
      it('...be executed when using principle=["Robust"]', async function () {
        this.timeout(10 * 1000);
        const { source, processed } = await getDom(URL);
        configure({
          principles: ['Robust']
        });
        const report = await executeACTR(source.html.parsed, processed.html.parsed);
        expect(Object.keys(report.rules)).to.be.an('array').and.to.not.include('QW-ACT-R1');
      });
      it('...be executed when using levels=["AA"]', async function () {
        this.timeout(10 * 1000);
        const { source, processed } = await getDom(URL);
        configure({
          levels: ['AA']
        });
        const report = await executeACTR(source.html.parsed, processed.html.parsed);
        expect(Object.keys(report.rules)).to.be.an('array').and.to.not.include('QW-ACT-R1');
      });
      it('...be executed when using levels=["AAA"]', async function () {
        this.timeout(10 * 1000);
        const { source, processed } = await getDom(URL);
        configure({
          levels: ['AAA']
        });
        const report = await executeACTR(source.html.parsed, processed.html.parsed);
        expect(Object.keys(report.rules)).to.be.an('array').and.to.not.include('QW-ACT-R1');
      });
      it('...be executed when using principle=["Operable"] and levels=["AA"]', async function () {
        this.timeout(10 * 1000);
        const { source, processed } = await getDom(URL);
        configure({
          principles: ['Operable'],
          levels: ['AA']
        });
        const report = await executeACTR(source.html.parsed, processed.html.parsed);
        expect(Object.keys(report.rules)).to.be.an('array').and.to.not.include('QW-ACT-R1');
      });
      it('...be executed when using principle=["Operable"] and levels=["AAA"]', async function () {
        this.timeout(10 * 1000);
        const { source, processed } = await getDom(URL);
        configure({
          principles: ['Operable'],
          levels: ['AAA']
        });
        const report = await executeACTR(source.html.parsed, processed.html.parsed);
        expect(Object.keys(report.rules)).to.be.an('array').and.to.not.include('QW-ACT-R1');
      });
      it('...be executed when using principle=["Perceivable"] and levels=["A"]', async function () {
        this.timeout(10 * 1000);
        const { source, processed } = await getDom(URL);
        configure({
          principles: ['Perceivable'],
          levels: ['A']
        });
        const report = await executeACTR(source.html.parsed, processed.html.parsed);
        expect(Object.keys(report.rules)).to.be.an('array').and.to.not.include('QW-ACT-R1');
      });
      it('...be executed when using principle=["Understandable"] and levels=["A"]', async function () {
        this.timeout(10 * 1000);
        const { source, processed } = await getDom(URL);
        configure({
          principles: ['Understandable'],
          levels: ['A']
        });
        const report = await executeACTR(source.html.parsed, processed.html.parsed);
        expect(Object.keys(report.rules)).to.be.an('array').and.to.not.include('QW-ACT-R1');
      });
      it('...be executed when using principle=["Robust"] and levels=["A"]', async function () {
        this.timeout(10 * 1000);
        const { source, processed } = await getDom(URL);
        configure({
          principles: ['Robust'],
          levels: ['A']
        });
        const report = await executeACTR(source.html.parsed, processed.html.parsed);
        expect(Object.keys(report.rules)).to.be.an('array').and.to.not.include('QW-ACT-R1');
      });
    });
  });

  const tests = [
    {
      url: 'https://act-rules.github.io/testcases/2779a5/15b0afb2496c5e7bf5ff0409cb5b39a8d5ae234b.html',
      outcome: 'passed'
    },
    {
      url: 'https://act-rules.github.io/testcases/2779a5/a41f13266a8e5ed73446344769c53d272c272fb6.html',
      outcome: 'passed'
    },
    {
      url: 'https://act-rules.github.io/testcases/2779a5/bf1b811b607247364c2322dd45c047f2e3211229.html',
      outcome: 'passed'
    },
    {
      url: 'https://act-rules.github.io/testcases/2779a5/2938f229ef636ed99cd23a3d1e8315131a1215cd.html',
      outcome: 'passed'
    },
    {
      url: 'https://act-rules.github.io/testcases/2779a5/7c4ace0d67554bfb9917bce8965917de6c8a29f3.html',
      outcome: 'passed'
    },
    {
      url: 'https://act-rules.github.io/testcases/2779a5/a49a08353a9370e068946b4089b5cdb51ff09a11.html',
      outcome: 'passed'
    },
    {
      url: 'https://act-rules.github.io/testcases/2779a5/676e3ccf785aa2315dda455217694b55f9a279aa.html',
      outcome: 'failed'
    },
    {
      url: 'https://act-rules.github.io/testcases/2779a5/c425dc0257c8b895f1821219e880823561ffef3d.html',
      outcome: 'failed'
    },
    {
      url: 'https://act-rules.github.io/testcases/2779a5/a0fb39dac79555bc721c3cf0a5c586887ceebf54.html',
      outcome: 'failed'
    },
    {
      url: 'https://act-rules.github.io/testcases/2779a5/d7c4202aa42aefe7f687247d289acd1b0ad44790.html',
      outcome: 'failed'
    },
    {
      url: 'https://act-rules.github.io/testcases/2779a5/9619e9f28b767e8f5bd2fbf3e918df1f3859c9f4.html',
      outcome: 'failed'
    },
    {
      url: 'https://act-rules.github.io/testcases/2779a5/af48a346ab1ee73d2b043e6346cadfad60d36aa4.svg',
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
        configure({
          rules: ['QW-ACT-R1']
        });
        const report = await executeACTR(source.html.parsed, processed.html.parsed);
        expect(report.rules['QW-ACT-R1'].metadata.outcome).to.be.equal(test.outcome);
      });
    });
  }
});