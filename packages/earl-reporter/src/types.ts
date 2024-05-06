export type EarlOptions = {
  aggregated?: boolean;
  aggregatedName?: string;
  modules?: {
    act?: boolean;
    wcag?: boolean;
    'best-practices'?: boolean;
  };
};

export interface Assertor {
  '@id': string;
  '@type': string;
  title: string;
  description: string;
  hasVersion: string;
  homepage: string;
  isPartOf?: string;
  hasPart?: string;
}

export interface Assertion {
  '@type': string;
  test: {
    '@id': string;
    '@type': 'TestCase';
    title: string;
    description: string;
    isPartOf?: string[];
  };
  mode: string;
  result: TestResult;
}

export interface ResultSource {
  result: {
    outcome: string;
    pointer?: string;
  };
}

export interface TestResult {
  '@type': string;
  outcome: string;
  source: ResultSource[];
  description: string;
  date: string;
}

export interface TestSubject {
  '@type': string;
  source: string;
  redirectedTo?: string;
  assertor: Assertor;
  assertions: Assertion[];
}

export interface EarlReport {
  '@context': string;
  '@graph': TestSubject[];
}

export interface EarlEvaluations {
  [url: string]: EarlReport;
}
