import clone from 'lodash.clone';
import cloneDeep from 'lodash.clonedeep';
import Metadata from './metadata.object';
import { EvaluationReport, Evaluator, Modules, Module } from '@qualweb/core';
import { Report } from '@qualweb/earl-reporter';
import { WappalyzerReport } from '@qualweb/wappalyzer';
import { ACTRulesReport } from '@qualweb/act-rules';
import { WCAGTechniquesReport } from '@qualweb/wcag-techniques';
import { BestPracticesReport } from '@qualweb/best-practices';

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
    const clonedEvaluation = cloneDeep(evaluation); 
    if (clonedEvaluation) {
      switch (module) {
        case 'act-rules':
          this.modules['act-rules'] = <ACTRulesReport> clonedEvaluation;
          break;
        case 'wcag-techniques':
          this.modules['wcag-techniques'] = <WCAGTechniquesReport> clonedEvaluation;
          break;
        case 'best-practices':
          this.modules['best-practices'] = <BestPracticesReport> clonedEvaluation;
          break;
      }

      if (module !== 'wappalyzer') {
        this.metadata.addPassedResults(this.modules[module]?.metadata.passed || 0);
        this.metadata.addWarningResults(this.modules[module]?.metadata.warning || 0);
        this.metadata.addFailedResults(this.modules[module]?.metadata.failed || 0);
        this.metadata.addInapplicableResults(this.modules[module]?.metadata.inapplicable || 0);
      }
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