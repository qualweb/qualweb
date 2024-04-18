import { QualWeb, generateEARLReport } from '../src';
import { expect } from 'chai';

describe('Core', function () {
  it('Should evaluate one url', async function () {
    this.timeout(0);

    const qualweb = new QualWeb({ adBlock: true, stealth: true });

    await qualweb.start(undefined, { headless: 'new', args: ['--ignore-certificate-errors', '--no-sandbox'] });
    const url = 'https://aveiroexpo.com/feed';
    const evaluations = await qualweb.evaluate({
      url,
      log: { console: true },
      // viewport: { mobile: true, landscape: false },
      execute: { act: true, wcag: true, bp: false },
      'act-rules': { levels: ['AAA'] }
    });

    const earlReports = generateEARLReport(evaluations);

    await qualweb.stop();

    expect(earlReports[url]['@graph']).to.have.length(1);
  });
});
