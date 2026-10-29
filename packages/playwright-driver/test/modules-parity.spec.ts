import { expect } from 'chai';
import type { Server } from 'http';
import { QualWeb } from '@qualweb/core';
import type { Driver } from '@qualweb/core';
import type { QualwebReport, EvaluationReport } from '@qualweb/core/evaluation';
import * as actRulesInterop from '@qualweb/act-rules';
import * as bestPracticesInterop from '@qualweb/best-practices';
import { WCAGTechniquesModule } from '@qualweb/wcag-techniques/WcagTechniquesModule';
import { Counter } from '@qualweb/counter';
import { PuppeteerDriver } from '@qualweb/puppeteer-driver';
import { chromium } from 'playwright';
import { createFixtureServer, listen } from './util';

const { ACTRules } = (actRulesInterop as { default?: typeof actRulesInterop }).default ?? actRulesInterop;
const { BestPractices } = (bestPracticesInterop as { default?: typeof bestPracticesInterop }).default ?? bestPracticesInterop;

describe('Cross-driver parity (all modules and default selection)', function () {
  this.timeout(120000);
  let server: Server;
  let url: string;
  let html: string;

  before(async () => {
    const fixture = await listen(createFixtureServer());
    server = fixture.server;
    url = `${fixture.host}/act-parity`;
    html = await (await fetch(url)).text();
  });
  after(() => server?.close());

  for (const input of ['url', 'html'] as const) {
    describe(input === 'url' ? 'URL without an explicit viewport' : 'raw HTML with an explicit viewport', () => {
      let legacy: QualwebReport;
      let current: QualwebReport;

      before(async () => {
        async function evaluate(driver?: Driver): Promise<QualwebReport> {
          const qualweb = new QualWeb(undefined, driver);
          await qualweb.start();
          try {
            const reports = await qualweb.evaluate({
              ...(input === 'url' ? { url } : {
                html,
                viewport: { resolution: { width: 1366, height: 768 } },
              }),
              modules: [new ACTRules(), new WCAGTechniquesModule(), new BestPractices(), new Counter()],
              log: { console: true },
            });
            const report = reports[input === 'url' ? url : 'customHtml'];
            expect(report, 'evaluation must produce a report, not silently fail').to.not.be.undefined;
            return report;
          } finally {
            await qualweb.stop();
          }
        }

        legacy = await evaluate(new PuppeteerDriver({
          launchOptions: { executablePath: chromium.executablePath(), headless: true },
        }));
        current = await evaluate();
      });

      for (const name of ['act-rules', 'wcag-techniques', 'best-practices'] as const) {
        it(`preserves ${name} rule sets, outcomes, counts and failed-element pointers`, () => {
          const oldReport = legacy.modules[name];
          const newReport = current.modules[name];
          if (!oldReport || !newReport) {
            throw new Error(`Missing ${name} report`);
          }
          expect(Object.keys(oldReport.assertions).length).to.be.greaterThan(10);
          const outcomes = Object.values(oldReport.assertions).map((assertion) => assertion.metadata.outcome);
          expect(outcomes).to.include('passed');
          expect(outcomes).to.include('failed');
          if (name === 'best-practices') {
            expect(oldReport.assertions['QW-BP2'].metadata.outcome).to.equal('failed');
          }
          const summarize = (report: EvaluationReport) => Object.fromEntries(
            Object.entries(report.assertions).map(([rule, assertion]) => [rule, {
              metadata: {
                outcome: assertion.metadata.outcome,
                passed: assertion.metadata.passed,
                failed: assertion.metadata.failed,
                warning: assertion.metadata.warning,
                inapplicable: assertion.metadata.inapplicable,
                // Puppeteer omits undefined fields; Playwright preserves them.
                description: assertion.metadata.description ?? null,
              },
              failures: assertion.results.filter((result) => result.verdict === 'failed').map((result) => ({
                code: result.resultCode,
                pointers: result.elements.map((element) => element.pointer).sort(),
              })),
            }])
          );
          expect(summarize(newReport)).to.deep.equal(summarize(oldReport));
          expect(newReport.metadata).to.deep.equal(oldReport.metadata);
        });
      }

      it('preserves actual tag/role counts and page metadata', () => {
        expect(current.modules.counter).to.deep.equal(legacy.modules.counter);
        expect(current.modules.counter).to.have.nested.property('data.tags.img', 3);
        expect(current.modules.counter).to.have.nested.property('data.tags.button', 2);
        expect(current.system.page.dom.title).to.equal('ACT parity fixture');
        expect(current.system.page.dom.title).to.equal(legacy.system.page.dom.title);
      });
    });
  }
});
