'use strict';

import { ACTRuleResult } from '@qualweb/act-rules';
import Rule from '../lib/Rule.object';
import { ACTRuleDecorator, ElementExists, ElementIsVisible } from '../lib/decorator';
import { QWElement } from '@qualweb/qw-element';
import { QWPage } from '@qualweb/qw-page';

@ACTRuleDecorator
class QW_ACT_R67 extends Rule {
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

    if (element.hasCSSProperty('letter-spacing')) {
      const styleAttribute = element.getElementAttribute('style');
      const declaredLetterSpacing = this.parseStyle(styleAttribute);
      const computedRawLetterSpacing = element.getCSSProperty('letter-spacing');
      const computedLetterSpacing = element.getElementStyleProperty('letter-spacing', null);
      const fontSize = element.getElementStyleProperty('font-size', null);

      if (!this.isImportant(computedRawLetterSpacing, element)) {
        evaluation.verdict = 'passed';
        evaluation.description = 'The computed letter-spacing property is not !important';
        evaluation.resultCode = 'RC1';
      } else if (this.isWide(computedLetterSpacing, fontSize)) {
        evaluation.verdict = 'passed';
        evaluation.description = 'The letter-spacing is at least 0.12 times the font-size.';
        evaluation.resultCode = 'RC2';
      } else if (!this.isCascade(declaredLetterSpacing, computedRawLetterSpacing)) {
        evaluation.verdict = 'passed';
        evaluation.description = 'The cascaded letter-spacing is not the declared value.';
        evaluation.resultCode = 'RC3';
      } else {
        evaluation.verdict = 'failed';
        evaluation.description = 'CSS styles prevent the letter-spacing to be above the minimum value.';
        evaluation.resultCode = 'RC4';
      }
      super.addEvaluationResult(evaluation, element, true, false, true, page);
    } else {
      evaluation.verdict = 'inapplicable';
      evaluation.description = 'The style attribute does not declare the letter-spacing property.';
      evaluation.resultCode = 'RC5';
      super.addEvaluationResult(evaluation, element, false, false);
    }
  }

  private parseStyle(style: string | null): string {
    if (style === null) {
      style = '';
    }
    const startLS = style.indexOf('letter-spacing:');
    let endLS = style.indexOf(';', startLS);
    if (endLS === -1) {
      endLS = style.length;
    }
    return style?.substring(startLS + 15, endLS);
  }

  private isImportant(cssValue: any, element: QWElement): boolean {
    if (cssValue.value === 'inherit' || cssValue.value === 'unset') {
      const parent = element.getElementParent();
      cssValue = parent?.getCSSProperty('letter-spacing');
    }
    return cssValue.important;
  }

  private isWide(letterSpacing: string, fontSize: string): boolean {
    const letter = parseFloat(letterSpacing.slice(0, -2)); //remove px from end of string
    const font = parseFloat(fontSize.slice(0, -2));
    return letter >= font * 0.12;
  }

  private isCascade(declaredStyle: string, computedStyle: any): boolean {
    return declaredStyle.includes(computedStyle.value);
  }
}

export = QW_ACT_R67;
