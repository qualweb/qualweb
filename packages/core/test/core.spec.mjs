import { QualWeb, generateEARLReport } from '../dist/index.js';
import { expect } from 'chai';

describe('Core', function () {
  it('Should evaluate one url', async function () {
    this.timeout(0);

    const qualweb = new QualWeb({ adBlock: true, stealth: true });

    await qualweb.start(undefined, { headless: false, args: ['--ignore-certificate-errors', '--no-sandbox'] });

    const evaluations = await qualweb.evaluate({
      url: 'https://varsovia.embaixadaportugal.mne.gov.pt/pt/sugestoes-elogios-ou-reclamacoes',
      log: { console: true },
     // viewport: { mobile: true, landscape: false },
      execute: { act: false, wcag: true,bp:false },
      'act-rules': { levels: ['A', 'AA'] }
    });

    console.log(evaluations['https://varsovia.embaixadaportugal.mne.gov.pt/pt/sugestoes-elogios-ou-reclamacoes'].modules['wcag-techniques'].assertions["QW-WCAG-T17"]);

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

    console.log(evaluations2['https://varsovia.embaixadaportugal.mne.gov.pt/pt/sugestoes-elogios-ou-reclamacoes'].modules['wcag-techniques'].assertions["QW-WCAG-T17"]);

    const earlReports = generateEARLReport(evaluations);

    await qualweb.stop();

    expect(earlReports['https://ciencias.ulisboa.pt/']['@graph'].length).to.be.equal(1);
  });
});