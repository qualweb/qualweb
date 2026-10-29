import { expect } from 'chai';
import { execFile } from 'node:child_process';
import { createServer, Server } from 'node:http';
import { promisify } from 'node:util';
import { resolve } from 'node:path';
import { mkdtemp, readFile, rm, writeFile } from 'node:fs/promises';
import { tmpdir } from 'node:os';

const execute = promisify(execFile);

describe('Playwright CLI', function () {
  this.timeout(60000);
  let server: Server;
  let url: string;

  before(async () => {
    server = createServer((_request, response) => {
      response.setHeader('content-type', 'text/html');
      response.end('<!doctype html><html lang="en"><title>CLI fixture</title><h1>Accessible fixture</h1></html>');
    });
    await new Promise<void>((done) => server.listen(0, '127.0.0.1', done));
    const address = server.address();
    if (!address || typeof address === 'string') {
      throw new Error('Fixture server has no TCP address');
    }
    url = `http://127.0.0.1:${address.port}`;
  });

  after(() => server?.close());

  it('produces JSON reports using the default browser and lifecycle/timeout options', async () => {
    const { stdout } = await execute(process.execPath, [
      resolve('dist/cli.js'), '--url', url, '--module', 'counter',
      '--wait-until', 'domcontentloaded', '--timeout', '10000',
    ], { timeout: 45000 });
    const report = JSON.parse(stdout)[url];
    expect(report.system.page.dom.title).to.equal('CLI fixture');
    expect(report.modules.counter).to.not.be.undefined;
  });

  it('rejects invalid lifecycle options', async () => {
    let code: unknown;
    try {
      await execute(process.execPath, [resolve('dist/cli.js'), '--url', url, '--wait-until', 'invalid']);
    } catch (error) {
      if (error && typeof error === 'object' && 'code' in error) {
        code = error.code;
      }
    }
    expect(code).to.equal(1);
  });

  it('runs the default ACT, WCAG, best-practice and counter modules', async () => {
    const { stdout } = await execute(process.execPath, [
      resolve('dist/cli.js'), '--url', url, '--timeout', '10000',
    ], { timeout: 45000, maxBuffer: 16 * 1024 * 1024 });
    const report = JSON.parse(stdout)[url];
    expect(Object.keys(report.modules)).to.have.members([
      'act-rules', 'wcag-techniques', 'best-practices', 'counter',
    ]);
    expect(Object.keys(report.modules['act-rules'].assertions).length).to.be.greaterThan(50);
    expect(Object.keys(report.modules['wcag-techniques'].assertions).length).to.be.greaterThan(20);
  });

  it('preserves EARL output', async () => {
    const { stdout } = await execute(process.execPath, [
      resolve('dist/cli.js'), '--url', url, '--module', 'act-rules',
      '--format', 'earl', '--timeout', '10000',
    ], { timeout: 45000 });
    const report = JSON.parse(stdout)[url];
    expect(report['@context']).to.not.be.undefined;
    expect(report['@graph']).to.be.an('array').and.have.length.greaterThan(0);
  });

  it('evaluates a URL file and writes complete JSON reports to the requested file', async () => {
    const directory = await mkdtemp(resolve(tmpdir(), 'qualweb-cli-'));
    try {
      const input = resolve(directory, 'urls.txt');
      const output = resolve(directory, 'reports.json');
      await writeFile(input, `${url}/first\n${url}/second\n`);
      const { stdout } = await execute(process.execPath, [
        resolve('dist/cli.js'), '--file', input, '--module', 'counter',
        '--out-file', output, '--timeout', '10000',
      ], { timeout: 45000 });
      expect(stdout).to.equal('');
      const reports = JSON.parse(await readFile(output, 'utf8'));
      expect(Object.keys(reports)).to.have.members([`${url}/first`, `${url}/second`]);
      for (const report of Object.values(reports)) {
        expect(report).to.have.nested.property('system.page.dom.title', 'CLI fixture');
        expect(report).to.have.nested.property('modules.counter.data.tags.h1', 1);
      }
    } finally {
      await rm(directory, { recursive: true, force: true });
    }
  });
});
