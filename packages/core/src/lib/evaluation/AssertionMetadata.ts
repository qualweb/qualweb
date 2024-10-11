import { SuccessCriteria } from './SuccessCriteria';
import { Verdict } from './Verdict';

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