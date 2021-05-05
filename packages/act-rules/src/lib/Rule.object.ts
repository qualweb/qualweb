import { ACTRule, TranslationValues } from '@qualweb/act-rules';
import { Translate } from '@qualweb/locale';
import { Level, Principle } from '@qualweb/evaluation';

import Test from './Test.object';

abstract class Rule {
  protected readonly rule: ACTRule;
  protected readonly locale: Translate;

  constructor(rule: ACTRule, locale: Translate) {
    this.rule = rule;
    this.locale = locale;
  }

  public getRuleMapping(): string {
    return this.rule.mapping;
  }

  public hasPrincipleAndLevels(principles: Array<Principle>, levels: Array<Level>): boolean {
    let has = false;
    for (const sc of this.rule.metadata['success-criteria'] ?? []) {
      if (principles.includes(sc.principle) && levels.includes(sc.level)) {
        has = true;
      }
    }
    return has;
  }

  public getFinalResults(): ACTRule {
    this.outcomeRule();
    return this.rule;
  }

  protected getNumberOfPassedResults(): number {
    return this.rule.metadata.passed;
  }

  protected getNumberOfWarningResults(): number {
    return this.rule.metadata.warning;
  }

  protected getNumberOfFailedResults(): number {
    return this.rule.metadata.failed;
  }

  protected addTestResult(test: Test): void {
    if (!test.description || test.description.trim() === '') {
      test.description = this.getTranslation(test.resultCode);
    }

    this.rule.results.push(test);

    if (test.verdict && test.verdict !== 'inapplicable') {
      this.rule.metadata[test.verdict]++;
    }
  }

  protected getTranslation(resultCode: string, values?: TranslationValues): string {
    let translation = '';
    if (this.locale.translate['act-rules']?.[this.rule.code]?.results?.[resultCode]) {
      translation = <string>this.locale.translate['act-rules'][this.rule.code].results?.[resultCode];
    } else {
      translation = <string>this.locale.fallback['act-rules']?.[this.rule.code].results?.[resultCode];
    }

    if (values) {
      for (const key of Object.keys(values) || []) {
        translation = translation.replace(new RegExp(`{${key}}`, 'g'), values[key].toString());
      }
    }

    return translation;
  }

  private outcomeRule(): void {
    if (this.rule.metadata.failed > 0) {
      this.rule.metadata.outcome = 'failed';
    } else if (this.rule.metadata.warning > 0) {
      this.rule.metadata.outcome = 'warning';
    } else if (this.rule.metadata.passed > 0) {
      this.rule.metadata.outcome = 'passed';
    } else {
      this.rule.metadata.outcome = 'inapplicable';
      this.rule.metadata.inapplicable = 1;
    }

    if (this.rule.results.length > 0) {
      this.addDescription();
    }
  }

  private addDescription(): void {
    for (const result of this.rule.results ?? []) {
      if (result.verdict === this.rule.metadata.outcome) {
        this.rule.metadata.description = result.description;
        break;
      }
    }
  }
}

export = Rule;
