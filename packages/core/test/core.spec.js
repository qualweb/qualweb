import { QualWeb, generateEarlReport } from '../dist/index';
import { expect } from 'chai';

describe('Core', function () {
  it('Should evaluate one url', async function () {
    this.timeout(0);

    const qualweb = new QualWeb();

    await qualweb.start();

    const evaluations = await qualweb.evaluate({ url: 'https://www.ulisboa.pt/', execute: { act: true } });

    const earlReports = await generateEarlReport(evaluations);

    await qualweb.stop();

    console.log(evaluations['https://www.ulisboa.pt/'].modules['act-rules'].assertions['QW-ACT-R45']);
    //console.log(earlReports['https://www.ulisboa.pt/']['@graph'][0].assertions);
    //console.log(evaluations.modules['act-rules'].assertions['QW-ACT-R45']);

    expect(earlReports['https://www.ulisboa.pt/']['@graph'].length).to.be.equal(1);
  });
});