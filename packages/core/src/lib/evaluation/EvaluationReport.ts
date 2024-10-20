import { Assertion } from './Assertion';
import { ModuleMetadata } from './ModuleMetadata';
import { ModuleType } from './ModuleType';

export type EvaluationReport = {
  type: ModuleType;
  metadata: ModuleMetadata;
  assertions: {
    [key: string]: Assertion;
  };
};