import { CounterReport } from './CounterReport';
import { EvaluationReport } from './EvaluationReport';

export type ModulesData = {
  'act-rules'?: EvaluationReport;
  'wcag-techniques'?: EvaluationReport;
  'best-practices'?: EvaluationReport;
  counter?: CounterReport;
};