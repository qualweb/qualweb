const core = require('../dist/index');
const { expect } = require('chai');

describe('Core', function() {
  it('Should print report', async function() {
    this.timeout(10 * 1000);

    const report = await core.evaluate({ url: 'http://ciencias.ulisboa.pt'});
    console.log(report);
    expect(report.type).to.be.equal('evaluation');
  });
  it('EARL report should have assertions from all modules', async function() {
    this.timeout(10 * 1000);

    await core.evaluate({ url: 'http://ciencias.ulisboa.pt'});
    const earlReport = await core.generateEarlReport();
    console.log(JSON.stringify(earlReport, null, 2));
    expect(earlReport.graph.length).to.be.greaterThan(0);
  });
});