const core = require('../dist/index');
const { expect } = require('chai');
const { writeFile } = require('fs-extra');

describe('Core', function() {
  it('Should evaluate', async function() {
    this.timeout(10 * 10000);

    const report = await core.evaluate({ url: 'http://ciencias.ulisboa.pt'});
    //console.log(report);
    expect(report[0].type).to.be.equal('evaluation');
  });
  it('EARL report should have assertions from all modules', async function() {
    this.timeout(10 * 10000);

    const reports = await core.evaluate({ url: 'http://ciencias.ulisboa.pt'});
    const earlReports = await core.generateEarlReport();
    //await writeFile('report.json', JSON.stringify(reports, null, 2));
    expect(earlReports[0].graph.length).to.be.greaterThan(0);
  });
});