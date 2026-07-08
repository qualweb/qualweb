import { expect } from 'chai';
import { Server } from 'http';
import type { TranslationOptions } from '@qualweb/locale';
import { QualWeb } from '../src';
import { createKoaServer } from './util';
import DummyModule from './lib/DummyModule';

/**
 * Core's responsibility for localization is limited to handing the
 * requested locale to each module (and defaulting to 'en' when none is
 * given) - the actual translation work happens inside the modules and is
 * covered by reportTranslator.spec.ts. These tests pin down that contract.
 */
describe('Core locale', function () {
  this.timeout(30 * 1000);

  const mockServer = createKoaServer();

  let mockHttpServer: Server;
  let host: string;

  before(async () => {
    await new Promise((r) => (mockHttpServer = mockServer.listen(r)));

    const address = mockHttpServer.address();
    host = typeof address === 'string' ? address : `http://localhost:${address!.port}`;
  });

  after(() => {
    mockHttpServer.close();
  });

  async function evaluateAndCaptureLocale(translate?: TranslationOptions): Promise<TranslationOptions | undefined> {
    let received: TranslationOptions | undefined;

    const dummyModule = new DummyModule(undefined, (_page, _options, translate) => {
      received = translate;
      return DummyModule.emptyReport();
    });

    const qualweb = new QualWeb();

    await qualweb.start(undefined, { args: ['--no-sandbox', '--ignore-certificate-errors'] });

    const reports = await qualweb.evaluate({
      url: host,
      translate,
      modules: [dummyModule],
    });

    await qualweb.stop();

    expect(reports[host]).to.not.be.undefined;

    return received;
  }

  it('Should pass the requested locale to modules', async function () {
    const received = await evaluateAndCaptureLocale('en');
    expect(received).to.equal('en');
  });

  it('Should default to en when no locale is given', async function () {
    const received = await evaluateAndCaptureLocale(undefined);
    expect(received).to.equal('en');
  });
});
