'use strict';

import {DomElement} from 'htmlparser2';
import _ from 'lodash';
import Rule from './Rule.object';
import {DomUtils as DomUtil, AccessibilityTreeUtils} from '@qualweb/util';
import { ACTRule, ACTRuleResult } from '@qualweb/act-rules';
import {trim} from 'lodash';

import {
  getElementSelector,
  transform_element_into_html
} from '../util';

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
    failed: 0,
    type: ['ACTRule', 'TestCase'],
    a11yReq: ['WCAG21:title'],
    outcome: '',
    description: ''
  },
  results: new Array<ACTRuleResult>()
};

class QW_ACT_R1 extends Rule {

  constructor() {
    super(rule);
  }
  
  async execute(element: DomElement | undefined, processedHTML: DomElement[]): Promise<void> {
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
      let isHidden = DomUtil.isElementHidden(element);
      let accessName = AccessibilityTreeUtils.getAccessibleName(element, processedHTML, false);
      if(isHidden){
        evaluation.verdict = 'inapplicable';
        evaluation.description = 'This element is not included in the accessibility tree.';
        evaluation.resultCode = 'RC2';
      } else if (element.name === 'button' && element.attribs
        && element.attribs["role"] && element.attribs["role"] !== 'button'){
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

    if (element) {
      evaluation.code = transform_element_into_html(element);
      evaluation.pointer = getElementSelector(element);
    }
    super.addEvaluationResult(evaluation);
  }
}

export = QW_ACT_R1;
