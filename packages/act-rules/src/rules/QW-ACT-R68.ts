'use strict';

import { ACTRuleResult } from '@qualweb/act-rules';
import Rule from '../lib/Rule.object';
import { ACTRuleDecorator, ElementExists, ElementIsVisible } from '../lib/decorator';
import { QWElement } from '@qualweb/qw-element';
import { QWPage } from '@qualweb/qw-page';

@ACTRuleDecorator
class QW_ACT_R68 extends Rule {
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

    if (element.hasCSSProperty('line-height')) {
      const styleAttribute = element.getElementAttribute('style');
      const declaredLineHeight = this.parseStyle(styleAttribute);
      const computedRawLineHeight = element.getCSSProperty('line-height');
      const computedLineHeight = element.getElementStyleProperty('line-height', null);
      const fontSize = element.getElementStyleProperty('font-size', null);

      if (!this.isImportant(computedRawLineHeight, element)) {
        evaluation.verdict = 'passed';
        evaluation.description = 'The line-height property is not !important';
        evaluation.resultCode = 'RC1';
      } else if (!this.isNormal(computedLineHeight, element) && this.isLarge(computedLineHeight, fontSize)) {
        evaluation.verdict = 'passed';
        evaluation.description = 'The line-height is at least 1.5 times the font-size.';
        evaluation.resultCode = 'RC2';
      } else if (!this.isCascade(declaredLineHeight, computedRawLineHeight)) {
        evaluation.verdict = 'passed';
        evaluation.description = 'The cascaded line-height is not the declared value.';
        evaluation.resultCode = 'RC3';
      } else {
        evaluation.verdict = 'failed';
        evaluation.description = 'CSS styles prevent the line-height to be above the minimum value.';
        evaluation.resultCode = 'RC4';
      }
      super.addEvaluationResult(evaluation, element, true, false, true, page);
    } else {
      evaluation.verdict = 'inapplicable';
      evaluation.description = 'The style attribute does not declare the line-height property.';
      evaluation.resultCode = 'RC5';
      super.addEvaluationResult(evaluation, element, false, false);
    }
  }

  private parseStyle(style: string | null): string {
    if (style === null) {
      style = '';
    }
    const startLS = style.indexOf('line-height:');
    let endLS = style.indexOf(';', startLS);
    if (endLS === -1) {
      endLS = style.length;
    }
    return style?.substring(startLS + 12, endLS);
  }

  private isImportant(cssValue: any, element: QWElement): boolean {
    if (cssValue.value === 'inherit' || cssValue.value === 'unset') {
      const parent = element.getElementParent();
      if (parent === null) return false;
      return this.isImportant(parent?.getCSSProperty('line-height'), parent);
    }
    return cssValue.important;
  }

  private isNormal(cssValue: any, element: QWElement): boolean {
    if (cssValue.value === 'inherit' || cssValue.value === 'unset') {
      const parent = element.getElementParent();
      if (parent === null) return false;
      return this.isImportant(parent?.getCSSProperty('line-height'), parent);
    }
    return cssValue.value === 'normal';
  }

  private isLarge(lineHeight: string, fontSize: string): boolean {
    const line = parseFloat(lineHeight.slice(0, -2)); //remove px from end of string
    const font = parseFloat(fontSize.slice(0, -2));
    return line >= font * 1.5;
  }

  private isCascade(declaredStyle: string, computedStyle: any): boolean {
    return declaredStyle.includes(computedStyle.value);
  }
}

export = QW_ACT_R68;
