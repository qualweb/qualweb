//import { EvaluationReport } from '@qualweb/core';

declare module '@qualweb/earl-reporter' {
  import { EvaluationReport } from '@qualweb/core';
  import { ACTRulesReport } from '@qualweb/act-rules';
  import { HTMLTechniquesReport } from '@qualweb/html-techniques';
  import { CSSTechniquesReport } from '@qualweb/css-techniques';

  interface EarlOptions {
    [option: string]: any;
  }

  interface Assertor {
    '@id': string;
    '@type': string;
    title: string;
    description: string;
    hasVersion: string;
    homepage: string;
    isPartOf?: string;
    hasPart?: string;
  }

  interface Assertion {
    '@type': string;
    test: {
      title: string;
      description: string;
    };
    mode: string;
    result: TestResult;
  }

  interface ResultSource {
    result: {
      outcome: string;
      pointer?: string;
    };
  }

  interface TestResult {
    '@type': string;
    outcome: string;
    source: ResultSource[];
    description: string;
    date: string;
  }

  interface TestSubject {
    '@type': string;
    source: string;
    assertor: Assertor;
    assertions: Assertion[];
  }

  interface EarlReport {
    context: string;
    graph: TestSubject[];
  }

  type Report = ACTRulesReport | HTMLTechniquesReport | CSSTechniquesReport;

  function generateEarlAssertions(report: Report): Promise<Assertion[]>;
  function generateSingleEarlReport(report: EvaluationReport): Promise<EarlReport>;
  function generateAggregatedEarlReport(reports: EvaluationReport[]): Promise<EarlReport>;

  export {
    EarlOptions,
    Report,
    EarlReport,
    Assertor,
    Assertion,
    ResultSource,
    TestResult,
    TestSubject,
    generateSingleEarlReport,
    generateAggregatedEarlReport
  };
}