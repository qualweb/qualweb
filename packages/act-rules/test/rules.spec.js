const { executeACTR } = require('../dist/index');
const { getDom } = require('@qualweb/get-dom-puppeteer');
const { expect } = require('chai');
const fs = require('fs');

describe('ACT Rules module', function() {

  const URL = 'http://accessible-serv.lasige.di.fc.ul.pt/~jvicente/test/';

  it('should execute all rules', async function() {
    this.timeout(10 * 1000);
    const { source, processed } = await getDom(URL);
    const report = await executeACTR(source.html.parsed, processed.html.parsed);
    const nRules = fs.readdirSync(__dirname + '/../src/rules/').filter(f => f.startsWith('QW-ACT-R')).length;
    expect(Object.keys(report.rules).length).to.be.equal(nRules);
  });

  describe('ACT Rules report', function() {
    describe('"type" field', function() {
      it('should exist', async function() {
        this.timeout(10 * 1000);
        const { source, processed } = await getDom(URL);
        const report = await executeACTR(source.html.parsed, processed.html.parsed);
        expect(Object.keys(report)).to.be.an('array').and.to.include('type');
      });
      it('should be of type "string"', async function() {
        this.timeout(10 * 1000);
        const { source, processed } = await getDom(URL);
        const report = await executeACTR(source.html.parsed, processed.html.parsed);
        expect(report.type).to.be.a('string');
      });
      it('should not be empty', async function() {
        this.timeout(10 * 1000);
        const { source, processed } = await getDom(URL);
        const report = await executeACTR(source.html.parsed, processed.html.parsed);
        expect(report.type).to.not.be.equal('');
      });
      it('should be "act-rules"', async function() {
        this.timeout(10 * 1000);
        const { source, processed } = await getDom(URL);
        const report = await executeACTR(source.html.parsed, processed.html.parsed);
        expect(report.type).to.be.equal('act-rules');
      });
    });
    describe('"metadata" field', function() {
      it('should exist', async function() {
        this.timeout(10 * 1000);
        const { source, processed } = await getDom(URL);
        const report = await executeACTR(source.html.parsed, processed.html.parsed);
        expect(Object.keys(report)).to.be.an('array').and.to.include('metadata');
      });
      describe('"passed" field', function() {
        it('should exist', async function() {
          this.timeout(10 * 1000);
          const { source, processed } = await getDom(URL);
          const report = await executeACTR(source.html.parsed, processed.html.parsed);
          expect(Object.keys(report.metadata)).to.be.an('array').and.to.include('passed');
        });
        it('should be of type "number"', async function() {
          this.timeout(10 * 1000);
          const { source, processed } = await getDom(URL);
          const report = await executeACTR(source.html.parsed, processed.html.parsed);
          expect(report.metadata.passed).to.be.a('number');
        });
      });
      describe('"failed" field', function() {
        it('should exist', async function() {
          this.timeout(10 * 1000);
          const { source, processed } = await getDom(URL);
          const report = await executeACTR(source.html.parsed, processed.html.parsed);
          expect(Object.keys(report.metadata)).to.be.an('array').and.to.include('failed');
        });
        it('should be of type "number"', async function() {
          this.timeout(10 * 1000);
          const { source, processed } = await getDom(URL);
          const report = await executeACTR(source.html.parsed, processed.html.parsed);
          expect(report.metadata.failed).to.be.a('number');
        });
      });
      describe('"inapplicable" field', function() {
        it('should exist', async function() {
          this.timeout(10 * 1000);
          const { source, processed } = await getDom(URL);
          const report = await executeACTR(source.html.parsed, processed.html.parsed);
          expect(Object.keys(report.metadata)).to.be.an('array').and.to.include('inapplicable');
        });
        it('should be of type "number"', async function() {
          this.timeout(10 * 1000);
          const { source, processed } = await getDom(URL);
          const report = await executeACTR(source.html.parsed, processed.html.parsed);
          expect(report.metadata.inapplicable).to.be.a('number');
        });
      });
    });
    describe('"rules" field', function() {
      it('should exist', async function() {
        this.timeout(10 * 1000);
        const { source, processed } = await getDom(URL);
        const report = await executeACTR(source.html.parsed, processed.html.parsed);
        expect(Object.keys(report)).to.be.an('array').and.to.include('rules');
      });
    });
  });
});