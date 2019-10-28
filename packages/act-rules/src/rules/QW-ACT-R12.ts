'use strict';

import {trim} from 'lodash';
import Rule from './Rule.object';
import {DomElement} from 'htmlparser2';
import {ACTRule, ACTRuleResult} from '@qualweb/act-rules';
import {DomUtils as DomUtil, AccessibilityTreeUtils} from '@qualweb/util';

import {
  getElementSelector,
  transform_element_into_html
} from '../util';

const rule: ACTRule = {
  name: 'Link has accessible name',
  code: 'QW-ACT-R12',
  mapping: 'c487ae',
  description: 'This rule checks that each link has an accessible name.',
  metadata: {
    target: {
      element: ['a[href]', 'area[href]'],
      attributes: ['role="link"']
    },
    'success-criteria': [
      {
        name: '2.4.4',
        level: 'A',
        principle: 'Operable',
        url: 'https://www.w3.org/WAI/WCAG21/Understanding/link-purpose-in-context'
      },{
        name: '2.4.9',
        level: 'AAA',
        principle: 'Operable',
        url: 'https://www.w3.org/WAI/WCAG21/Understanding/link-purpose-link-only'
      },{
        name: '4.1.2',
        level: 'A',
        principle: 'Robust',
        url: 'https://www.w3.org/WAI/WCAG21/Understanding/name-role-value'
      }
    ],
    related: [],
    url: 'https://act-rules.github.io/rules/c487ae',
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

class QW_ACT_R12 extends Rule {

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
      evaluation.description = 'There are no elements with the semantic role of link.';
      evaluation.resultCode = 'RC1';
    } else {
      let isHidden = DomUtil.isElementHidden(element);
      let accessName = AccessibilityTreeUtils.getAccessibleName(element, processedHTML, false);
      if(isHidden){
        evaluation.verdict = 'inapplicable';
        evaluation.description = 'This element is not included in the accessibility tree.';
        evaluation.resultCode = 'RC2';
      } else if (element.name === 'a' && element.attribs
        && element.attribs["role"] && element.attribs["role"] !== 'link'){
        evaluation.verdict = 'inapplicable';
        evaluation.description = 'This element has its role overridden.';
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

export = QW_ACT_R12;
