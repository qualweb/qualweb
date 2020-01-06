'use strict';

import clone from 'lodash.clone';
import { EvaluationReport } from '@qualweb/core';
import Metadata from './metadata.object';

class Evaluation {
  
  private type: 'evaluation';
  private evaluator: any;
  private metadata: Metadata;
  private modules: any;

  constructor(evaluator: any) {
    this.type = 'evaluation';
    this.evaluator = clone(evaluator);
    this.metadata = new Metadata();
    this.modules = {};
  }

  public addModuleEvaluation(module: any, evaluation: any): void {
    this.modules[module] = clone(evaluation);
    if (module !== 'wappalyzer') {
      this.metadata.addPassedResults(evaluation.metadata.passed || 0);
      this.metadata.addWarningResults(evaluation.metadata.warning || 0);
      this.metadata.addFailedResults(evaluation.metadata.failed || 0);
      this.metadata.addInapplicableResults(evaluation.metadata.inapplicable || 0);
    }
  }

  public getFinalReport(): EvaluationReport {
    return clone({
      type: this.type,
      system: this.evaluator,
      metadata: this.metadata.getResults(),
      modules: this.modules
    });
  }
}

export = Evaluation;