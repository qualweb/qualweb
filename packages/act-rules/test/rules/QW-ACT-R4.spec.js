const {
  configure,
  executeACTR
} = require('../../dist/index');
const {
  getDom
} = require('@qualweb/get-dom-puppeteer');
const {
  expect
} = require('chai');

describe('Rule QW-ACT-R4', function () {

  const URL = 'http://accessible-serv.lasige.di.fc.ul.pt/~jvicente/test/';

  describe('Configuration', function () {
    describe('The rule should...', function () {
      it('...be executed without calling the "configure" function', async function () {
        this.timeout(10 * 1000);
        const { source, processed } = await getDom(URL);
        const report = await executeACTR(source.html.parsed, processed.html.parsed);
        expect(Object.keys(report.rules)).to.be.an('array').and.to.include('QW-ACT-R4');
      });
      it('...be executed when using rules=["QW-ACT-R4"]', async function () {
        this.timeout(10 * 1000);
        const { source, processed } = await getDom(URL);
        configure({
          rules: ['QW-ACT-R4']
        });
        const report = await executeACTR(source.html.parsed, processed.html.parsed);
        expect(Object.keys(report.rules)).to.be.an('array').and.to.include('QW-ACT-R4');
      });
      it('...be executed when using rules=["bc659a"]', async function () {
        this.timeout(10 * 1000);
        const { source, processed } = await getDom(URL);
        configure({
          rules: ['bc659a']
        });
        const report = await executeACTR(source.html.parsed, processed.html.parsed);
        expect(Object.keys(report.rules)).to.be.an('array').and.to.include('QW-ACT-R4');
      });
      it('...be executed when using principle=["Operable"]', async function () {
        this.timeout(10 * 1000);
        const { source, processed } = await getDom(URL);
        configure({
          principles: ['Operable']
        });
        const report = await executeACTR(source.html.parsed, processed.html.parsed);
        expect(Object.keys(report.rules)).to.be.an('array').and.to.include('QW-ACT-R4');
      });
      it('...be executed when using principle=["Understandable"]', async function () {
        this.timeout(10 * 1000);
        const { source, processed } = await getDom(URL);
        configure({
          principles: ['Understandable']
        });
        const report = await executeACTR(source.html.parsed, processed.html.parsed);
        expect(Object.keys(report.rules)).to.be.an('array').and.to.include('QW-ACT-R4');
      });
      it('...be executed when using levels=["A"]', async function () {
        this.timeout(10 * 1000);
        const { source, processed } = await getDom(URL);
        configure({
          levels: ['A']
        });
        const report = await executeACTR(source.html.parsed, processed.html.parsed);
        expect(Object.keys(report.rules)).to.be.an('array').and.to.include('QW-ACT-R4');
      });
      it('...be executed when using levels=["AAA"]', async function () {
        this.timeout(10 * 1000);
        const { source, processed } = await getDom(URL);
        configure({
          levels: ['AAA']
        });
        const report = await executeACTR(source.html.parsed, processed.html.parsed);
        expect(Object.keys(report.rules)).to.be.an('array').and.to.include('QW-ACT-R4');
      });
      it('...be executed when using principles=["Operable"] and levels=["A"]', async function () {
        this.timeout(10 * 1000);
        const { source, processed } = await getDom(URL);
        configure({
          principles: ['Operable'],
          levels: ['A']
        });
        const report = await executeACTR(source.html.parsed, processed.html.parsed);
        expect(Object.keys(report.rules)).to.be.an('array').and.to.include('QW-ACT-R4');
      });
      it('...be executed when using principles=["Operable"] and levels=["AAA"]', async function () {
        this.timeout(10 * 1000);
        const { source, processed } = await getDom(URL);
        configure({
          principles: ['Operable'],
          levels: ['AAA']
        });
        const report = await executeACTR(source.html.parsed, processed.html.parsed);
        expect(Object.keys(report.rules)).to.be.an('array').and.to.include('QW-ACT-R4');
      });
      it('...be executed when using principles=["Understandable"] and levels=["AAA"]', async function () {
        this.timeout(10 * 1000);
        const { source, processed } = await getDom(URL);
        configure({
          principles: ['Understandable'],
          levels: ['AAA']
        });
        const report = await executeACTR(source.html.parsed, processed.html.parsed);
        expect(Object.keys(report.rules)).to.be.an('array').and.to.include('QW-ACT-R4');
      });
      it('...be executed when using principle=["Perceivable", "Robust"] and levels=["AA"] and rules=["QW-ACT-R4"]', async function () {
        this.timeout(10 * 1000);
        const { source, processed } = await getDom(URL);
        configure({
          principles: ['Robust', 'Perceivable'],
          levels: ['AA'],
          rules: ['QW-ACT-R4']
        });
        const report = await executeACTR(source.html.parsed, processed.html.parsed);
        expect(Object.keys(report.rules)).to.be.an('array').and.to.include('QW-ACT-R4');
      });
    });

    describe('The rule should not...', function () {
      it('...be executed when using other than rules=["QW-ACT-R4"] or rules=["bc659a"]', async function () {
        this.timeout(10 * 1000);
        const { source, processed } = await getDom(URL);
        configure({
          rules: ['QW-ACT-R2']
        });
        const report = await executeACTR(source.html.parsed, processed.html.parsed);
        expect(Object.keys(report.rules)).to.be.an('array').and.to.not.include('QW-ACT-R4');
      });
      it('...be executed when using principle=["Perceivable"]', async function () {
        this.timeout(10 * 1000);
        const { source, processed } = await getDom(URL);
        configure({
          principles: ['Perceivable']
        });
        const report = await executeACTR(source.html.parsed, processed.html.parsed);
        expect(Object.keys(report.rules)).to.be.an('array').and.to.not.include('QW-ACT-R4');
      });
      it('...be executed when using principle=["Robust"]', async function () {
        this.timeout(10 * 1000);
        const { source, processed } = await getDom(URL);
        configure({
          principles: ['Robust']
        });
        const report = await executeACTR(source.html.parsed, processed.html.parsed);
        expect(Object.keys(report.rules)).to.be.an('array').and.to.not.include('QW-ACT-R4');
      });
      it('...be executed when using levels=["AA"]', async function () {
        this.timeout(10 * 1000);
        const { source, processed } = await getDom(URL);
        configure({
          levels: ['AA']
        });
        const report = await executeACTR(source.html.parsed, processed.html.parsed);
        expect(Object.keys(report.rules)).to.be.an('array').and.to.not.include('QW-ACT-R4');
      });
      it('...be executed when using principle=["Operable"] and levels=["AA"]', async function () {
        this.timeout(10 * 1000);
        const { source, processed } = await getDom(URL);
        configure({
          principles: ['Operable'],
          levels: ['AA']
        });
        const report = await executeACTR(source.html.parsed, processed.html.parsed);
        expect(Object.keys(report.rules)).to.be.an('array').and.to.not.include('QW-ACT-R4');
      });
      it('...be executed when using principle=["Understandable"] and levels=["A"]', async function () {
        this.timeout(10 * 1000);
        const { source, processed } = await getDom(URL);
        configure({
          principles: ['Understandable'],
          levels: ['A']
        });
        const report = await executeACTR(source.html.parsed, processed.html.parsed);
        expect(Object.keys(report.rules)).to.be.an('array').and.to.not.include('QW-ACT-R4');
      });
      it('...be executed when using principle=["Understandable"] and levels=["AA"]', async function () {
        this.timeout(10 * 1000);
        const { source, processed } = await getDom(URL);
        configure({
          principles: ['Understandable'],
          levels: ['AA']
        });
        const report = await executeACTR(source.html.parsed, processed.html.parsed);
        expect(Object.keys(report.rules)).to.be.an('array').and.to.not.include('QW-ACT-R4');
      });
      it('...be executed when using principle=["Perceivable"] and levels=["A"]', async function () {
        this.timeout(10 * 1000);
        const { source, processed } = await getDom(URL);
        configure({
          principles: ['Perceivable'],
          levels: ['A']
        });
        const report = await executeACTR(source.html.parsed, processed.html.parsed);
        expect(Object.keys(report.rules)).to.be.an('array').and.to.not.include('QW-ACT-R4');
      });
      it('...be executed when using principle=["Perceivable"] and levels=["AAA"]', async function () {
        this.timeout(10 * 1000);
        const { source, processed } = await getDom(URL);
        configure({
          principles: ['Perceivable'],
          levels: ['AAA']
        });
        const report = await executeACTR(source.html.parsed, processed.html.parsed);
        expect(Object.keys(report.rules)).to.be.an('array').and.to.not.include('QW-ACT-R4');
      });
      it('...be executed when using principle=["Robust"] and levels=["A"]', async function () {
        this.timeout(10 * 1000);
        const { source, processed } = await getDom(URL);
        configure({
          principles: ['Robust'],
          levels: ['A']
        });
        const report = await executeACTR(source.html.parsed, processed.html.parsed);
        expect(Object.keys(report.rules)).to.be.an('array').and.to.not.include('QW-ACT-R4');
      });
      it('...be executed when using principle=["Robust"] and levels=["AAA"]', async function () {
        this.timeout(10 * 1000);
        const { source, processed } = await getDom(URL);
        configure({
          principles: ['Robust'],
          levels: ['AAA']
        });
        const report = await executeACTR(source.html.parsed, processed.html.parsed);
        expect(Object.keys(report.rules)).to.be.an('array').and.to.not.include('QW-ACT-R4');
      });
    });
  });

  const tests = [{
      url: 'https://act-rules.github.io/testcases/bc659a/a53b440be238663a432475e253e037e4d039b78c.html',
      outcome: 'passed'
    },
    {
      url: 'https://act-rules.github.io/testcases/bc659a/76e3d03342288c1e74ab08b48045c7d82bb3569e.html',
      outcome: 'passed'
    },
    {
      url: 'https://act-rules.github.io/testcases/bc659a/e98093351918b01ca944ddc1e6c708a9e7a3970b.html',
      outcome: 'passed'
    },
    {
      url: 'https://act-rules.github.io/testcases/bc659a/95abea39831d72f642d5edecf787b35b4e807268.html',
      outcome: 'failed'
    },
    {
      url: 'https://act-rules.github.io/testcases/bc659a/5c0ae11c622474ee4196f801aaabae461c2707df.html',
      outcome: 'failed'
    },
    {
      url: 'https://act-rules.github.io/testcases/bc659a/f620fc1551e88a3860d7575c3c3b20cb2cf915ab.html',
      outcome: 'failed'
    },
    {
      url: 'https://act-rules.github.io/testcases/bc659a/84543a9052b4fb153a5c8107adde67ad778d3c52.html',
      outcome: 'failed'
    },
    {
      url: 'https://act-rules.github.io/testcases/bc659a/be3131f08c4ce24005f3ac10826ebeeea91cd450.html',
      outcome: 'inapplicable'
    },
    {
      url: 'https://act-rules.github.io/testcases/bc659a/ff7bace2739570941b554c58c349f56b01df0a3d.html',
      outcome: 'inapplicable'
    },
    {
      url: 'https://act-rules.github.io/testcases/bc659a/3a0b814dc8fccd2c9d3fed07a8028f4df510b900.html',
      outcome: 'inapplicable'
    },
    {
      url: 'https://act-rules.github.io/testcases/bc659a/8452a32af26befb93aaf7ad179008d1e8c040bce.html',
      outcome: 'inapplicable'
    },
    {
      url: 'https://act-rules.github.io/testcases/bc659a/0e27c5910d67c2980e5b7f2ab6ada75f465e53ed.html',
      outcome: 'inapplicable'
    },
    {
      url: 'https://act-rules.github.io/testcases/bc659a/b2c55429a219e4dcca5814e6631067e606b601ad.html',
      outcome: 'inapplicable'
    },
    {
      url: 'https://act-rules.github.io/testcases/bc659a/1b95279f1b570095ca31c857c66d0c67781a7236.html',
      outcome: 'inapplicable'
    },
    {
      url: 'https://act-rules.github.io/testcases/bc659a/31c53af4612af27af29a4b578974a9d823a7ace2.html',
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
          rules: ['QW-ACT-R4']
        });
        const report = await executeACTR(source.html.parsed, processed.html.parsed);
        expect(report.rules['QW-ACT-R4'].metadata.outcome).to.be.equal(test.outcome);
      });
    });
  }
});