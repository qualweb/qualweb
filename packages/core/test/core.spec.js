import { QualWeb, generateEARLReport } from '../dist/index';
import { expect } from 'chai';

describe('Core', function () {
  it('Should evaluate one url', async function () {
    this.timeout(0);

    const qualweb = new QualWeb({ adBlock: true, stealth: true });

    await qualweb.start({ headless: true, args: ['--ignore-certificate-errors'] });

    const evaluations = await qualweb.evaluate({
      url: 'https://gribskov.dk/',
      execute: { act: true },
      waitUntil: ['load', 'networkidle0'],
      'wcag-techniques': { exclude: ['QW-WCAG-T16'] },
      'act-rules': { rules: ['QW-ACT-R40'] }
    });
    console.log(JSON.stringify(evaluations, null, 2));
    const earlReports = generateEARLReport(evaluations);

    await qualweb.stop();

    expect(earlReports['https://gribskov.dk/']['@graph'].length).to.be.equal(1);
  });
});
