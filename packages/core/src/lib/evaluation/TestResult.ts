import { EvaluationElement } from './EvaluationElement';
import { Verdict } from './Verdict';

export type TestResult = {
  verdict: Verdict;
  description: string;
  resultCode: string;
  elements: EvaluationElement[];
  attributes: string[];
};