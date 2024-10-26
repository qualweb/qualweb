import { Crawler } from '../src/Crawler.object';
import { expect } from 'chai';
import { createKoaServer, koaServerPageCount, usePuppeteer } from './util';
import { Server } from 'http';

describe('General crawl tests', function () {
  const proxy = usePuppeteer();

  let mockServer: ReturnType<typeof createKoaServer>;
  let mockHttpServer: Server;
  let mockHttpServerHost: string;
  let actualUrlCount: number;

  before(() => {
    // Mock server set up.
    const mockServerOptions = {
      childLinksPerPage: 3,
      maxDepth: 3,
    };

    mockServer = createKoaServer(mockServerOptions);

    actualUrlCount = koaServerPageCount(
      mockServerOptions.childLinksPerPage,
      mockServerOptions.maxDepth,
    );
  });

  beforeEach(async () => {
    await new Promise(r => {
      mockHttpServer = mockServer.listen(r)
    });

    const address = mockHttpServer.address();

    mockHttpServerHost = typeof(address) === 'string'
      ? address
      : `http://localhost:${address!.port}`
      ;
  });

  afterEach(async () => {
    mockHttpServer.close();
  });

  it('Should exhaustively crawl a server', async function () {
    this.timeout(0);
    const crawler = new Crawler(proxy.browser, mockHttpServerHost);
    await crawler.crawl({ logging: false, });
    const urls = crawler.getResults();

    expect(urls).to.have.length(actualUrlCount);
  });
});