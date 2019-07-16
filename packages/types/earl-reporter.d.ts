//import { EvaluationReport } from '@qualweb/core';

declare module '@qualweb/earl-reporter' {
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
      pointer: string;
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

  function generateSingleReport(report: any): Promise<EarlReport>;
  function generateAggregatedReport(reports: any[]): Promise<EarlReport>;

  export {
    EarlOptions,
    EarlReport,
    Assertor,
    Assertion,
    ResultSource,
    TestResult,
    TestSubject,
    generateSingleReport,
    generateAggregatedReport
  };
}