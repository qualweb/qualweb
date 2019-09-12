const core = require('../dist/index');
const { expect } = require('chai');

describe('Core', function() {
  it('Should print report', async function() {
    this.timeout(10 * 1000);

    const report = await core.evaluate({ url: 'http://ciencias.ulisboa.pt'});
    console.log(JSON.stringify(report, null, 2));
  });
});