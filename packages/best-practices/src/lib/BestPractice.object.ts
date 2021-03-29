import { BestPractice as BestPracticeType } from '@qualweb/best-practices';
import Test from './Test.object';

abstract class BestPractice {
  private readonly bestPractice: BestPracticeType;

  constructor(bestPractice: BestPracticeType) {
    this.bestPractice = bestPractice;
  }

  protected getNumberOfWarningResults(): number {
    return this.bestPractice.metadata.warning;
  }


  protected addTestResult(test: Test): void {
    this.bestPractice.results.push(test);

    if (test.verdict !== 'inapplicable') {
      this.bestPractice.metadata[test.verdict]++;
    }
  }

  public abstract execute(element: typeof window.qwElement | undefined): void;

  public getFinalResults(): BestPracticeType {
    this.outcomeBestPractice();
    return this.bestPractice;
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
      this.bestPractice.metadata.inapplicable = 1;
    }

    if (this.bestPractice.results.length > 0) {
      this.addDescription();
    }
  }

  private addDescription(): void {
    for (const result of this.bestPractice.results ?? []) {
      if (result.verdict === this.bestPractice.metadata.outcome) {
        this.bestPractice.metadata.description = <string>result.description;
        break;
      }
    }
  }
}

export = BestPractice;
