const core = require('../dist/index');
const { expect } = require('chai');

describe('Core', function () {
  it('EARL report should have assertions from all modules', async function () {
    this.timeout(0);
    let errorUrl = [];
    let urlList = ['http://ciencias.ulisboa.pt', 'https://www.pcdiga.com/', 'https://www.globaldata.pt/', 'https://www.amazon.es/', 'https://www.w3.org/', 'https://pt.wikipedia.org/',
      'https://act-rules.github.io/', 'https://www.w3schools.com/', 'https://www.sapo.pt/', 'https://www.ama.gov.pt/', 'https://eportugal.gov.pt/'
    ];
    let total = 0;
    let evaluationTime = {};
    await core.start();
    let list = []

    /**
     * { url,  "act-rules": { // More information about this options at https://github.com/qualweb/act-rules
        "rules": ["5b7ae0", "bf051a","b5c3f8","2779a5","59796f","0ssw9k","73f2c2","674b10","7d6734"]}}
     */
    for (let url of urlList) {
      try {
        let start = new Date().getTime();
        list.push(core.evaluate({ url }));
        let end = new Date().getTime();
        let duration = end - start;
        total += duration;
        evaluationTime[url] = { duration };
      }
      catch (e) {
        errorUrl.push(url)
        console.log(errorUrl);
      }
    }
    let results = await Promise.all(list);
   /* for (let result of results) {
      console.log(result);
      console.log(results.length);
    }*/
      const fs = require('fs')
      // Write data in 'Output.txt' . 
      fs.writeFile('Output.txt', JSON.stringify(evaluationTime, null, 2), (err) => {
        // In case of a error throw err. 
        if (err) throw err;
      })
      await core.stop();
      //expect(earlReports[0].graph.length).to.be.greaterThan(0);
    });
  /*
  describe('Testing plain html', function() {
    it.only('should run', async function() {
      this.timeout(1000 * 1000);
      const report = await core.evaluate({ url: URL });
      console.warn(report.system.dom.processed.html.plain);
      expect(report.system.dom.processed.html.plain).to.not.be.undefined;
    });*/
});