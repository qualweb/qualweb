const core = require('../dist/index');
const { expect } = require('chai');
const fs = require('fs');

describe('Core', function() {

  it.only('Should evaluate', async function() {
    this.timeout(1000 * 1000);

    await core.start();
    const reports = await core.evaluate({ url: 'https://www.odense.dk/borger/sundhed-og-sygdom/covid-19-%28corona-virus%29'});
    //console.log(JSON.stringify(reports['http://ciencias.ulisboa.pt']["modules"]["act-rules"],0,2));
    await core.stop();

    //expect(reports['https://ciencias.ulisboa.pt/pt/o-campus'].type).to.be.equal('evaluation');
  });

  /*it('EARL report should have assertions from all modules', async function() {
    this.timeout(1000 * 1000);
    let url = 'http://ciencias.ulisboa.pt';
    await core.start();
    const reports =  await core.evaluate({ url});
    console.log(reports);
    const earlReports = await core.generateEarlReport();
    await core.stop();
    
  //  expect(earlReports[url].graph.length).to.be.greaterThan(0);
  });*/

});