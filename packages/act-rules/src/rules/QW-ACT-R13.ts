'use strict';

import { ElementHandle } from 'puppeteer';
import Rule from '../lib/Rule.object';
import { ACTRuleResult } from '@qualweb/act-rules';
import { DomUtils } from '@qualweb/util';

class QW_ACT_R13 extends Rule {

  constructor() {
    super({
      name: 'Element with `aria-hidden` has no focusable content',
      code: 'QW-ACT-R13',
      mapping: '6cfa84',
      description: 'This rule checks that elements with an aria-hidden attribute do not contain focusable elements.',
      metadata: {
        target: {
          element: '*',
          attributes: ['aria-hidden="true"']
        },
        'success-criteria': [{
          name: '1.3.1',
          level: 'A',
          principle: 'Perceivable',
          url: 'https://www.w3.org/WAI/WCAG21/Understanding/info-and-relationships'
        }, {
          name: '4.1.2',
          level: 'A',
          principle: 'Robust',
          url: 'https://www.w3.org/WAI/WCAG21/Understanding/name-role-value'
        }],
        related: [],
        url: 'https://act-rules.github.io/rules/6cfa84',
        passed: 0,
        warning: 0,
        failed: 0,
        type: ['ACTRule', 'TestCase'],
        a11yReq: ['WCAG21:language'],
        outcome: '',
        description: ''
      },
      results: new Array<ACTRuleResult>()
    });
  }

  async execute(element: ElementHandle | undefined): Promise<void> {

    if (!element) {
      return;
    }

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
