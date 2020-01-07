'use strict';

import clone from 'lodash.clone';
import cloneDeep from 'lodash.clonedeep';
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
    this.modules[module] = cloneDeep(evaluation);
    if (module !== 'wappalyzer') {
      this.metadata.addPassedResults(this.modules[module].metadata.passed || 0);
      this.metadata.addWarningResults(this.modules[module].metadata.warning || 0);
      this.metadata.addFailedResults(this.modules[module].metadata.failed || 0);
      this.metadata.addInapplicableResults(this.modules[module].metadata.inapplicable || 0);
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