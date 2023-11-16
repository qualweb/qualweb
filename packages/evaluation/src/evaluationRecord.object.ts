import Metadata from './metadata.object';
import { EvaluationReport, Evaluator, Modules, Module } from '@qualweb/core';
import { Report } from '@qualweb/earl-reporter';
import { WappalyzerReport } from '@qualweb/wappalyzer';
import { ACTRulesReport } from '@qualweb/act-rules';
import { WCAGTechniquesReport } from '@qualweb/wcag-techniques';
import { BestPracticesReport } from '@qualweb/best-practices';
import { CounterReport } from '@qualweb/counter';

class EvaluationRecord {
  private readonly type: 'evaluation';
  private readonly evaluator: Evaluator;
  private readonly metadata: Metadata;
  private readonly modules: Modules;

  constructor(evaluator: Evaluator) {
    this.type = 'evaluation';
    this.evaluator = evaluator;
    this.metadata = new Metadata();
    this.modules = {};
  }

  public addModuleEvaluation(module: Module, evaluation: Report | WappalyzerReport | CounterReport): void {
    if (evaluation) {
      switch (module) {
        case 'act-rules':
          this.modules['act-rules'] = <ACTRulesReport>evaluation;
          break;
        case 'wcag-techniques':
          this.modules['wcag-techniques'] = <WCAGTechniquesReport>evaluation;
          break;
        case 'best-practices':
          this.modules['best-practices'] = <BestPracticesReport>evaluation;
          break;
        case 'wappalyzer':
          this.modules['wappalyzer'] = <WappalyzerReport>evaluation;
          break;
        case 'counter':
          this.modules['counter'] = <CounterReport>evaluation;
          break;
        default:
          throw new Error('Invalid module report.');
      }

      if (module !== 'wappalyzer' && module !== 'counter') {
        this.metadata.addPassedResults(this.modules[module]?.metadata.passed ?? 0);
        this.metadata.addWarningResults(this.modules[module]?.metadata.warning ?? 0);
        this.metadata.addFailedResults(this.modules[module]?.metadata.failed ?? 0);
        this.metadata.addInapplicableResults(this.modules[module]?.metadata.inapplicable ?? 0);
      }
    }
  }

  public getFinalReport(): EvaluationReport {
    return {
      type: this.type,
      system: this.evaluator,
      metadata: this.metadata.getResults(),
      modules: this.modules
    };
  }
}

export = EvaluationRecord;
