import { QualWeb } from '../dist/index.js';
import { expect } from 'chai';

describe('Log', function () {
  it('Should log to file', async function () {
    this.timeout(0);

    const qualweb = new QualWeb({ adBlock: true, stealth: true });

    await qualweb.start({ headless: true, args: ['--ignore-certificate-errors'] });

    const evaluations = await qualweb.evaluate({
      url: 'http://localhost:4200/',
      execute: { act: true, wcag: true, bp: true },
      waitUntil: ['load', 'networkidle0'],
      log: {
        file: true
      }
    });

    await qualweb.stop();

    expect(evaluations['http://localhost:4200/']).to.not.be.undefined;
  });
  it('Should log to console', async function () {
    this.timeout(0);

    const qualweb = new QualWeb({ adBlock: true, stealth: true });

    await qualweb.start({ headless: true, args: ['--ignore-certificate-errors'], monitor: true });

    const evaluations = await qualweb.evaluate({
      url: 'http://localhost:4200/',
      execute: { act: true, wcag: true, bp: true },
      waitUntil: ['load', 'networkidle0'],
      log: {
        console: true
      }
    });

    await qualweb.stop();

    expect(evaluations['http://localhost:4200/']).to.not.be.undefined;
  });
  it('Should log to console 2', async function () {
    this.timeout(0);

    const qualweb = new QualWeb({ adBlock: true, stealth: true });

    await qualweb.start({ headless: true, args: ['--ignore-certificate-errors'], monitor: true });

    const evaluations = await qualweb.evaluate({
      urls: [
        'http://localhost:4200/',
        'http://localhost:4200/1',
        'http://localhost:4200/2',
        'http://localhost:4200/3',
        'http://localhost:4200/4',
        'http://localhost:4200/5'
      ],
      execute: { act: true, wcag: true, bp: true },
      waitUntil: ['load', 'networkidle0'],
      log: {
        console: true
      }
    });

    await qualweb.stop();

    expect(evaluations['http://localhost:4200/']).to.not.be.undefined;
  });
});
