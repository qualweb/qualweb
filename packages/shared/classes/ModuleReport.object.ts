import type { Rule } from '@qualweb/act-rules';
import type { Technique } from '@qualweb/wcag-techniques';
import type { Module, Assertion, EvaluationReport } from '../types';

export class ModuleReport<T extends Rule | Technique> {
  private readonly report: EvaluationReport;

  constructor(module: Module) {
    this.report = {
      type: module,
      metadata: {
        passed: 0,
        warning: 0,
        failed: 0,
        inapplicable: 0
      },
      assertions: {}
    };
  }

  public getAssertions(assertion: string): Assertion {
    return this.report.assertions[assertion];
  }

  public addAssertionResult(assertion: T): void {
    const code = assertion.getCode();
    this.report.assertions[code] = assertion.getFinalResults();
    this.report.metadata[this.report.assertions[code].metadata.outcome]++;
  }

  public getCopy(): EvaluationReport {
    return { ...this.report };
  }
}
