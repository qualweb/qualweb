import { expect } from 'chai';
import { generateEARLReport } from '../src';

// https://ciencias.ulisboa.pt - 05/08/2019 15:31
import evaluationReport from './fixtures/evaluationreport.json';

describe('Testing report modules', function() {
  it('Should report act module', function() {
    const earl = generateEARLReport([evaluationReport] as any, { modules: { act: true }});
    expect(earl[0]['@graph'][0].assertions.length).to.not.be.equal(0);
  });
  it('Should report act module 2', function() {
    const earl = generateEARLReport([evaluationReport] as any, {});
    expect(earl[0]['@graph'][0].assertions.length).to.not.be.equal(0);
  });
  it('Should report act module 3', function() {
    const earl = generateEARLReport([evaluationReport] as any);
    expect(earl[0]['@graph'][0].assertions.length).to.not.be.equal(0);
  });
  it('Should not report act module', function() {
    const earl = generateEARLReport([evaluationReport] as any, { modules: { act: false }});
    expect(earl[0]['@graph'][0].assertions.length).to.be.equal(0);
  });
});