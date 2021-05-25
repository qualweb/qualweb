import { QualWeb, generateEARLReport } from '../dist/index';
import { expect } from 'chai';

describe('Core', function () {
  it('Should evaluate one url', async function () {
    this.timeout(0);

    const qualweb = new QualWeb({ adBlock: true, stealth: true });

    await qualweb.start({ headless: true, args: ['--ignore-certificate-errors'] });

    const evaluations = await qualweb.evaluate({ url: 'https://sonderborgkommune.dk/', execute: { act: true }, "wcag-techniques": { exclude: ['QW-WCAG-T16'] } });
    console.log(evaluations)
    const earlReports = generateEARLReport(evaluations);

    await qualweb.stop();

    expect(earlReports['https://sonderborgkommune.dk/']['@graph'].length).to.be.equal(1);
  });
});
