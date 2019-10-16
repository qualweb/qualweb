'use strict';

import { BestPractice as BestPracticeType, BestPracticeResult } from '@qualweb/best-practices';
import clone from 'lodash/clone';
import cloneDeep from 'lodash/cloneDeep';
import { DomElement } from 'htmlparser2';

abstract class BestPractice {

  private bestPractice: BestPracticeType;

  constructor(bestPractice: BestPracticeType) {
    this.bestPractice = bestPractice;
  }

  public getBestPracticeMapping(): string | undefined {
    return this.bestPractice.mapping;
  }

  protected getNumberOfPassedResults(): number {
    return this.bestPractice.metadata.passed;
  }

  protected getNumberOfFailedResults(): number {
    return this.bestPractice.metadata.failed;
  }

  protected getNumberOfInapplicableResults(): number {
    return this.bestPractice.metadata.inapplicable;
  }

  protected addEvaluationResult(result: BestPracticeResult): void {
    this.bestPractice.results.push(clone(result));
    this.bestPractice.metadata[result.verdict]++;
  }

  public abstract async execute(element: DomElement | undefined, dom: DomElement[]): Promise<void>;

  public getFinalResults() {
    this.outcomeBestPractice();
    return cloneDeep(this.bestPractice);
  }

  public reset(): void {
    this.bestPractice.metadata.passed = 0;
    this.bestPractice.metadata.warning = 0;
    this.bestPractice.metadata.failed = 0;
    this.bestPractice.metadata.inapplicable = 0;
    this.bestPractice.results = new Array<BestPracticeResult>();
  }

  private outcomeBestPractice(): void {
    if (this.bestPractice.metadata.failed > 0) {
      this.bestPractice.metadata.outcome = 'failed';
    } else if (this.bestPractice.metadata.warning > 0) {
      this.bestPractice.metadata.outcome = 'warning';
    } else if (this.bestPractice.metadata.passed > 0) {
      this.bestPractice.metadata.outcome = 'passed';
    } else {
      this.bestPractice.metadata.outcome = 'inapplicable';
    }

    if (this.bestPractice.results.length > 0) {
      this.addDescription();
    }
  }

  private addDescription(): void {
    for (const result of this.bestPractice.results || []) {
      if (result.verdict === this.bestPractice.metadata.outcome) {
        this.bestPractice.metadata.description = <string> result.description;
        break;
      }
    }
  }
}

export = BestPractice;