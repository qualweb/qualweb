import { expect } from 'chai';
import { Server } from 'http';
import { QualWeb } from '../src';
import { createKoaServer } from './util';
import DummyModule from './lib/DummyModule';

describe('Should do parallel evaluations', function () {
  const mockServer = createKoaServer({ childLinksPerPage: 3, maxDepth: 3 });

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

  it('Should have correct results', async function () {
    this.timeout(0);

    const urls = ['/', '/0', '/1', '/2', '/0/1', '/1/2', '/2/0', '/2/1'].map((path) => `${host}${path}`);

    // Track how many module executions are in flight at once, so the test
    // actually verifies that evaluations overlap instead of running serially.
    let inFlight = 0;
    let maxInFlight = 0;

    const dummyModule = new DummyModule(undefined, async () => {
      inFlight++;
      maxInFlight = Math.max(maxInFlight, inFlight);
      await new Promise((r) => setTimeout(r, 500));
      inFlight--;
      return DummyModule.emptyReport();
    });

    const qualweb = new QualWeb();

    await qualweb.start(
      { maxConcurrency: 4 },
      { args: ['--no-sandbox', '--ignore-certificate-errors'] }
    );

    const reports = await qualweb.evaluate({
      urls,
      modules: [dummyModule],
    });

    await qualweb.stop();

    expect(Object.keys(reports)).to.have.length(urls.length);
    for (const url of urls) {
      expect(reports[url], url).to.not.be.undefined;
      expect(reports[url].system.page.dom.elementCount).to.be.greaterThan(0);
    }
    expect(maxInFlight, 'evaluations should overlap').to.be.greaterThan(1);
  });
});
