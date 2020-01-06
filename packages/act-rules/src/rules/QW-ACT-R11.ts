'use strict';
import {ElementHandle, Page} from 'puppeteer';
import Rule from './Rule.object';
import { ACTRule, ACTRuleResult } from '@qualweb/act-rules';
import {trim} from 'lodash';
import { DomUtils,AccessibilityTreeUtils } from '@qualweb/util';

const rule: ACTRule = {
  name: 'Button has accessible name',
  code: 'QW-ACT-R11',
  mapping: '97a4e1',
  description: 'This rule checks that each button element has an accessible name.',
  metadata: {
    target: {
      element:  ['button', 'input', 'summary'],
      attributes: ['role="button"']
    },
    'success-criteria': [{
      name: '4.1.2',
      level: 'A',
      principle: 'Robust',
      url: 'https://www.w3.org/WAI/WCAG21/Understanding/name-role-value'
    }],
    related: [],
    url: 'https://act-rules.github.io/rules/97a4e1',
    passed: 0,
    inapplicable: 0,
    warning: 0,
    failed: 0,
    type: ['ACTRule', 'TestCase'],
    a11yReq: ['WCAG21:title'],
    outcome: '',
    description: ''
  },
  results: new Array<ACTRuleResult>()
};

class QW_ACT_R11 extends Rule {

  constructor() {
    super(rule);
  }

  async execute(element: ElementHandle | undefined, page:Page): Promise<void> {
    const evaluation: ACTRuleResult = {
      verdict: '',
      description: '',
      resultCode: ''
    };

    if(element === undefined){
      evaluation.verdict = 'inapplicable';
      evaluation.description = 'There are no elements with the semantic role of button.';
      evaluation.resultCode = 'RC1';
    } else {
      let isHidden = await DomUtils.isElementHidden(element);
      let accessName = await AccessibilityTreeUtils.getAccessibleName(element, page);
      let role = await DomUtils.getElementAttribute(element,"role");
      if(isHidden){
        evaluation.verdict = 'inapplicable';
        evaluation.description = 'This element is not included in the accessibility tree.';
        evaluation.resultCode = 'RC2';
      } else if (role!==null && role !== 'button'){
        evaluation.verdict = 'inapplicable';
        evaluation.description = `This button's role is overriden.`;
        evaluation.resultCode = 'RC3';
      } else if(accessName === undefined || trim(accessName) === '') {
        evaluation.verdict = 'failed';
        evaluation.description = `This element doesn't have an accessible name.`;
        evaluation.resultCode = 'RC4';
      } else {
        evaluation.verdict = 'passed';
        evaluation.description = `This element has a valid accessible name.`;
        evaluation.resultCode = 'RC5';
      }
    }

    if (element !== undefined) {
      evaluation.htmlCode = await DomUtils.getElementHtmlCode(element);
      evaluation.pointer = await DomUtils.getElementSelector(element);
    }
    super.addEvaluationResult(evaluation);
  }
}

export = QW_ACT_R11;
