const core = require('../dist/index');
const { expect } = require('chai');

describe('Core input method: crawler', function() {
  it('Should be possible to stop the crawling process', async function() {
    this.timeout(1000 * 1000);

    await core.start();
    const reports = await core.evaluate({ crawl: 'https://ciencias.ulisboa.pt' });
    await core.close();

    expect(Object.keys(reports).length).to.be.greaterThan(0);
  });
});