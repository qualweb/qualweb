const {
  configure,
  executeACTR
} = require('../../dist/index');
const {
  getDom
} = require('@qualweb/get-dom-puppeteer');
const { expect } = require('chai');

describe('Rule QW-ACT-R2', function () {

  const URL = 'http://accessible-serv.lasige.di.fc.ul.pt/~jvicente/test/';

  describe('Configuration', function () {
    describe('The rule should...', function() {
      it('...be executed without calling the "configure" function', async function () {
        this.timeout(10 * 1000);
        const { source, processed } = await getDom(URL);
        const report = await executeACTR(source.html.parsed, processed.html.parsed);
        expect(Object.keys(report.rules)).to.be.an('array').and.to.include('QW-ACT-R2');
      });
      it('...be executed when using rules=["QW-ACT-R2"]', async function () {
        this.timeout(10 * 1000);
        const { source, processed } = await getDom(URL);
        configure({
          rules: ['QW-ACT-R2']
        });
        const report = await executeACTR(source.html.parsed, processed.html.parsed);
        expect(Object.keys(report.rules)).to.be.an('array').and.to.include('QW-ACT-R2');
      });
      it('...be executed when using rules=["b5c3f8"]', async function () {
        this.timeout(10 * 1000);
        const { source, processed } = await getDom(URL);
        configure({
          rules: ['b5c3f8']
        });
        const report = await executeACTR(source.html.parsed, processed.html.parsed);
        expect(Object.keys(report.rules)).to.be.an('array').and.to.include('QW-ACT-R2');
      });
      it('...be executed when using principle=["Understandable"]', async function () {
        this.timeout(10 * 1000);
        const { source, processed } = await getDom(URL);
        configure({
          principles: ['Understandable']
        });
        const report = await executeACTR(source.html.parsed, processed.html.parsed);
        expect(Object.keys(report.rules)).to.be.an('array').and.to.include('QW-ACT-R2');
      });
      it('...be executed when using levels=["A"]', async function () {
        this.timeout(10 * 1000);
        const { source, processed } = await getDom(URL);
        configure({
          levels: ['A']
        });
        const report = await executeACTR(source.html.parsed, processed.html.parsed);
        expect(Object.keys(report.rules)).to.be.an('array').and.to.include('QW-ACT-R2');
      });
      it('...be executed when using principles=["Understandable"] and levels=["A"]', async function () {
        this.timeout(10 * 1000);
        const { source, processed } = await getDom(URL);
        configure({
          principles: ['Understandable'],
          levels: ['A']
        });
        const report = await executeACTR(source.html.parsed, processed.html.parsed);
        expect(Object.keys(report.rules)).to.be.an('array').and.to.include('QW-ACT-R2');
      });
      it('...be executed when using principle=["Perceivable", "Operable", "Robust"] and levels=["AA", "AAA"] and rules=["QW-ACT-R2"]', async function () {
        this.timeout(10 * 1000);
        const { source, processed } = await getDom(URL);
        configure({
          principles: ['Robust', 'Operable', 'Perceivable'],
          levels: ['AA', 'AAA'],
          rules: ['QW-ACT-R2']
        });
        const report = await executeACTR(source.html.parsed, processed.html.parsed);
        expect(Object.keys(report.rules)).to.be.an('array').and.to.include('QW-ACT-R2');
      });
    });

    describe('The rule should not...', function() {
      it('...be executed when using other than rules=["QW-ACT-R2"] or rules=["b5c3f8"]', async function () {
        this.timeout(10 * 1000);
        const { source, processed } = await getDom(URL);
        configure({
          rules: ['QW-ACT-R1']
        });
        const report = await executeACTR(source.html.parsed, processed.html.parsed);
        expect(Object.keys(report.rules)).to.be.an('array').and.to.not.include('QW-ACT-R2');
      });
      it('...be executed when using principle=["Perceivable"]', async function () {
        this.timeout(10 * 1000);
        const { source, processed } = await getDom(URL);
        configure({
          principles: ['Perceivable']
        });
        const report = await executeACTR(source.html.parsed, processed.html.parsed);
        expect(Object.keys(report.rules)).to.be.an('array').and.to.not.include('QW-ACT-R2');
      });
      it('...be executed when using principle=["Operable"]', async function () {
        this.timeout(10 * 1000);
        const { source, processed } = await getDom(URL);
        configure({
          principles: ['Operable']
        });
        const report = await executeACTR(source.html.parsed, processed.html.parsed);
        expect(Object.keys(report.rules)).to.be.an('array').and.to.not.include('QW-ACT-R2');
      });
      it('...be executed when using principle=["Robust"]', async function () {
        this.timeout(10 * 1000);
        const { source, processed } = await getDom(URL);
        configure({
          principles: ['Robust']
        });
        const report = await executeACTR(source.html.parsed, processed.html.parsed);
        expect(Object.keys(report.rules)).to.be.an('array').and.to.not.include('QW-ACT-R2');
      });
      it('...be executed when using levels=["AA"]', async function () {
        this.timeout(10 * 1000);
        const { source, processed } = await getDom(URL);
        configure({
          levels: ['AA']
        });
        const report = await executeACTR(source.html.parsed, processed.html.parsed);
        expect(Object.keys(report.rules)).to.be.an('array').and.to.not.include('QW-ACT-R2');
      });
      it('...be executed when using levels=["AAA"]', async function () {
        this.timeout(10 * 1000);
        const { source, processed } = await getDom(URL);
        configure({
          levels: ['AAA']
        });
        const report = await executeACTR(source.html.parsed, processed.html.parsed);
        expect(Object.keys(report.rules)).to.be.an('array').and.to.not.include('QW-ACT-R2');
      });
      it('...be executed when using principle=["Understandable"] and levels=["AA"]', async function () {
        this.timeout(10 * 1000);
        const { source, processed } = await getDom(URL);
        configure({
          principles: ['Understandable'],
          levels: ['AA']
        });
        const report = await executeACTR(source.html.parsed, processed.html.parsed);
        expect(Object.keys(report.rules)).to.be.an('array').and.to.not.include('QW-ACT-R2');
      });
      it('...be executed when using principle=["Understandable"] and levels=["AAA"]', async function () {
        this.timeout(10 * 1000);
        const { source, processed } = await getDom(URL);
        configure({
          principles: ['Understandable'],
          levels: ['AAA']
        });
        const report = await executeACTR(source.html.parsed, processed.html.parsed);
        expect(Object.keys(report.rules)).to.be.an('array').and.to.not.include('QW-ACT-R2');
      });
      it('...be executed when using principle=["Perceivable"] and levels=["A"]', async function () {
        this.timeout(10 * 1000);
        const { source, processed } = await getDom(URL);
        configure({
          principles: ['Perceivable'],
          levels: ['A']
        });
        const report = await executeACTR(source.html.parsed, processed.html.parsed);
        expect(Object.keys(report.rules)).to.be.an('array').and.to.not.include('QW-ACT-R2');
      });
      it('...be executed when using principle=["Operable"] and levels=["A"]', async function () {
        this.timeout(10 * 1000);
        const { source, processed } = await getDom(URL);
        configure({
          principles: ['Operable'],
          levels: ['A']
        });
        const report = await executeACTR(source.html.parsed, processed.html.parsed);
        expect(Object.keys(report.rules)).to.be.an('array').and.to.not.include('QW-ACT-R2');
      });
      it('...be executed when using principle=["Robust"] and levels=["A"]', async function () {
        this.timeout(10 * 1000);
        const { source, processed } = await getDom(URL);
        configure({
          principles: ['Robust'],
          levels: ['A']
        });
        const report = await executeACTR(source.html.parsed, processed.html.parsed);
        expect(Object.keys(report.rules)).to.be.an('array').and.to.not.include('QW-ACT-R2');
      });
    });
  });

  const tests = [
    {
      url: 'https://act-rules.github.io/testcases/b5c3f8/e8c6920a352d46ff2cf6257e8e4cbcc4e574797f.html',
      outcome: 'passed'
    },
    {
      url: 'https://act-rules.github.io/testcases/b5c3f8/1a34a7d427f335d39867e8e706057357ba4a7fb0.html',
      outcome: 'passed'
    },
    {
      url: 'https://act-rules.github.io/testcases/b5c3f8/b9e26c1db931217d8455574f1b226610c8e7ffa6.html',
      outcome: 'passed'
    },
    {
      url: 'https://act-rules.github.io/testcases/b5c3f8/4f0fdf35fcceb1bf73eb53a004cd4260af63c2b1.html',
      outcome: 'passed'
    },
    {
      url: 'https://act-rules.github.io/testcases/b5c3f8/19ab5124623c09399dd5d6aeb0b082e11b1fc9a1.html',
      outcome: 'passed'
    },
    {
      url: 'https://act-rules.github.io/testcases/b5c3f8/5654d066bd34f1e545de170902278a2eed9587c6.html',
      outcome: 'passed'
    },
    {
      url: 'https://act-rules.github.io/testcases/b5c3f8/481f5bacb412fa5d941f592b722d0e64db6237f2.html',
      outcome: 'passed'
    },
    {
      url: 'https://act-rules.github.io/testcases/b5c3f8/95d4de2553c921e135274433a6dba408ac19d8fa.html',
      outcome: 'passed'
    },
    {
      url: 'https://act-rules.github.io/testcases/b5c3f8/45b857371c1239393d10e9ebe3d60adcad96f192.html',
      outcome: 'passed'
    },
    {
      url: 'https://act-rules.github.io/testcases/b5c3f8/cb40f44ed89775e7774102ac9c431e1b5e818dc9.html',
      outcome: 'passed'
    },
    {
      url: 'https://act-rules.github.io/testcases/b5c3f8/c728f6e0d5175040383c5410a68fa7512d7a0586.html',
      outcome: 'failed'
    },
    {
      url: 'https://act-rules.github.io/testcases/b5c3f8/9004a706c2100c6649e7c64a1ffa673d5c185dc7.html',
      outcome: 'failed'
    },
    {
      url: 'https://act-rules.github.io/testcases/b5c3f8/6c23d52df135e149a1849886ab9ec190ebc6fe3f.html',
      outcome: 'failed'
    },
    {
      url: 'https://act-rules.github.io/testcases/b5c3f8/00d53f76d0fe833b15e9fd0cb178267b2c0dd96c.html',
      outcome: 'failed'
    },
    {
      url: 'https://act-rules.github.io/testcases/b5c3f8/d7564695869ac55c02956ec17844d69ab6c28907.svg',
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
        configure({ rules: ['QW-ACT-R2'] });
        const report = await executeACTR(source.html.parsed, processed.html.parsed);
        expect(report.rules['QW-ACT-R2'].metadata.outcome).to.be.equal(test.outcome);
      });
    });
  }
});