import { expect } from 'chai';
import { generateEARLReport } from '@qualweb/earl-reporter';
import { QualWeb } from '../src';

describe('Core', function () {
  it('Should evaluate one url', async function () {
    this.timeout(0);

    const qualweb = new QualWeb({ adBlock: true, stealth: true });

    await qualweb.start(undefined, { headless: true, args: ['--ignore-certificate-errors', '--no-sandbox'] });
    const url = 'https://ciencias.ulisboa.pt';
    const evaluations = await qualweb.evaluate({
      url,
      log: { console: true },
      // viewport: { mobile: true, landscape: false },
      modulesToExecute: { "act-rules": true, "wcag-techniques": true, "best-practices": true, counter: false },
    });

    const earlReports = generateEARLReport(evaluations);

    await qualweb.stop();

    expect(earlReports[url]['@graph']).to.have.length(1);
    console.log("🚀 ~ earlReports[url]['@graph']:", evaluations)
  });
});
