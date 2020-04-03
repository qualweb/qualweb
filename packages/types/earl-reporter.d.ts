//import { EvaluationReport } from '@qualweb/core';

declare module '@qualweb/earl-reporter' {
  import { EvaluationReport } from '@qualweb/core';
  import { ACTRulesReport } from '@qualweb/act-rules';
  import { HTMLTechniquesReport } from '@qualweb/html-techniques';
  import { CSSTechniquesReport } from '@qualweb/css-techniques';
  import { BestPracticesReport } from '@qualweb/best-practices';

  interface EarlOptions {
    aggregated?: boolean;
    aggregatedName?: string;
    modules?: {
      act?: boolean;
      html?: boolean;
      css?: boolean;
      'best-practices'?: boolean;
    };
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
      '@id': string;
      '@type': 'TestCase';
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
    redirectedTo?: string;
    assertor: Assertor;
    assertions: Assertion[];
  }

  interface EarlReport {
    '@context': string;
    '@graph': TestSubject[];
  }

  type Report = ACTRulesReport | HTMLTechniquesReport | CSSTechniquesReport | BestPracticesReport;

  function generateEARLAssertions(report: Report): Promise<Assertion[]>;
  function generateEARLReport(reports: {[url: string]: EvaluationReport}, options?: EarlOptions): Promise<{[url: string]: EarlReport}>;

  export {
    EarlContext,
    EarlOptions,
    Report,
    EarlReport,
    Assertor,
    Assertion,
    ResultSource,
    TestResult,
    TestSubject,
    generateEARLAssertions,
    generateEARLReport
  };
}