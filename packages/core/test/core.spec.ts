import { QualWeb, generateEARLReport } from '../src';
import { expect } from 'chai';

describe('Core', function () {
  it('Should evaluate one url', async function () {
    this.timeout(0);

    const qualweb = new QualWeb({ adBlock: true, stealth: true });

    await qualweb.start(undefined, { headless: false, args: ['--ignore-certificate-errors', '--no-sandbox'] });
    const url = 'https://www.sapo.pt/';
    const evaluations = await qualweb.evaluate({
      url,
      log: { console: true },
      // viewport: { mobile: true, landscape: false },
      execute: { act: true, wcag: false, bp: true },
      'act-rules': { levels: ['AAA'] }
    });
    // console.log(evaluations);
    // console.log(evaluations[url].modules['act-rules']);
    /*
    const evaluations1 = await qualweb.evaluate({
      url: 'https://varsovia.embaixadaportugal.mne.gov.pt/pt/sugestoes-elogios-ou-reclamacoes',
      log: { console: true },
      // viewport: { mobile: true, landscape: false },
      execute: { act: false, wcag: true, bp: false },
      'act-rules': { levels: ['A', 'AA'] }
    });

    console.log(evaluations1['https://varsovia.embaixadaportugal.mne.gov.pt/pt/sugestoes-elogios-ou-reclamacoes'].modules['wcag-techniques'].assertions["QW-WCAG-T17"]);


    const evaluations2 = await qualweb.evaluate({
      url: 'https://varsovia.embaixadaportugal.mne.gov.pt/pt/sugestoes-elogios-ou-reclamacoes',
      log: { console: true },
      // viewport: { mobile: true, landscape: false },
      execute: { act: false, wcag: true, bp: false },
      'act-rules': { levels: ['A', 'AA'] }
    });

    console.log(evaluations2['https://varsovia.embaixadaportugal.mne.gov.pt/pt/sugestoes-elogios-ou-reclamacoes'].modules['wcag-techniques'].assertions["QW-WCAG-T17"]);*/

    const earlReports = generateEARLReport(evaluations);

    await qualweb.stop();

    expect(earlReports[url]['@graph']).to.have.length(1);
  });
});
