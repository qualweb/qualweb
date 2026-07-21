import { expect } from 'chai';
import { Server } from 'http';
import { QualWeb } from '@qualweb/core';
import type { QualwebReport, EvaluationReport } from '@qualweb/core/evaluation';
import * as actRulesInterop from '@qualweb/act-rules';
import { PlaywrightDriver } from '../src';
import { createFixtureServer, listen } from './util';

// The act-rules package is a CommonJS webpack bundle whose named exports
// cannot be statically detected. When this spec is loaded as CommonJS
// (ts-node), the namespace import holds the exports directly; when it is
// loaded as native ESM (mocha `import()`s specs, which works for TypeScript
// on Node >= 22.6), they are only reachable through the synthetic default
// export.
const { ACTRules } = (actRulesInterop as { default?: typeof actRulesInterop }).default ?? actRulesInterop;

/**
 * Cross-driver parity: runs the real ACT rules module (in-page bundles and
 * all) against the same fixture page under the default Puppeteer driver and
 * under the Playwright driver, then compares the reports rule by rule.
 *
 * The fixture page (`/act-parity`) contains deliberate, deterministic passes
 * and failures so the comparison is meaningful - a page where every rule is
 * inapplicable would vacuously "match" under any two drivers.
 */
describe('Cross-driver parity (ACT rules)', function () {
  // Two full ACT evaluations, including the mid-evaluation viewport resize
  // for the special-case rules.
  this.timeout(5 * 60 * 1000);

  let server: Server;
  let puppeteerAct: EvaluationReport;
  let playwrightAct: EvaluationReport;

  async function evaluateWith(driver: PlaywrightDriver | undefined, url: string): Promise<QualwebReport> {
    const qualweb = new QualWeb(undefined, driver);
    await qualweb.start();
    try {
      const reports = await qualweb.evaluate({
        url,
        // Pin the viewport so both drivers render the page identically
        // regardless of their default window sizes.
        viewport: { resolution: { width: 1366, height: 768 } },
        log: { console: false },
        modules: [new ACTRules()]
      });
      return reports[url];
    } finally {
      await qualweb.stop();
    }
  }

  before(async function () {
    const { server: fixtureServer, host } = await listen(createFixtureServer());
    server = fixtureServer;
    const url = `${host}/act-parity`;

    const puppeteerReport = await evaluateWith(undefined, url);
    const playwrightReport = await evaluateWith(new PlaywrightDriver(), url);

    expect(puppeteerReport?.modules['act-rules'], 'puppeteer act-rules report').to.not.be.undefined;
    expect(playwrightReport?.modules['act-rules'], 'playwright act-rules report').to.not.be.undefined;

    puppeteerAct = puppeteerReport.modules['act-rules']!;
    playwrightAct = playwrightReport.modules['act-rules']!;
  });

  after(() => {
    server?.close();
  });

  it('Should exercise the fixture meaningfully (sanity check)', function () {
    const outcomes = Object.values(puppeteerAct.assertions).map((assertion) => assertion.metadata.outcome);

    expect(Object.keys(puppeteerAct.assertions).length).to.be.greaterThan(50);
    expect(outcomes.filter((outcome) => outcome === 'failed').length, 'failed rules').to.be.greaterThanOrEqual(3);
    expect(outcomes.filter((outcome) => outcome === 'passed').length, 'passed rules').to.be.greaterThanOrEqual(3);

    // The image without alt text is the most stable failure in the fixture.
    expect(puppeteerAct.assertions['QW-ACT-R17']?.metadata.outcome).to.equal('failed');
  });

  it('Should evaluate the same set of rules under both drivers', function () {
    expect(Object.keys(playwrightAct.assertions).sort()).to.deep.equal(Object.keys(puppeteerAct.assertions).sort());
  });

  it('Should reach the same outcome for every rule', function () {
    const mismatches: Record<string, { puppeteer?: string; playwright?: string }> = {};

    for (const [rule, assertion] of Object.entries(puppeteerAct.assertions)) {
      const other = playwrightAct.assertions[rule];
      if (assertion.metadata.outcome !== other?.metadata.outcome) {
        mismatches[rule] = {
          puppeteer: assertion.metadata.outcome,
          playwright: other?.metadata.outcome
        };
      }
    }

    expect(mismatches).to.deep.equal({});
  });

  it('Should produce the same verdict counts for every rule', function () {
    type Counts = { passed: number; warning: number; failed: number; inapplicable: number };
    const mismatches: Record<string, { puppeteer: Counts; playwright: Counts }> = {};

    const countsOf = (report: EvaluationReport, rule: string): Counts => ({
      passed: report.assertions[rule]?.metadata.passed ?? -1,
      warning: report.assertions[rule]?.metadata.warning ?? -1,
      failed: report.assertions[rule]?.metadata.failed ?? -1,
      inapplicable: report.assertions[rule]?.metadata.inapplicable ?? -1
    });

    for (const rule of Object.keys(puppeteerAct.assertions)) {
      const puppeteerCounts = countsOf(puppeteerAct, rule);
      const playwrightCounts = countsOf(playwrightAct, rule);
      if (JSON.stringify(puppeteerCounts) !== JSON.stringify(playwrightCounts)) {
        mismatches[rule] = { puppeteer: puppeteerCounts, playwright: playwrightCounts };
      }
    }

    expect(mismatches).to.deep.equal({});
  });

  it('Should flag the same elements for failed rules', function () {
    const failedElements = (report: EvaluationReport): Record<string, string[]> => {
      const byRule: Record<string, string[]> = {};
      for (const [rule, assertion] of Object.entries(report.assertions)) {
        if (assertion.metadata.outcome !== 'failed') {
          continue;
        }
        byRule[rule] = assertion.results
          .filter((result) => result.verdict === 'failed')
          .flatMap((result) => result.elements.map((element) => `${result.resultCode}|${element.pointer ?? ''}`))
          .sort();
      }
      return byRule;
    };

    expect(failedElements(playwrightAct)).to.deep.equal(failedElements(puppeteerAct));
  });

  it('Should agree on the module-level totals', function () {
    expect(playwrightAct.metadata).to.deep.equal(puppeteerAct.metadata);
  });
});
