import { QualWeb, generateEARLReport } from '../dist/index.js';
import { expect } from 'chai';

describe('Core', function () {
  it('Should evaluate one url', async function () {
    this.timeout(0);

    const qualweb = new QualWeb({ adBlock: false, stealth: false });

    await qualweb.start({ headless: false, args: ['--ignore-certificate-errors'] });

    const evaluations = await qualweb.evaluate({
      url: 'https://www.sns24.gov.pt/',
      execute: { act: true, wcag: false, bp: false },
      waitUntil: ['load', 'networkidle0']
    });

    console.log(evaluations);

    const earlReports = generateEARLReport(evaluations);

    await qualweb.stop();

    expect(earlReports['https://www.sns24.gov.pt/']['@graph'].length).to.be.equal(1);
  });
});
