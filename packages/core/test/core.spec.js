const core = require('../dist/index');
const { expect } = require('chai');
const fs = require('fs');

describe('Core', function() {

  it('Should evaluate', async function() {
    this.timeout(1000 * 1000);

    await core.start();
    const reports = await core.evaluate({ url: 'http://ciencias.ulisboa.pt'});
    await core.stop();

    expect(reports[url].type).to.be.equal('evaluation');
  });

  it('EARL report should have assertions from all modules', async function() {
    this.timeout(1000 * 1000);

    await core.start();
    await core.evaluate({ url: 'http://ciencias.ulisboa.pt'});
    const earlReports = await core.generateEarlReport();
    await core.stop();
    
    expect(earlReports[url].graph.length).to.be.greaterThan(0);
  });

});