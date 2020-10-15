import clone from 'lodash.clone';
import cloneDeep from 'lodash.clonedeep';
import Metadata from './metadata.object';
import { EvaluationReport, Evaluator, Modules, Module } from '@qualweb/core';
import { Report } from '@qualweb/earl-reporter';
import { WappalyzerReport } from '@qualweb/wappalyzer';

class EvaluationRecord {
  
  private readonly type: 'evaluation';
  private evaluator: Evaluator;
  private metadata: Metadata;
  private modules: Modules;

  constructor(evaluator: Evaluator) {
    this.type = 'evaluation';
    this.evaluator = clone(evaluator);
    this.metadata = new Metadata();
    this.modules = {};
  }

  public addModuleEvaluation(module: Module, evaluation: Report | WappalyzerReport): void {
    this.modules[module] = cloneDeep(evaluation);
    if (module !== 'wappalyzer') {
      // @ts-ignore
      this.metadata.addPassedResults(this.modules[module].metadata.passed || 0);
      // @ts-ignore
      this.metadata.addWarningResults(this.modules[module].metadata.warning || 0);
      // @ts-ignore
      this.metadata.addFailedResults(this.modules[module].metadata.failed || 0);
      // @ts-ignore
      this.metadata.addInapplicableResults(this.modules[module].metadata.inapplicable || 0);
    }
  }

  public getFinalReport(): EvaluationReport {
    return cloneDeep({
      type: this.type,
      system: this.evaluator,
      metadata: this.metadata.getResults(),
      modules: this.modules
    });
  }
}

export = EvaluationRecord;