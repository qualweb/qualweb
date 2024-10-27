import { QualWeb } from '../dist/index.js';
import { expect } from 'chai';

import { createKoaServer } from './util';
import { Server } from 'http';

describe('Log', function () {
  // Mock server set up.
  const mockServerOptions = {
    childLinksPerPage: 3,
    maxDepth: 3,
  };

  const mockServer = createKoaServer(mockServerOptions);

  let mockHttpServer: Server;
  let mockHttpServerHost: string;

  before(async () => {
    await new Promise(r => mockHttpServer = mockServer.listen(r));

    const address = mockHttpServer.address();

    mockHttpServerHost = typeof(address) === 'string'
      ? address
      : `http://localhost:${address!.port}`
      ;
  });

  after(async () => {
    mockHttpServer.close();
  });

  it('Should log to file', async function () {
    this.timeout(0);

    const qualweb = new QualWeb({ adBlock: true, stealth: true });

    await qualweb.start(undefined, { headless: true, args: ['--ignore-certificate-errors'] });

    const evaluations = await qualweb.evaluate({
      url: mockHttpServerHost,
      modules: [
        // FIXME: missing dummy module to test logging.
      ],
      waitUntil: ['load', 'networkidle0'],
      log: {
        file: true
      }
    });

    await qualweb.stop();

    expect(evaluations[mockHttpServerHost]).to.not.be.undefined;
  });
  it('Should log to console', async function () {
    this.timeout(0);

    const qualweb = new QualWeb({ adBlock: true, stealth: true });

    await qualweb.start({ monitor: true }, {
      headless: true,
      args: ['--ignore-certificate-errors'],
    });

    const evaluations = await qualweb.evaluate({
      url: mockHttpServerHost,
      modules: [
        // FIXME: missing dummy module to test logging.
      ],
      waitUntil: ['load', 'networkidle0'],
      log: {
        console: true
      }
    });

    await qualweb.stop();

    expect(evaluations[mockHttpServerHost]).to.not.be.undefined;
  });
  it('Should log to console 2', async function () {
    this.timeout(0);

    const qualweb = new QualWeb({ adBlock: true, stealth: true });

    await qualweb.start({ monitor: true }, {
      headless: true,
      args: ['--ignore-certificate-errors'],
    });

    const evaluations = await qualweb.evaluate({
      urls: [
        mockHttpServerHost,
        mockHttpServerHost + '/1',
        mockHttpServerHost + '/2',
        mockHttpServerHost + '/3',
        mockHttpServerHost + '/4',
        mockHttpServerHost + '/5'
      ],
      modules: [
        // FIXME: missing dummy module to test logging.
      ],
      waitUntil: ['load', 'networkidle0'],
      log: {
        console: true
      }
    });

    await qualweb.stop();

    expect(evaluations[mockHttpServerHost]).to.not.be.undefined;
  });
});
