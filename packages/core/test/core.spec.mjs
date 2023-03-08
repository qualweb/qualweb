import { QualWeb, generateEARLReport } from '../dist/index.js';
import { expect } from 'chai';

describe('Core', function () {
  it('Should evaluate one url', async function () {
    this.timeout(0);

    const qualweb = new QualWeb({ adBlock: true, stealth: true });

    await qualweb.start(undefined, { headless: false, args: ['--ignore-certificate-errors', '--no-sandbox'] });

    const evaluations = await qualweb.evaluate({
      url: 'https://transparencia.gov.pt/pt/',
      log: { console: true },
     // viewport: { mobile: true, landscape: false },
      execute: { act: false, wcag: true,bp:false },
      'act-rules': { levels: ['A', 'AA'] }
    });

    console.log(evaluations['https://transparencia.gov.pt/pt/'].modules['wcag-techniques'].assertions);

    const earlReports = generateEARLReport(evaluations);

    await qualweb.stop();

    expect(earlReports['https://ciencias.ulisboa.pt/']['@graph'].length).to.be.equal(1);
  });
});