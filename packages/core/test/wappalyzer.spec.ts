import { QualWeb } from '../src';
import { expect } from 'chai';

describe('Core module: wappalyzer', function () {
  it('Should find page technologies', async function () {
    this.timeout(0);

    const qualweb = new QualWeb();

    await qualweb.start();
    const reports = await qualweb.evaluate({ url: 'https://ciencias.ulisboa.pt', execute: { wappalyzer: true } });
    await qualweb.stop();

    expect(Object.keys(reports).length).to.be.greaterThan(0);
  });
});
