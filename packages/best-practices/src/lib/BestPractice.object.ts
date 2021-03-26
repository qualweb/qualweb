import { BestPractice as BestPracticeType, BestPracticeResult } from '@qualweb/best-practices';
import cloneDeep from 'lodash.clonedeep';
import { QWPage } from '@qualweb/qw-page';
import { QWElement } from '@qualweb/qw-element';

abstract class BestPractice {
  private readonly bestPractice: BestPracticeType;

  constructor(bestPractice: BestPracticeType) {
    this.bestPractice = bestPractice;
  }

  public getBestPracticeMapping(): string | undefined {
    return this.bestPractice.mapping;
  }

  protected getNumberOfPassedResults(): number {
    return this.bestPractice.metadata.passed;
  }

  protected getNumberOfWarningResults(): number {
    return this.bestPractice.metadata.warning;
  }

  protected getNumberOfFailedResults(): number {
    return this.bestPractice.metadata.failed;
  }

  protected getNumberOfInapplicableResults(): number {
    return this.bestPractice.metadata.inapplicable;
  }

  protected addEvaluationResult(result: BestPracticeResult, element?: QWElement, withText = true, fullElement = false): void {
    if (element) {
      const htmlCode = element.getElementHtmlCode(withText, fullElement);
      const pointer = element.getElementSelector();

      result.elements = [{ htmlCode, pointer }];
    }

    this.bestPractice.results.push(cloneDeep(result));

    if (result.verdict !== 'inapplicable') {
      //@ts-ignore
      this.bestPractice.metadata[result.verdict]++;
    }
  }

  public abstract execute(element: QWElement | undefined, page: QWPage | undefined): void;

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
        this.bestPractice.metadata.description = <string>result.description;
        break;
      }
    }
  }
}

export = BestPractice;
