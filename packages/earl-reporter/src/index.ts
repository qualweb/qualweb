import cloneDeep from 'lodash.clonedeep';
import { EvaluationReport } from '@qualweb/core';
import { Report, EarlReport, TestSubject, Assertor, Assertion, EarlOptions } from '@qualweb/earl-reporter';

import ACTRulesReportToEARL from './lib/act-rules.reporter';
import WCAGTechniquesReportToEARL from './lib/wcag-techniques.reporter';
import BestPracticesReportToEARL from './lib/best-practices.reporter';

const wcagTechniques = 'wcag-techniques';
const bestPractices = 'best-practices';

async function generateEARLAssertions(report: Report | undefined, date?: string): Promise<Assertion[]> {
  if (report) {
    switch (report.type) {
      case 'act-rules':
        return await ACTRulesReportToEARL(report, date);
      case wcagTechniques:
        return await WCAGTechniquesReportToEARL(report, date);
      case bestPractices:
        return await BestPracticesReportToEARL(report, date);
      default:
        throw new Error('Invalid report type');
    }
  } else {
    throw new Error('Report is not defined');
  }
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
      case bestPractices:
        return !!options.modules[bestPractices];
      default:
        return false;
    }
  }
}

async function generateSingleEarlReport(report: EvaluationReport, options?: EarlOptions): Promise<EarlReport> {
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
    source: report.system.url?.inputUrl || '',
    assertor,
    assertions: new Array<Assertion>()
  };

  if (report.system.url && report.system.url.inputUrl !== report.system.url.completeUrl) {
    testSubject.redirectedTo = report.system.url.completeUrl;
  }

  if (report.modules['act-rules'] && reportModule('act', options)) {
    testSubject.assertions = [
      ...testSubject.assertions,
      ...(await generateEARLAssertions(report.modules['act-rules'], report.system.date))
    ];
  }
  if (report.modules[wcagTechniques] && reportModule('wcag', options)) {
    testSubject.assertions = [
      ...testSubject.assertions,
      ...(await generateEARLAssertions(report.modules[wcagTechniques], report.system.date))
    ];
  }
  if (report.modules[bestPractices] && reportModule(bestPractices, options)) {
    testSubject.assertions = [
      ...testSubject.assertions,
      ...(await generateEARLAssertions(report.modules[bestPractices], report.system.date))
    ];
  }

  earlReport['@graph'].push(cloneDeep(testSubject));

  return earlReport;
}

async function generateAggregatedEarlReport(reports: EvaluationReport[], options?: EarlOptions): Promise<EarlReport> {
  const aggregatedReport: EarlReport = {
    '@context': 'https://act-rules.github.io/earl-context.json',
    '@graph': new Array<TestSubject>()
  };

  for (const report of reports || []) {
    const earlReport = await generateSingleEarlReport(report, options);
    aggregatedReport['@graph'].push(cloneDeep(earlReport['@graph'][0]));
  }

  return aggregatedReport;
}

async function generateEARLReport(
  reports: { [url: string]: EvaluationReport },
  options?: EarlOptions
): Promise<{ [url: string]: EarlReport }> {
  const earlReports: { [url: string]: EarlReport } = {};
  if (options && options.aggregated) {
    const firstUrl = Object.keys(reports)[0];
    earlReports[options.aggregatedName || firstUrl] = await generateAggregatedEarlReport(
      Object.values(reports),
      options
    );
  } else {
    for (const url in reports || {}) {
      const earlReport = await generateSingleEarlReport(reports[url], options);
      earlReports[url] = cloneDeep(earlReport);
    }
  }
  return cloneDeep(earlReports);
}

export { generateEARLAssertions, generateEARLReport };
