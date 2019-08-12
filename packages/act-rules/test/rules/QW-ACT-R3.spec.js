const {
  configure,
  executeACTR
} = require('../../dist/index');
const {
  getDom
} = require('@qualweb/get-dom-puppeteer');
const { expect } = require('chai');

describe('Rule QW-ACT-R3', function () {

  const URL = 'http://accessible-serv.lasige.di.fc.ul.pt/~jvicente/test/';

  describe('Configuration', function () {
    describe('The rule should...', function() {
      it('...be executed without calling the "configure" function', async function () {
        this.timeout(10 * 1000);
        const { source, processed } = await getDom(URL);
        const report = await executeACTR(source.html.parsed, processed.html.parsed);
        expect(Object.keys(report.rules)).to.be.an('array').and.to.include('QW-ACT-R3');
      });
      it('...be executed when using rules=["QW-ACT-R3"]', async function () {
        this.timeout(10 * 1000);
        const { source, processed } = await getDom(URL);
        configure({
          rules: ['QW-ACT-R3']
        });
        const report = await executeACTR(source.html.parsed, processed.html.parsed);
        expect(Object.keys(report.rules)).to.be.an('array').and.to.include('QW-ACT-R3');
      });
      it('...be executed when using rules=["5b7ae0"]', async function () {
        this.timeout(10 * 1000);
        const { source, processed } = await getDom(URL);
        configure({
          rules: ['5b7ae0']
        });
        const report = await executeACTR(source.html.parsed, processed.html.parsed);
        expect(Object.keys(report.rules)).to.be.an('array').and.to.include('QW-ACT-R3');
      });
      it('...be executed when using principle=["Understandable"]', async function () {
        this.timeout(10 * 1000);
        const { source, processed } = await getDom(URL);
        configure({
          principles: ['Understandable']
        });
        const report = await executeACTR(source.html.parsed, processed.html.parsed);
        expect(Object.keys(report.rules)).to.be.an('array').and.to.include('QW-ACT-R3');
      });
      it('...be executed when using levels=["A"]', async function () {
        this.timeout(10 * 1000);
        const { source, processed } = await getDom(URL);
        configure({
          levels: ['A']
        });
        const report = await executeACTR(source.html.parsed, processed.html.parsed);
        expect(Object.keys(report.rules)).to.be.an('array').and.to.include('QW-ACT-R3');
      });
      it('...be executed when using principles=["Understandable"] and levels=["A"]', async function () {
        this.timeout(10 * 1000);
        const { source, processed } = await getDom(URL);
        configure({
          principles: ['Understandable'],
          levels: ['A']
        });
        const report = await executeACTR(source.html.parsed, processed.html.parsed);
        expect(Object.keys(report.rules)).to.be.an('array').and.to.include('QW-ACT-R3');
      });
      it('...be executed when using principle=["Perceivable", "Operable", "Robust"] and levels=["AA", "AAA"] and rules=["QW-ACT-R3"]', async function () {
        this.timeout(10 * 1000);
        const { source, processed } = await getDom(URL);
        configure({
          principles: ['Robust', 'Operable', 'Perceivable'],
          levels: ['AA', 'AAA'],
          rules: ['QW-ACT-R3']
        });
        const report = await executeACTR(source.html.parsed, processed.html.parsed);
        expect(Object.keys(report.rules)).to.be.an('array').and.to.include('QW-ACT-R3');
      });
    });

    describe('The rule should not...', function() {
      it('...be executed when using other than rules=["QW-ACT-R3"] or rules=["5b7ae0"]', async function () {
        this.timeout(10 * 1000);
        const { source, processed } = await getDom(URL);
        configure({
          rules: ['QW-ACT-R2']
        });
        const report = await executeACTR(source.html.parsed, processed.html.parsed);
        expect(Object.keys(report.rules)).to.be.an('array').and.to.not.include('QW-ACT-R3');
      });
      it('...be executed when using principle=["Perceivable"]', async function () {
        this.timeout(10 * 1000);
        const { source, processed } = await getDom(URL);
        configure({
          principles: ['Perceivable']
        });
        const report = await executeACTR(source.html.parsed, processed.html.parsed);
        expect(Object.keys(report.rules)).to.be.an('array').and.to.not.include('QW-ACT-R3');
      });
      it('...be executed when using principle=["Operable"]', async function () {
        this.timeout(10 * 1000);
        const { source, processed } = await getDom(URL);
        configure({
          principles: ['Operable']
        });
        const report = await executeACTR(source.html.parsed, processed.html.parsed);
        expect(Object.keys(report.rules)).to.be.an('array').and.to.not.include('QW-ACT-R3');
      });
      it('...be executed when using principle=["Robust"]', async function () {
        this.timeout(10 * 1000);
        const { source, processed } = await getDom(URL);
        configure({
          principles: ['Robust']
        });
        const report = await executeACTR(source.html.parsed, processed.html.parsed);
        expect(Object.keys(report.rules)).to.be.an('array').and.to.not.include('QW-ACT-R3');
      });
      it('...be executed when using levels=["AA"]', async function () {
        this.timeout(10 * 1000);
        const { source, processed } = await getDom(URL);
        configure({
          levels: ['AA']
        });
        const report = await executeACTR(source.html.parsed, processed.html.parsed);
        expect(Object.keys(report.rules)).to.be.an('array').and.to.not.include('QW-ACT-R3');
      });
      it('...be executed when using levels=["AAA"]', async function () {
        this.timeout(10 * 1000);
        const { source, processed } = await getDom(URL);
        configure({
          levels: ['AAA']
        });
        const report = await executeACTR(source.html.parsed, processed.html.parsed);
        expect(Object.keys(report.rules)).to.be.an('array').and.to.not.include('QW-ACT-R3');
      });
      it('...be executed when using principle=["Understandable"] and levels=["AA"]', async function () {
        this.timeout(10 * 1000);
        const { source, processed } = await getDom(URL);
        configure({
          principles: ['Understandable'],
          levels: ['AA']
        });
        const report = await executeACTR(source.html.parsed, processed.html.parsed);
        expect(Object.keys(report.rules)).to.be.an('array').and.to.not.include('QW-ACT-R3');
      });
      it('...be executed when using principle=["Understandable"] and levels=["AAA"]', async function () {
        this.timeout(10 * 1000);
        const { source, processed } = await getDom(URL);
        configure({
          principles: ['Understandable'],
          levels: ['AAA']
        });
        const report = await executeACTR(source.html.parsed, processed.html.parsed);
        expect(Object.keys(report.rules)).to.be.an('array').and.to.not.include('QW-ACT-R3');
      });
      it('...be executed when using principle=["Perceivable"] and levels=["A"]', async function () {
        this.timeout(10 * 1000);
        const { source, processed } = await getDom(URL);
        configure({
          principles: ['Perceivable'],
          levels: ['A']
        });
        const report = await executeACTR(source.html.parsed, processed.html.parsed);
        expect(Object.keys(report.rules)).to.be.an('array').and.to.not.include('QW-ACT-R3');
      });
      it('...be executed when using principle=["Operable"] and levels=["A"]', async function () {
        this.timeout(10 * 1000);
        const { source, processed } = await getDom(URL);
        configure({
          principles: ['Operable'],
          levels: ['A']
        });
        const report = await executeACTR(source.html.parsed, processed.html.parsed);
        expect(Object.keys(report.rules)).to.be.an('array').and.to.not.include('QW-ACT-R3');
      });
      it('...be executed when using principle=["Robust"] and levels=["A"]', async function () {
        this.timeout(10 * 1000);
        const { source, processed } = await getDom(URL);
        configure({
          principles: ['Robust'],
          levels: ['A']
        });
        const report = await executeACTR(source.html.parsed, processed.html.parsed);
        expect(Object.keys(report.rules)).to.be.an('array').and.to.not.include('QW-ACT-R3');
      });
    });
  });

  const tests = [
    {
      url: 'https://act-rules.github.io/testcases/5b7ae0/e3391915b6e4ca2f63959f602230762da13c756b.html',
      outcome: 'passed'
    },
    {
      url: 'https://act-rules.github.io/testcases/5b7ae0/c38e4da6949ef7c73fa7060e6c0f3a528fb807a2.html',
      outcome: 'passed'
    },
    {
      url: 'https://act-rules.github.io/testcases/5b7ae0/ac2af59a26032d003e22bb8e49e73e39baa8e508.html',
      outcome: 'passed'
    },
    {
      url: 'https://act-rules.github.io/testcases/5b7ae0/56a878567758376953caa80759ab3274b297ca3f.html',
      outcome: 'passed'
    },
    {
      url: 'https://act-rules.github.io/testcases/5b7ae0/d8e598008c70250101d5983d0e94403332486129.html',
      outcome: 'passed'
    },
    {
      url: 'https://act-rules.github.io/testcases/5b7ae0/b8d450119f62c913c36a618d0419426b85a01253.html',
      outcome: 'failed'
    },
    {
      url: 'https://act-rules.github.io/testcases/5b7ae0/9d1397438bea784d70e961a2abcbdd7b7c2f7d9f.svg',
      outcome: 'inapplicable'
    },
    {
      url: 'https://act-rules.github.io/testcases/5b7ae0/06a45142f4e6e5d2feccc108ffc223b6fa0a1851.html',
      outcome: 'inapplicable'
    },
    {
      url: 'https://act-rules.github.io/testcases/5b7ae0/ff391832901abd30b4bce209063fdc693321dbe1.html',
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
          rules: ['QW-ACT-R3']
        });
        const report = await executeACTR(source.html.parsed, processed.html.parsed);
        expect(report.rules['QW-ACT-R3'].metadata.outcome).to.be.equal(test.outcome);
      });
    });
  }
});