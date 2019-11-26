'use strict';

import clone from 'lodash/clone';
import cloneDeep from 'lodash/cloneDeep';
import { HTMLTechnique, HTMLTechniqueResult } from '@qualweb/html-techniques';
import { Page, ElementHandle } from 'puppeteer';

abstract class Technique {

  private technique: HTMLTechnique;

  constructor(technique: HTMLTechnique) {
    this.technique = technique;
  }

  getTechniqueMapping(): string {
    return this.technique.mapping;
  }

  hasPrincipleAndLevels(principles: string[], levels: string[]): boolean {
    let has = false;
    for (const sc of this.technique.metadata['success-criteria'] || []) {
      if (principles.includes(sc.principle) && levels.includes(sc.level)) {
        has = true;
      }
    }
    return has;
  }

  protected getNumberOfPassedResults(): number {
    return this.technique.metadata.passed;
  }

  protected getNumberOfWarningResults(): number {
    return this.technique.metadata.warning;
  }

  protected getNumberOfFailedResults(): number {
    return this.technique.metadata.failed;
  }

  protected getNumberOfInapplicableResults(): number {
    return this.technique.metadata.inapplicable;
  }

  protected addEvaluationResult(result: HTMLTechniqueResult): void {
    this.technique.results.push(clone(result));
    this.technique.metadata[result.verdict]++;
  }

  abstract async execute(element: ElementHandle | undefined, page: Page): Promise<void>;

  getFinalResults() {
    this.outcomeTechnique();
    return cloneDeep(this.technique);
  }

  reset(): void {
    this.technique.metadata.passed = 0;
    this.technique.metadata.warning = 0;
    this.technique.metadata.failed = 0;
    this.technique.metadata.inapplicable = 0;
    this.technique.results = new Array<HTMLTechniqueResult>();
  }

  private outcomeTechnique(): void {
    if (this.technique.metadata.failed > 0) {
      this.technique.metadata.outcome = 'failed';
    } else if (this.technique.metadata.warning > 0) {
      this.technique.metadata.outcome = 'warning';
    } else if (this.technique.metadata.passed > 0) {
      this.technique.metadata.outcome = 'passed';
    } else {
      this.technique.metadata.outcome = 'inapplicable';
    }

    if (this.technique.results.length > 0) {
      this.addDescription();
    }
  }

  private addDescription(): void {
    for (const result of this.technique.results || []) {
      if (result.verdict === this.technique.metadata.outcome) {
        this.technique.metadata.description = <string> result.description;
        break;
      }
    }
  }
}

export = Technique;