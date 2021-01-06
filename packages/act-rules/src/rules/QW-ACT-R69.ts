'use strict';

import { ACTRuleResult } from '@qualweb/act-rules';
import Rule from '../lib/Rule.object';
import { ACTRuleDecorator, ElementExists, ElementIsVisible } from '../lib/decorator';
import { QWElement } from '@qualweb/qw-element';
import { QWPage } from '@qualweb/qw-page';

@ACTRuleDecorator
class QW_ACT_R69 extends Rule {
  constructor(rule?: any) {
    super(rule);
  }

  @ElementExists
  @ElementIsVisible
  execute(element: QWElement, page: QWPage): void {
    const evaluation: ACTRuleResult = {
      verdict: '',
      description: '',
      resultCode: ''
    };

    if (element.hasCSSProperty('word-spacing')) {
      const styleAttribute = element.getElementAttribute('style');
      const declaredWordSpacing = this.parseStyle(styleAttribute);
      const computedRawWordSpacing = element.getCSSProperty('word-spacing');
      const computedWordSpacing = element.getElementStyleProperty('word-spacing', null);
      const fontSize = element.getElementStyleProperty('font-size', null);

      if (!this.isImportant(computedRawWordSpacing, element)) {
        evaluation.verdict = 'passed';
        evaluation.description = 'The word-spacing property is not !important';
        evaluation.resultCode = 'RC1';
      } else if (this.isWide(computedWordSpacing, fontSize)) {
        evaluation.verdict = 'passed';
        evaluation.description = 'The word-spacing is at least 1.5 times the font-size.';
        evaluation.resultCode = 'RC2';
      } else if (!this.isCascade(declaredWordSpacing, computedRawWordSpacing)) {
        evaluation.verdict = 'passed';
        evaluation.description = 'The cascaded word-spacing is not the declared value.';
        evaluation.resultCode = 'RC3';
      } else {
        evaluation.verdict = 'failed';
        evaluation.description = 'CSS styles prevent the word-spacing to be above the minimum value.';
        evaluation.resultCode = 'RC4';
      }
      super.addEvaluationResult(evaluation, element, true, false, true, page);
    } else {
      evaluation.verdict = 'inapplicable';
      evaluation.description = 'The style attribute does not declare the word-spacing property.';
      evaluation.resultCode = 'RC5';
      super.addEvaluationResult(evaluation, element, false, false);
    }
  }

  private parseStyle(style: string | null): string {
    if (style === null) {
      style = '';
    }
    const startLS = style.indexOf('word-spacing:');
    let endLS = style.indexOf(';', startLS);
    if (endLS === -1) {
      endLS = style.length;
    }
    return style?.substring(startLS + 13, endLS);
  }

  private isImportant(cssValue: any, element: QWElement): boolean {
    if (cssValue.value === 'inherit' || cssValue.value === 'unset') {
      const parent = element.getElementParent();
      if (parent === null) return false;
      return this.isImportant(parent?.getCSSProperty('word-spacing'), parent);
    }
    return cssValue.important;
  }

  private isWide(wordSpacing: string, fontSize: string): boolean {
    const spacing = parseFloat(wordSpacing.slice(0, -2)); //remove px from end of string
    const font = parseFloat(fontSize.slice(0, -2));
    return spacing >= font * 0.16;
  }

  private isCascade(declaredStyle: string, computedStyle: any): boolean {
    return declaredStyle.includes(computedStyle.value);
  }
}

export = QW_ACT_R69;
