'use strict';

import { ElementHandle } from 'puppeteer';
import { ACTRuleResult } from '@qualweb/act-rules';
import { DomUtils } from '@qualweb/util';
import Rule from '../lib/Rule.object';
import { ACTRule, ElementExists } from '../lib/decorator';
import {QWElement} from "@qualweb/qw-element";

@ACTRule
class QW_ACT_R13 extends Rule {

  constructor(rule?: any) {
    super(rule);
  }

  @ElementExists
  execute(element: QWElement): void {
    
    const evaluation: ACTRuleResult = {
      verdict: '',
      description: '',
      resultCode: ''
    };

    const children = element.getElementChildren();
    if (children && children.length > 0) {
      const focusable = this.isFocusableChildren(element);
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
      const focusable = this.isFocusableContent(element);
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

  private isFocusableChildren(element: ElementHandle): boolean {
    let result = this.isFocusableContent(element);
    const children = element.getElementChildren();
    for (const child of children || []) {
      const focusable = this.isFocusableContent(child);
      if (focusable) {
        result = true;
      } else {
        const childFocusable = this.isFocusableChildren(child);
        result = result || childFocusable;
      }
    }
    return result;
  }

  private isFocusableContent(element: QWElement): boolean {
    const disabled = (element.getElementAttribute('disabled')) !== null;
    const hidden = DomUtils.isElementHiddenByCSS(element);
    const focusableByDefault = DomUtils.isElementFocusableByDefault(element);
    const tabIndexExists = (element.getElementAttribute('tabIndex')) !== null;
    const tabindex = element.getElementAttribute('tabIndex');

    let tabIndexLessThanZero = false;
    if (tabindex && !isNaN(parseInt(tabindex, 10))) {
      tabIndexLessThanZero = parseInt(tabindex, 10) < 0;
    }

    if (focusableByDefault) {
      return !(disabled || hidden || tabIndexLessThanZero);
    } else {
      return tabIndexExists ? !tabIndexLessThanZero : false;
    }
  }
}

export = QW_ACT_R13;
