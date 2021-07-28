const { QualWeb } = require('../dist/index');
const { expect } = require('chai');
const fs = require('fs');

describe('Core input method: file', function() {
  it('Should evaluate normally', async function() {
    this.timeout(0);

    const options = { 
      urls: fs.readFileSync().toString().split('\n'),
      maxParallelEvaluations: 9
    };

    const qualweb = new QualWeb();

    await qualweb.start();
    const reports = await qualweb.evaluate(options);
    await qualweb.stop();
    
    expect(Object.keys(reports).length).to.be.equal(9);
  });
});