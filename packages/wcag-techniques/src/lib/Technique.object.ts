import { WCAGTechnique } from '@qualweb/wcag-techniques';
import { Level, Principle } from '@qualweb/evaluation';
import { Translate, TranslationValues } from '@qualweb/locale';
import Test from './Test.object';

abstract class Technique {
  private readonly technique: WCAGTechnique;
  protected readonly locale: Translate;

  constructor(technique: WCAGTechnique, locale: Translate) {
    this.technique = technique;
    this.locale = locale;
  }

  public getTechniqueMapping(): string {
    return this.technique.mapping;
  }

  public hasPrincipleAndLevels(principles: Array<Principle>, levels: Array<Level>): boolean {
    let has = false;
    for (const sc of this.technique.metadata['success-criteria'] ?? []) {
      if (principles.includes(sc.principle) && levels.includes(sc.level)) {
        has = true;
      }
    }
    return has;
  }

  public abstract execute(element: typeof window.qwElement | undefined): void;

  public getFinalResults(): WCAGTechnique {
    this.outcomeTechnique();
    return this.technique;
  }

  protected getNumberOfWarningResults(): number {
    return this.technique.metadata.warning;
  }

  protected getNumberOfFailedResults(): number {
    return this.technique.metadata.failed;
  }

  protected addTestResult(test: Test): void {
    if (!test.description || test.description.trim() === '') {
      test.description = this.getTranslation(test.resultCode);
    }

    this.technique.results.push(test);

    if (test.verdict && test.verdict !== 'inapplicable') {
      this.technique.metadata[test.verdict]++;
    }
  }

  protected getTranslation(resultCode: string, values?: TranslationValues): string {
    let translation = '';
    if (this.locale.translate['wcag-techniques']?.[this.technique.code]?.results?.[resultCode]) {
      translation = <string>this.locale.translate['wcag-techniques'][this.technique.code].results?.[resultCode];
    } else {
      translation = <string>this.locale.fallback['wcag-techniques']?.[this.technique.code].results?.[resultCode];
    }

    if (values) {
      for (const key of Object.keys(values) || []) {
        translation = translation.replace(new RegExp(`{${key}}`, 'g'), values[key].toString());
      }
    }

    return translation;
  }

  private outcomeTechnique(): void {
    if (this.technique.metadata.failed) {
      this.technique.metadata.outcome = 'failed';
    } else if (this.technique.metadata.warning) {
      this.technique.metadata.outcome = 'warning';
    } else if (this.technique.metadata.passed) {
      this.technique.metadata.outcome = 'passed';
    } else {
      this.technique.metadata.outcome = 'inapplicable';
      this.technique.metadata.inapplicable = 1;
    }

    if (this.technique.results.length > 0) {
      this.addDescription();
    }
  }

  private addDescription(): void {
    for (const result of this.technique.results ?? []) {
      if (result.verdict === this.technique.metadata.outcome) {
        this.technique.metadata.description = <string>result.description;
        break;
      }
    }
  }
}

export = Technique;
