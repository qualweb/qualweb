import { QualWeb, generateEarlReport } from '../dist/index';
import { expect } from 'chai';

describe('Core', function () {
  it('Should evaluate one url', async function () {
    this.timeout(0);

    const qualweb = new QualWeb();

    await qualweb.start(«);

    const evaluations = await qualweb.evaluate({ url: 'https://ciencias.ulisboa.pt/' });

    const earlReports = await generateEarlReport(evaluations);

    await qualweb.stop();

    expect(earlReports['https://ciencias.ulisboa.pt/']['@graph'].length).to.be.equal(1);
  });
});