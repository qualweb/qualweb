const core = require('../dist/index');
const { expect } = require('chai');
const fs = require('fs');

describe('Core input method: html', function() {
  it('Should evaluate normally', async function() {
    this.timeout(1000 * 1000);

    const options = { 
      html: fs.readFileSync('./test/test.html').toString()
    };

    await core.start();
    const reports = await core.evaluate(options);
    await core.close();
    
    expect(reports['customHtml']).to.not.be.equal(undefined);
  });
});