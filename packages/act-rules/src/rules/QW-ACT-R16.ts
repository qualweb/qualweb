'use strict';

import {ACTRule, ACTRuleResult} from '@qualweb/act-rules';

import Rule from './Rule.object';
import {DomElement} from "domhandler";
import {getElementSelector, transform_element_into_html} from "../util";
import {trim} from 'lodash';
import {DomUtils, AccessibilityTreeUtils} from '@qualweb/util';

const rule: ACTRule = {
  name: 'Form control has accessible name',
  code: 'QW-ACT-R16',
  mapping: 'e086e5',
  description: 'Form control has accessible name',
  metadata: {
    target: {
      element: ['input', 'select', 'textarea', '*[role]'],
    },
    'success-criteria': [
      {
        name: '3.3.2',
        level: 'A',
        principle: 'Understandable',
        url: 'https://www.w3.org/WAI/WCAG21/Understanding/labels-or-instructions'
      },
      {
        name: '4.1.2',
        level: 'A',
        principle: 'Robust',
        url: 'https://www.w3.org/WAI/WCAG21/Understanding/name-role-value'
      }
    ],
    related: [],
    url: 'https://act-rules.github.io/rules/e086e5',
    passed: 0,
    warning: 0,
    inapplicable: 0,
    failed: 0,
    type: ['ACTRule', 'TestCase'],
    a11yReq: ['WCAG21:language'],
    outcome: '',
    description: ''
  },
  results: new Array<ACTRuleResult>()
};

class QW_ACT_R16 extends Rule {

  constructor() {
    super(rule);
  }

  async execute(element: DomElement | undefined, processedHTML: DomElement[]): Promise<void> {
    const evaluation: ACTRuleResult = {
      verdict: '',
      description: '',
      resultCode: ''
    };

    let semanticRoles = ['checkbox', 'combobox', 'listbox', 'menuitemcheckbox', 'menuitemradio', 'radio', 'searchbox', 'slider', 'spinbutton', 'switch', 'textbox'];
    let accessibleName;

    if (element === undefined) {
      // if the element doesn't exist, there's nothing to test
    } else {
      if ((element.attribs && !element.attribs["role"]) || (element.attribs && element.attribs["role"] && semanticRoles.includes(trim(element.attribs["role"])))) {
        if (!DomUtils.isElementHidden(element)) {
          accessibleName = AccessibilityTreeUtils.getAccessibleName(element, processedHTML);
          if (accessibleName !== undefined && trim(accessibleName) !== '') {
            evaluation.verdict = 'passed';
            evaluation.description = `This form field element has an not-empty accessible name`;
            evaluation.resultCode = 'RC1';
          } else {
            evaluation.verdict = 'failed';
            evaluation.description = `This form field element has an empty or undefined accessible name`;
            evaluation.resultCode = 'RC2';
          }
        } else {
          evaluation.verdict = 'inapplicable';
          evaluation.description = `This form field element has an not-empty accessible name but is hidden`;
          evaluation.resultCode = 'RC3';
        }
      } else {
        evaluation.verdict = 'inapplicable';
        evaluation.description = `Role has explicitly been set to something that isn't a form field`;
        evaluation.resultCode = 'RC4';
      }
    }

    if (element !== undefined) {
      evaluation.code = transform_element_into_html(element);
      evaluation.pointer = getElementSelector(element);
    }

    super.addEvaluationResult(evaluation);
  }
}

export = QW_ACT_R16;
