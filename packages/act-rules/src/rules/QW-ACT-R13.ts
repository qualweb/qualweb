'use strict';

import { ElementHandle } from 'puppeteer';
import { ACTRuleResult } from '@qualweb/act-rules';
import { DomUtils } from '@qualweb/util';
import Rule from '../lib/Rule.object';
import { ACTRule, ElementExists } from '../lib/decorator';

@ACTRule
class QW_ACT_R13 extends Rule {

  constructor(rule?: any) {
    super(rule);
  }

  @ElementExists
  async execute(element: ElementHandle): Promise<void> {
    
    const evaluation: ACTRuleResult = {
      verdict: '',
      description: '',
      resultCode: ''
    };

    const children = await DomUtils.getElementChildren(element);
    if (children && children.length > 0) {
      const focusable = await this.isFocusableChildren(element);
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
      const focusable = await this.isFocusableContent(element);
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

    await super.addEvaluationResult(evaluation, element);
  }

  private async isFocusableChildren(element: ElementHandle): Promise<boolean> {
    let result = await this.isFocusableContent(element);
    const children = await DomUtils.getElementChildren(element);
    for (const child of children || []) {
      const focusable = await this.isFocusableContent(child);
      if (focusable) {
        result = true;
      } else {
        const childFocusable = await this.isFocusableChildren(child);
        result = result || childFocusable;
      }
    }
    return result;
  }

  private async isFocusableContent(element: ElementHandle): Promise<boolean> {
    const disabled = (await DomUtils.getElementAttribute(element, 'disabled')) !== null;
    const hidden = await DomUtils.isElementHiddenByCSS(element);
    const focusableByDefault = await DomUtils.isElementFocusableByDefault(element);
    const tabIndexExists = (await DomUtils.getElementAttribute(element, 'tabIndex')) !== null;
    const tabindex = await DomUtils.getElementAttribute(element, 'tabIndex');

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
