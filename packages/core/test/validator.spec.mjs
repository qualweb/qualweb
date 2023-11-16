import { QualWeb } from '../dist/index.js';
import { expect } from 'chai';

describe('Core html validator endpoint', function () {
  it('Should run html validator if no custom endpoint is given', async function () {
    this.timeout(0);

    const options = {
      url: 'https://ciencias.ulisboa.pt',
      execute: {
        html: true
      },
      'html-techniques': {
        techniques: ['QW-HTML-T20']
      }
    };

    const qualweb = new QualWeb();

    await qualweb.start();
    const reports = await qualweb.evaluate(options);
    await qualweb.stop();

    expect(
      reports['https://ciencias.ulisboa.pt'].modules['html-techniques'].assertions['QW-HTML-T20'].results.length
    ).to.be.greaterThan(0);
  });

  it('Should run html validator if custom endpoint is given', async function () {
    this.timeout(0);

    const options = {
      url: 'https://ciencias.ulisboa.pt',
      validator: 'http://194.117.20.242/validate/',
      execute: {
        html: true
      },
      'html-techniques': {
        techniques: ['QW-HTML-T20']
      }
    };

    const qualweb = new QualWeb();

    await qualweb.start();
    const reports = await qualweb.evaluate(options);
    await qualweb.stop();

    expect(
      reports['https://ciencias.ulisboa.pt'].modules['html-techniques'].assertions['QW-HTML-T20'].results.length
    ).to.be.greaterThan(0);
  });
});
