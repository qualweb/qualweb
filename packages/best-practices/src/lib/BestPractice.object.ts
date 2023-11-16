import { BestPractice as BestPracticeType } from '@qualweb/best-practices';
import { Translate, TranslationValues } from '@qualweb/locale';
import Test from './Test.object';

abstract class BestPractice {
  private readonly bestPractice: BestPracticeType;
  private readonly locale: Translate;

  constructor(bestPractice: BestPracticeType, locale: Translate) {
    this.bestPractice = bestPractice;
    this.locale = locale;
  }

  public abstract execute(element: typeof window.qwElement | undefined): void;

  public getFinalResults(): BestPracticeType {
    this.outcomeBestPractice();
    return this.bestPractice;
  }

  protected getNumberOfWarningResults(): number {
    return this.bestPractice.metadata.warning;
  }


  protected addTestResult(test: Test): void {
    if (!test.description || (<string>test.description).trim() === '') {
      test.description = this.getTranslation(<string>test.resultCode);
    }

    this.bestPractice.results.push(test);

    if (test.verdict !== 'inapplicable') {
      this.bestPractice.metadata[test.verdict]++;
    }
  }

  protected getTranslation(resultCode: string, values?: TranslationValues): string {
    let translation = '';
    if (this.locale.translate['best-practices']?.[this.bestPractice.code]?.results?.[resultCode]) {
      translation = <string>this.locale.translate['best-practices'][this.bestPractice.code].results?.[resultCode];
    } else {
      translation = <string>this.locale.fallback['best-practices']?.[this.bestPractice.code].results?.[resultCode];
    }

    if (values) {
      for (const key of Object.keys(values) || []) {
        translation = translation.replace(new RegExp(`{${key}}`, 'g'), values[key].toString());
      }
    }

    return translation;
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
