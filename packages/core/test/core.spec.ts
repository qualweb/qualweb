import { expect } from 'chai';
import { QualWeb } from '../src';

describe('Core', function () {
  it('Should evaluate one url', async function () {
    this.timeout(0);

    const qualweb = new QualWeb({ adBlock: true, stealth: false });

    await qualweb.start(undefined, { headless: true, args: ['--ignore-certificate-errors', '--no-sandbox'] });
    const url = 'https://ciencias.ulisboa.pt';
    const evaluations = await qualweb.evaluate({
      url,
      log: { console: true },
      // viewport: { mobile: true, landscape: false },
      // modulesToExecute: { "act-rules": true, "wcag-techniques": true, "best-practices": true, counter: false },
      modules: [
        // FIXME: add a dummy module to ensure execution by the core.
      ],
    });

    await qualweb.stop();

    // TODO: the assertion needs to be better.
    expect(evaluations[url]).to.not.be.undefined;
    console.log("🚀 ~ earlReports[url]['@graph']:", evaluations)
  });
});
