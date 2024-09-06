import type { CounterReport } from './counter';
import type { ModuleType, Verdict } from './enums';

export type Level = 'A' | 'AA' | 'AAA';
export type Principle = 'Perceivable' | 'Operable' | 'Understandable' | 'Robust';

export type SuccessCriteria = {
  name: string;
  level: Level;
  principle: Principle;
  url: string;
  url_tr?: string;
};

export type EvaluationElement = {
  pointer?: string;
  htmlCode?: string;
  accessibleName?: string;
  attributes?: string | string[];
  cssCode?: string;
  property?: {
    name?: string;
    value?: string;
  };
  stylesheetFile?: string;
  additional?: {
    [key: string]: string | number | boolean;
  };
};

export type TestResult = {
  verdict: Verdict;
  description: string;
  resultCode: string;
  elements: EvaluationElement[];
  attributes: string[];
};

export type AssertionMetadata = {
  target: {
    'parent-sibling'?: string;
    parent?: string | string[];
    element?: string | string[];
    children?: string | string[];
    attributes?: string | string[];
    css?: string | string[];
  };
  'success-criteria': SuccessCriteria[];
  related: string[];
  url: string;
  results: {
    [verdict in Verdict]: number;
  };
  passed: number;
  warning: number;
  failed: number;
  inapplicable: number;
  type?: string[];
  a11yReq?: string[];
  outcome: string;
  description: string;
};

export type Assertion = {
  name: string;
  code: string;
  mapping: string;
  description: string;
  metadata: AssertionMetadata;
  results: TestResult[];
};

export type ModuleMetadata = {
  [verdict in Verdict]: number;
};

export type EvaluationReport = {
  type: ModuleType;
  metadata: ModuleMetadata;
  assertions: {
    [key: string]: Assertion;
  };
};

export type Message = {
  url: string;
  type: 'error' | 'info';
  subType?: 'warning';
  message: string;
  extract: string;
  firstColumn?: number;
  lastColumn?: number;
  hiliteLength?: number;
  hiliteStart?: number;
  lastLine?: number;
};

export type HTMLValidationReport = {
  messages: Message[];
};

export type DomData = {
  html: string;
  title?: string;
  elementCount?: number;
};

export type SystemData = {
  name: string;
  description: string;
  version: string;
  homepage: string;
  date: string;
  hash: string;
  url?: Url;
  page: {
    viewport: {
      mobile?: boolean;
      landscape?: boolean;
      userAgent: string;
      resolution?: {
        width?: number;
        height?: number;
      };
    };
    dom: DomData;
  };
};

export type Url = {
  inputUrl: string;
  protocol: string;
  domainName: string;
  domain: string;
  uri: string;
  completeUrl: string;
};

export type Metadata = {
  [verdict in Verdict]: number;
};

export type ModulesData = {
  'act-rules'?: EvaluationReport;
  'wcag-techniques'?: EvaluationReport;
  'best-practices'?: EvaluationReport;
  counter?: CounterReport;
};

export type QualwebReport = {
  type: 'evaluation';
  system: SystemData;
  metadata: Metadata;
  modules: ModulesData;
};
