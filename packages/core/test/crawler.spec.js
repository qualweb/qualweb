import { QualWeb } from '../dist/index';
import { expect } from 'chai';

describe('Core input method: crawler', function() {
  it('Should crawl all pages', async function() {
    this.timeout(0);

    const qualweb = new QualWeb();

    await qualweb.start();
    const reports = await qualweb.evaluate({ crawl: 'https://ciencias.ulisboa.pt' });
    await qualweb.stop();

    expect(Object.keys(reports).length).to.be.greaterThan(0);
  });
});