'use strict';

import cloneDeep from 'lodash/cloneDeep';
import { EvaluationReport } from '@qualweb/core';
import {
  Report,
  EarlReport, 
  TestSubject, 
  Assertor, 
  Assertion
} from '@qualweb/earl-reporter';

import ACTRulesReportToEARL from './lib/act-rules.reporter';
import HTMLTechniquesReportToEARL from './lib/html-techniques.reporter';
import CSSTechniquesReportToEARL from './lib/css-techniques.reporter';
import BestPracticesReportToEARL from './lib/best-practices.reporter';

async function generateEarlAssertions(report: Report, date?: string): Promise<Assertion[]> {
  switch(report.type) {
    case 'act-rules':
      return await ACTRulesReportToEARL(report, date);
    case 'html-techniques':
      return await HTMLTechniquesReportToEARL(report, date);
    case 'css-techniques':
      return await CSSTechniquesReportToEARL(report, date);
    case 'best-practices':
      return await BestPracticesReportToEARL(report, date);
    default:
      throw new Error('Invalid report type');
  }
}

async function generateSingleEarlReport(report: EvaluationReport): Promise<EarlReport> {

  const earlReport: EarlReport = {
    context: 'https://act-rules.github.io/earl-context.json',
    graph: new Array<TestSubject>()
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
    source: report.system.url.completeUrl,
    assertor,
    assertions: new Array<Assertion>()
  };

  if (report.modules['act-rules']) {
    testSubject.assertions = [
      ...testSubject.assertions, 
      ...(await generateEarlAssertions(report.modules['act-rules'], report.system.date))
    ];
  }
  if (report.modules['html-techniques']) {
    testSubject.assertions = [
      ...testSubject.assertions, 
      ...(await generateEarlAssertions(report.modules['html-techniques'], report.system.date))
    ];
  }
  if (report.modules['css-techniques']) {
    testSubject.assertions = [
      ...testSubject.assertions, 
      ...(await generateEarlAssertions(report.modules['css-techniques'], report.system.date))
    ];
  }
  if (report.modules['best-practices']) {
    testSubject.assertions = [
      ...testSubject.assertions, 
      ...(await generateEarlAssertions(report.modules['best-practices'], report.system.date))
    ];
  }

  earlReport.graph.push(cloneDeep(testSubject));

  return earlReport;
}

async function generateAggregatedEarlReport(reports: EvaluationReport[]): Promise<EarlReport> {
  const aggregatedReport: EarlReport = {
    context: 'https://act-rules.github.io/earl-context.json',
    graph: new Array<TestSubject>()
  };

  for (const report of reports || []) {
    const earlReport = await generateSingleEarlReport(report);
    aggregatedReport.graph.push(cloneDeep(earlReport.graph[0]));
  }

  return aggregatedReport;
}

export {
  generateEarlAssertions,
  generateSingleEarlReport,
  generateAggregatedEarlReport
};