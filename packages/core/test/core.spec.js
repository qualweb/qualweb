import { QualWeb, generateEARLReport } from '../dist/index';
import { expect } from 'chai';

describe('Core', function () {
  it('Should evaluate one url', async function () {
    this.timeout(0);

    const qualweb = new QualWeb();

    await qualweb.start({ headless: false, args: ['--ignore-certificate-errors'] });

    const evaluations = await qualweb.evaluate({ url: 'http://www.ipst.pt/index.php/pt/', execute: { act: true } });
    console.log(evaluations)
    const earlReports = generateEARLReport(evaluations);

    await qualweb.stop();

    expect(earlReports['http://www.ipst.pt/index.php/pt/']['@graph'].length).to.be.equal(1);
  });
});
