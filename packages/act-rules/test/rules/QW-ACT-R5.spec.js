const {
  configure,
  executeACTR
} = require('../../dist/index');
const {
  getDom
} = require('@qualweb/get-dom-puppeteer');
const { expect } = require('chai');

describe('Rule QW-ACT-R5', function () {

  const URL = 'http://accessible-serv.lasige.di.fc.ul.pt/~jvicente/test/';

  describe('Configuration', function () {
    describe('The rule should...', function() {
      it('...be executed without calling the "configure" function', async function () {
        this.timeout(10 * 1000);
        const { source, processed } = await getDom(URL);
        const report = await executeACTR(source.html.parsed, processed.html.parsed);
        expect(Object.keys(report.rules)).to.be.an('array').and.to.include('QW-ACT-R5');
      });
      it('...be executed when using rules=["QW-ACT-R5"]', async function () {
        this.timeout(10 * 1000);
        const { source, processed } = await getDom(URL);
        configure({
          rules: ['QW-ACT-R5']
        });
        const report = await executeACTR(source.html.parsed, processed.html.parsed);
        expect(Object.keys(report.rules)).to.be.an('array').and.to.include('QW-ACT-R5');
      });
      it('...be executed when using rules=["bf051a"]', async function () {
        this.timeout(10 * 1000);
        const { source, processed } = await getDom(URL);
        configure({
          rules: ['bf051a']
        });
        const report = await executeACTR(source.html.parsed, processed.html.parsed);
        expect(Object.keys(report.rules)).to.be.an('array').and.to.include('QW-ACT-R5');
      });
      it('...be executed when using principle=["Understandable"]', async function () {
        this.timeout(10 * 1000);
        const { source, processed } = await getDom(URL);
        configure({
          principles: ['Understandable']
        });
        const report = await executeACTR(source.html.parsed, processed.html.parsed);
        expect(Object.keys(report.rules)).to.be.an('array').and.to.include('QW-ACT-R5');
      });
      it('...be executed when using levels=["A"]', async function () {
        this.timeout(10 * 1000);
        const { source, processed } = await getDom(URL);
        configure({
          levels: ['A']
        });
        const report = await executeACTR(source.html.parsed, processed.html.parsed);
        expect(Object.keys(report.rules)).to.be.an('array').and.to.include('QW-ACT-R5');
      });
      it('...be executed when using principles=["Understandable"] and levels=["A"]', async function () {
        this.timeout(10 * 1000);
        const { source, processed } = await getDom(URL);
        configure({
          principles: ['Understandable'],
          levels: ['A']
        });
        const report = await executeACTR(source.html.parsed, processed.html.parsed);
        expect(Object.keys(report.rules)).to.be.an('array').and.to.include('QW-ACT-R5');
      });
      it('...be executed when using principle=["Perceivable", "Operable", "Robust"] and levels=["AA", "AAA"] and rules=["QW-ACT-R5"]', async function () {
        this.timeout(10 * 1000);
        const { source, processed } = await getDom(URL);
        configure({
          principles: ['Robust', 'Operable', 'Perceivable'],
          levels: ['AA', 'AAA'],
          rules: ['QW-ACT-R5']
        });
        const report = await executeACTR(source.html.parsed, processed.html.parsed);
        expect(Object.keys(report.rules)).to.be.an('array').and.to.include('QW-ACT-R5');
      });
    });

    describe('The rule should not...', function() {
      it('...be executed when using other than rules=["QW-ACT-R5"] or rules=["bf051a"]', async function () {
        this.timeout(10 * 1000);
        const { source, processed } = await getDom(URL);
        configure({
          rules: ['QW-ACT-R1']
        });
        const report = await executeACTR(source.html.parsed, processed.html.parsed);
        expect(Object.keys(report.rules)).to.be.an('array').and.to.not.include('QW-ACT-R5');
      });
      it('...be executed when using principle=["Perceivable"]', async function () {
        this.timeout(10 * 1000);
        const { source, processed } = await getDom(URL);
        configure({
          principles: ['Perceivable']
        });
        const report = await executeACTR(source.html.parsed, processed.html.parsed);
        expect(Object.keys(report.rules)).to.be.an('array').and.to.not.include('QW-ACT-R5');
      });
      it('...be executed when using principle=["Operable"]', async function () {
        this.timeout(10 * 1000);
        const { source, processed } = await getDom(URL);
        configure({
          principles: ['Operable']
        });
        const report = await executeACTR(source.html.parsed, processed.html.parsed);
        expect(Object.keys(report.rules)).to.be.an('array').and.to.not.include('QW-ACT-R5');
      });
      it('...be executed when using principle=["Robust"]', async function () {
        this.timeout(10 * 1000);
        const { source, processed } = await getDom(URL);
        configure({
          principles: ['Robust']
        });
        const report = await executeACTR(source.html.parsed, processed.html.parsed);
        expect(Object.keys(report.rules)).to.be.an('array').and.to.not.include('QW-ACT-R5');
      });
      it('...be executed when using levels=["AA"]', async function () {
        this.timeout(10 * 1000);
        const { source, processed } = await getDom(URL);
        configure({
          levels: ['AA']
        });
        const report = await executeACTR(source.html.parsed, processed.html.parsed);
        expect(Object.keys(report.rules)).to.be.an('array').and.to.not.include('QW-ACT-R5');
      });
      it('...be executed when using levels=["AAA"]', async function () {
        this.timeout(10 * 1000);
        const { source, processed } = await getDom(URL);
        configure({
          levels: ['AAA']
        });
        const report = await executeACTR(source.html.parsed, processed.html.parsed);
        expect(Object.keys(report.rules)).to.be.an('array').and.to.not.include('QW-ACT-R5');
      });
      it('...be executed when using principle=["Understandable"] and levels=["AA"]', async function () {
        this.timeout(10 * 1000);
        const { source, processed } = await getDom(URL);
        configure({
          principles: ['Understandable'],
          levels: ['AA']
        });
        const report = await executeACTR(source.html.parsed, processed.html.parsed);
        expect(Object.keys(report.rules)).to.be.an('array').and.to.not.include('QW-ACT-R5');
      });
      it('...be executed when using principle=["Understandable"] and levels=["AAA"]', async function () {
        this.timeout(10 * 1000);
        const { source, processed } = await getDom(URL);
        configure({
          principles: ['Understandable'],
          levels: ['AAA']
        });
        const report = await executeACTR(source.html.parsed, processed.html.parsed);
        expect(Object.keys(report.rules)).to.be.an('array').and.to.not.include('QW-ACT-R5');
      });
      it('...be executed when using principle=["Perceivable"] and levels=["A"]', async function () {
        this.timeout(10 * 1000);
        const { source, processed } = await getDom(URL);
        configure({
          principles: ['Perceivable'],
          levels: ['A']
        });
        const report = await executeACTR(source.html.parsed, processed.html.parsed);
        expect(Object.keys(report.rules)).to.be.an('array').and.to.not.include('QW-ACT-R5');
      });
      it('...be executed when using principle=["Operable"] and levels=["A"]', async function () {
        this.timeout(10 * 1000);
        const { source, processed } = await getDom(URL);
        configure({
          principles: ['Operable'],
          levels: ['A']
        });
        const report = await executeACTR(source.html.parsed, processed.html.parsed);
        expect(Object.keys(report.rules)).to.be.an('array').and.to.not.include('QW-ACT-R5');
      });
      it('...be executed when using principle=["Robust"] and levels=["A"]', async function () {
        this.timeout(10 * 1000);
        const { source, processed } = await getDom(URL);
        configure({
          principles: ['Robust'],
          levels: ['A']
        });
        const report = await executeACTR(source.html.parsed, processed.html.parsed);
        expect(Object.keys(report.rules)).to.be.an('array').and.to.not.include('QW-ACT-R5');
      });
    });
  });

  const tests = [
    {
      url: 'https://act-rules.github.io/testcases/bf051a/c31b1fb00860505c2df2713bea279907b263972b.html',
      outcome: 'passed'
    },
    {
      url: 'https://act-rules.github.io/testcases/bf051a/b20f422ae3e21f58a68320cea7b56888c9a1c327.html',
      outcome: 'passed'
    },
    {
      url: 'https://act-rules.github.io/testcases/bf051a/97f9355be3966ed3055700266b421fb6e1015604.html',
      outcome: 'passed'
    },
    {
      url: 'https://act-rules.github.io/testcases/bf051a/544be6643ddbb98a930227ca32e7c4a03fdf6ac9.html',
      outcome: 'passed'
    },
    {
      url: 'https://act-rules.github.io/testcases/bf051a/c840906cc9ce1ec3c4b5662b59bbeab3eeac12d4.html',
      outcome: 'passed'
    },
    {
      url: 'https://act-rules.github.io/testcases/bf051a/fb1123f5baba9492c2fdc7ecd9a3d66678ebc95a.html',
      outcome: 'failed'
    },
    {
      url: 'https://act-rules.github.io/testcases/bf051a/9599221436e0d1c16085d69b6e9b3ce2f0b7e5de.html',
      outcome: 'failed'
    },
    {
      url: 'https://act-rules.github.io/testcases/bf051a/776b84ec8a3c1c18c9282437f8c666dd0bf6bae5.html',
      outcome: 'failed'
    },
    {
      url: 'https://act-rules.github.io/testcases/bf051a/90ac9c3118483559f1979bf7b4e57a46e3a63eaf.html',
      outcome: 'failed'
    },
    {
      url: 'https://act-rules.github.io/testcases/bf051a/3d835d61d5eb774fbfba245013b0ad9446027bb8.html',
      outcome: 'failed'
    },
    {
      url: 'https://act-rules.github.io/testcases/bf051a/25342c1edeebb82f905891a420b539667a1d8653.html',
      outcome: 'failed'
    },
    {
      url: 'https://act-rules.github.io/testcases/bf051a/abbfd272b819bc6ab49b86e9300f1ccd8beb325b.html',
      outcome: 'failed'
    },
    {
      url: 'https://act-rules.github.io/testcases/bf051a/455ed0f037647f3831ff9a4ebde4a1e6fcd7dad3.svg',
      outcome: 'inapplicable'
    },
    {
      url: 'https://act-rules.github.io/testcases/bf051a/60c3d3121a00675b4724d5b9cb635c2f79f1519b.html',
      outcome: 'inapplicable'
    },
    {
      url: 'https://act-rules.github.io/testcases/bf051a/7f0fea4ee64c3b5e2a56dc323881317802bf2fc3.html',
      outcome: 'inapplicable'
    },
    {
      url: 'https://act-rules.github.io/testcases/bf051a/5f5094197bb84c8f5524f97b9fc5624f18e9dff0.html',
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
        configure({ rules: ['QW-ACT-R5'] });
        const report = await executeACTR(source.html.parsed, processed.html.parsed);
        expect(report.rules['QW-ACT-R5'].metadata.outcome).to.be.equal(test.outcome);
      });
    });
  }
});