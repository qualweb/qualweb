import { QualWeb, generateEARLReport } from '../dist/index.js';
import { expect } from 'chai';

describe('Core', function () {
  it('Should evaluate one url', async function () {
    this.timeout(0);

    const qualweb = new QualWeb({ adBlock: true, stealth: true });

    await qualweb.start(undefined, { headless: false, args: ['--ignore-certificate-errors', '--no-sandbox'] });

    const evaluations = await qualweb.evaluate({
      url: 'https://plejecenterortved.ringsted.dk/borger/omsorg-sundhed/boligerne',
      log: { console: true },
     // viewport: { mobile: true, landscape: false },
      execute: { act: true, wcag: true,bp:true },
      'act-rules': { levels: ['A', 'AA'] }
    });

    console.log(evaluations);

    const earlReports = generateEARLReport(evaluations);

    await qualweb.stop();

    expect(earlReports['https://ciencias.ulisboa.pt/']['@graph'].length).to.be.equal(1);
  });
});