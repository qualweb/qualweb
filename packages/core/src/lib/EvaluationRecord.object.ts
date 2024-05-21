import type { Module, EvaluationReport, Evaluator, Modules, QualwebReport, CounterReport } from '@shared/types';
import { Metadata } from './Metadata.object';

class EvaluationRecord {
  private readonly evaluator: Evaluator;
  private readonly metadata: Metadata;
  private readonly modules: Modules;

  constructor(evaluator: Evaluator) {
    this.evaluator = evaluator;
    this.metadata = new Metadata();
    this.modules = {};
  }

  public addModuleEvaluation(module: Module | 'counter', evaluation: EvaluationReport | CounterReport): void {
    if (module === 'counter') {
      this.modules[module] = evaluation as CounterReport;
    } else {
      this.modules[module] = evaluation as EvaluationReport;
      this.metadata.addPassedResults(this.modules[module]?.metadata.passed ?? 0);
      this.metadata.addWarningResults(this.modules[module]?.metadata.warning ?? 0);
      this.metadata.addFailedResults(this.modules[module]?.metadata.failed ?? 0);
      this.metadata.addInapplicableResults(this.modules[module]?.metadata.inapplicable ?? 0);
    }
  }

  public getFinalReport(): QualwebReport {
    return {
      type: 'evaluation',
      system: this.evaluator,
      metadata: this.metadata.getResults(),
      modules: this.modules
    };
  }
}

export { EvaluationRecord };
