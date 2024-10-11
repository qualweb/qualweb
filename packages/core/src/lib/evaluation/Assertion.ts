import { AssertionMetadata } from './AssertionMetadata';
import { TestResult } from './TestResult';

export type Assertion = {
  name: string;
  code: string;
  mapping: string;
  description: string;
  metadata: AssertionMetadata;
  results: TestResult[];
};