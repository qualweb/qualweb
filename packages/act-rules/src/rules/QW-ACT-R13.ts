'use strict';

import { ACTRuleResult } from '@qualweb/act-rules';
import {  AccessibilityUtils } from '@qualweb/util';
import Rule from '../lib/Rule.object';
import { ACTRuleDecorator, ElementExists } from '../lib/decorator';
import {QWElement} from "@qualweb/qw-element";
import { QWPage } from '@qualweb/qw-page';

@ACTRuleDecorator
class QW_ACT_R13 extends Rule {

  constructor(rule?: any) {
    super(rule);
  }

  @ElementExists
  execute(element: QWElement,page:QWPage): void {
    
    const evaluation: ACTRuleResult = {
      verdict: '',
      description: '',
      resultCode: ''
    };

    const children = element.getElementChildren();
    if (children && children.length > 0) {
      const focusable = this.isFocusableChildren(element,page);
      if (focusable) {
        evaluation.verdict = 'failed';
        evaluation.description = `The test target has focusable children.`;
        evaluation.resultCode = 'RC1';
      } else {
        evaluation.verdict = 'passed';
        evaluation.description = `The test target children are unfocusable.`;
        evaluation.resultCode = 'RC2';
      }
    } else {
      const focusable = AccessibilityUtils.isPartOfSequentialFocusNavigation(element,page);
      if (focusable) {
        evaluation.verdict = 'failed';
        evaluation.description = `Thie test target is focusable.`;
        evaluation.resultCode = 'RC3';
      } else {
        evaluation.verdict = 'passed';
        evaluation.description = `The test target is unfocusable.`;
        evaluation.resultCode = 'RC4';
      }
    }

    super.addEvaluationResult(evaluation, element);
  }

  private isFocusableChildren(element: QWElement,page:QWPage): boolean {
    let result = AccessibilityUtils.isPartOfSequentialFocusNavigation(element,page);
    const children = element.getElementChildren();
    for (const child of children || []) {
      const focusable = AccessibilityUtils.isPartOfSequentialFocusNavigation(child,page);
      if (focusable) {
        result = true;
      } else {
        const childFocusable = this.isFocusableChildren(child,page);
        result = result || childFocusable;
      }
    }
    return result;
  }


}

export = QW_ACT_R13;
