import { ACTRule, ACTRuleResult } from '@qualweb/act-rules';
import { AccessibilityUtils } from '@qualweb/util';
import clone from 'lodash.clone';
import cloneDeep from 'lodash.clonedeep';
import { QWPage } from '@qualweb/qw-page';
import { QWElement } from '@qualweb/qw-element';

abstract class Rule {
  private rule: ACTRule;

  constructor(rule: ACTRule) {
    this.rule = rule;
  }

  getRuleMapping(): string {
    return this.rule.mapping;
  }

  hasPrincipleAndLevels(principles: string[], levels: string[]): boolean {
    let has = false;
    for (let sc of this.rule.metadata['success-criteria'] || []) {
      if (principles.includes(sc.principle) && levels.includes(sc.level)) {
        has = true;
      }
    }
    return has;
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

  protected addEvaluationResult(
    result: ACTRuleResult,
    element?: QWElement,
    withText: boolean = true,
    fullElement: boolean = false,
    aName?: boolean,
    page?: QWPage
  ): void {
    if (element) {
      const htmlCode = element.getElementHtmlCode(withText, fullElement);
      const pointer = element.getElementSelector();
      let accessibleName;
      if (aName && page) {
        accessibleName = AccessibilityUtils.getAccessibleName(element, page);
      }
      result.elements = [{ htmlCode, pointer, accessibleName }];
    }

    this.rule.results.push(clone(result));

    if (result.verdict && result.verdict !== 'inapplicable') {
      this.rule.metadata[result.verdict]++;
    }
  }

  protected addMultipleElementEvaluationResult(
    result: ACTRuleResult,
    elements?: QWElement[],
    withText: boolean = true,
    fullElement: boolean = false,
    aName?: boolean,
    page?: QWPage
  ): void {
    result.elements = [];
    if (elements) {
      for (let element of elements) {
        const htmlCode = element.getElementHtmlCode(withText, fullElement);
        const pointer = element.getElementSelector();
        let accessibleName;
        if (aName && page) {
          accessibleName = AccessibilityUtils.getAccessibleName(element, page);
        }
        result.elements.push({ htmlCode, pointer, accessibleName });
      }
    }

    this.rule.results.push(clone(result));

    if (result.verdict && result.verdict !== 'inapplicable') {
      this.rule.metadata[result.verdict]++;
    }
  }

  abstract execute(element: QWElement | undefined, page: QWPage): void;

  getFinalResults(): ACTRule {
    this.outcomeRule();
    return cloneDeep(this.rule);
  }

  reset(): void {
    this.rule.metadata.passed = 0;
    this.rule.metadata.warning = 0;
    this.rule.metadata.failed = 0;
    this.rule.results = new Array<ACTRuleResult>();
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
    }

    if (this.rule.results.length > 0 && this.rule.metadata.outcome !== 'inapplicable') {
      this.addDescription();
    } else {
      this.rule.metadata.description = 'No test targets found.';
    }
  }

  private addDescription(): void {
    for (const result of this.rule.results || []) {
      if (result.verdict === this.rule.metadata.outcome) {
        this.rule.metadata.description = result.description;
        break;
      }
    }
  }
}

export = Rule;
