import cloneDeep from 'lodash.clonedeep';
import { EvaluationReport } from '@qualweb/core';
import { ACTRule } from '@qualweb/act-rules';
import { WCAGTechnique } from '@qualweb/wcag-techniques';
import { BestPractice } from '@qualweb/best-practices';
import {
  EarlReport,
  TestSubject,
  Assertor,
  Assertion,
  EarlOptions,
  TestResult,
  ResultSource,
  Report
} from '@qualweb/earl-reporter';

function generateEARLAssertions(report: Report, date?: string): Array<Assertion> {
  const assertions = new Array<Assertion>();

  for (const name in report.assertions || {}) {
    if (report.assertions[name]) {
      const test = report.assertions[name];
      if (test) {
        const sources = generateSources(test);

        const result: TestResult = {
          '@type': 'TestResult',
          outcome: 'earl:' + (test.metadata.outcome !== 'warning' ? test.metadata.outcome : 'cantTell'),
          source: sources,
          description: test.metadata.description,
          date: date ?? new Date().toISOString().replace(/T/, ' ').replace(/\..+/, '')
        };

        const assertion: Assertion = {
          '@type': 'Assertion',
          test: {
            '@id': test.metadata.url ?? test.name,
            '@type': 'TestCase',
            title: test.name,
            description: test.description
          },
          mode: 'earl:automatic',
          result
        };

        assertions.push(assertion);
      }
    }
  }

  return assertions;
}

function generateSources(test: ACTRule | WCAGTechnique | BestPractice): Array<ResultSource> {
  const sources = new Array<ResultSource>();

  for (const result of test.results || []) {
    const source: ResultSource = {
      result: {
        pointer: result.elements
          ?.filter((e) => e.pointer !== undefined)
          .map((e) => e.pointer)
          .join(', '),
        outcome: 'earl:' + (result.verdict !== 'warning' ? result.verdict : 'cantTell')
      }
    };

    sources.push(source);
  }

  return sources;
}

function reportModule(module: string, options?: EarlOptions): boolean {
  if (!options || !options.modules) {
    return true;
  } else {
    switch (module) {
      case 'act':
        return !!options.modules.act;
      case 'wcag':
        return !!options.modules.wcag;
      case 'best-practices':
        return !!options.modules['best-practices'];
      default:
        return false;
    }
  }
}

function generateSingleEarlReport(report: EvaluationReport, options?: EarlOptions): EarlReport {
  const earlReport: EarlReport = {
    '@context': 'https://act-rules.github.io/earl-context.json',
    '@graph': new Array<TestSubject>()
  };

  const assertor: Assertor = {
    '@id': report.system.name,
    '@type': 'Software',
    title: report.system.name,
    description: report.system.description,
    hasVersion: report.system.version,
    homepage: report.system.homepage
  };

  const testSubject: TestSubject = {
    '@type': 'TestSubject',
    source: report.system.url?.inputUrl ?? '',
    assertor,
    assertions: new Array<Assertion>()
  };

  if (report.system.url && report.system.url.inputUrl !== report.system.url.completeUrl) {
    testSubject.redirectedTo = report.system.url.completeUrl;
  }

  if (report.modules['act-rules'] && reportModule('act', options)) {
    testSubject.assertions = [
      ...testSubject.assertions,
      ...generateEARLAssertions(report.modules['act-rules'], report.system.date)
    ];
  }
  if (report.modules['wcag-techniques'] && reportModule('wcag', options)) {
    testSubject.assertions = [
      ...testSubject.assertions,
      ...generateEARLAssertions(report.modules['wcag-techniques'], report.system.date)
    ];
  }
  if (report.modules['best-practices'] && reportModule('best-practices', options)) {
    testSubject.assertions = [
      ...testSubject.assertions,
      ...generateEARLAssertions(report.modules['best-practices'], report.system.date)
    ];
  }

  earlReport['@graph'].push(cloneDeep(testSubject));

  return earlReport;
}

function generateAggregatedEarlReport(reports: EvaluationReport[], options?: EarlOptions): EarlReport {
  const aggregatedReport: EarlReport = {
    '@context': 'https://act-rules.github.io/earl-context.json',
    '@graph': new Array<TestSubject>()
  };

  for (const report of reports || []) {
    const earlReport = generateSingleEarlReport(report, options);
    aggregatedReport['@graph'].push(cloneDeep(earlReport['@graph'][0]));
  }

  return aggregatedReport;
}

function generateEARLReport(
  reports: { [url: string]: EvaluationReport },
  options?: EarlOptions
): { [url: string]: EarlReport } {
  const earlReports: { [url: string]: EarlReport } = {};
  if (options && options.aggregated) {
    const firstUrl = Object.keys(reports)[0];
    earlReports[options.aggregatedName || firstUrl] = generateAggregatedEarlReport(Object.values(reports), options);
  } else {
    for (const url in reports || {}) {
      const earlReport = generateSingleEarlReport(reports[url], options);
      earlReports[url] = cloneDeep(earlReport);
    }
  }
  return cloneDeep(earlReports);
}

export { generateEARLAssertions, generateEARLReport };
