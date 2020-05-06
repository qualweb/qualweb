'use strict';

import { BestPractice as BestPracticeType, BestPracticeResult } from '@qualweb/best-practices';
import clone from 'lodash.clone';
import cloneDeep from 'lodash.clonedeep';
import { Page, ElementHandle } from 'puppeteer';
import { CSSStylesheet } from '@qualweb/core';
import { DomUtils } from '@qualweb/util';

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

  protected async addEvaluationResult(result: BestPracticeResult, element?: ElementHandle): Promise<void> {
    if (element) {
      const [htmlCode, pointer] = await Promise.all([
        DomUtils.getElementHtmlCode(element, true, true),
        DomUtils.getElementSelector(element)
      ]);
      result.htmlCode = htmlCode;
      result.pointer = pointer;
    }

    this.bestPractice.results.push(clone(result));

    if (result.verdict !== 'inapplicable') {
      this.bestPractice.metadata[result.verdict]++;
    }
  }

  public abstract async execute(element: ElementHandle | undefined, page: Page | undefined, styleSheets: CSSStylesheet[] | undefined): Promise<void>;

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