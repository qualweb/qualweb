/**
 * Author: Bruno Andrade
 *
 * Description:
 *
 * Notes:
 *
 * Last modified: 21/10/2019
 */

'use strict';

import {DomElement} from 'htmlparser2';
import {DomUtils as DomUtil} from '@qualweb/util';
import {ACTRule, ACTRuleResult} from '@qualweb/act-rules';
import Rule from './Rule.object';

import {
  getElementSelector,
  transform_element_into_html
} from '../util';

/**
 * Technique information
 * @type {Object}
 */
const rule: ACTRule = {
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
    inapplicable: 0,
    failed: 0,
    type: ['ACTRule', 'TestCase'],
    a11yReq: ['WCAG21:language'],
    outcome: '',
    description: ''
  },
  results: new Array<ACTRuleResult>()
};

class QW_ACT_R13 extends Rule {

  constructor() {
    super(rule);
  }

  async execute(element: DomElement | undefined): Promise<void> {
    const evaluation: ACTRuleResult = {
      verdict: '',
      description: '',
      resultCode: ''
    };

    if (element !== undefined) {
      if (element.children && element.children.length > 0) {
        if (isFocusableChildren(element)) {
          evaluation.verdict = 'failed';
          evaluation.description = `This element has focusable children.`;
          evaluation.resultCode = 'RC1';
        } else {
          evaluation.verdict = 'passed';
          evaluation.description = `This element's children are unfocusable.`;
          evaluation.resultCode = 'RC2';
        }
      } else {
        if (isFocusableContent(element)) {
          evaluation.verdict = 'failed';
          evaluation.description = `This element is still focusable.`;
          evaluation.resultCode = 'RC3';
        } else {
          evaluation.verdict = 'passed';
          evaluation.description = `This element is unfocusable.`;
          evaluation.resultCode = 'RC4';
        }
      }
    }
    if (element !== undefined) {
      evaluation.code = transform_element_into_html(element);
      evaluation.pointer = getElementSelector(element);
    }

    super.addEvaluationResult(evaluation);
  }
}

function isFocusableChildren(element: DomElement): boolean {
  let result = isFocusableContent(element);
  if (element.children && element.children.length > 0) {
    for (let child of element.children) {
      if (isFocusableContent(child)) {
        result = true;
      } else {
        result = result || isFocusableChildren(child);
      }
    }
  }
  return result;
}

function isFocusableContent(element: DomElement): boolean {
  let disabled = false;
  let hidden = false;
  let focusableByDefault = false;
  let tabIndexLessThanZero = false;
  let tabIndexExists = false;

  if(element.attribs){
    tabIndexExists = element.attribs['tabindex'] !== undefined;
  }

  if (element.attribs) {
    disabled = element.attribs['disabled'] !== undefined;
    hidden = DomUtil.isElementHiddenByCSS(element);
    focusableByDefault = DomUtil.isElementFocusableByDefault(element);
    let tabindex = element.attribs['tabindex'];
    if (tabindex && !isNaN(parseInt(tabindex, 10))) {
      tabIndexLessThanZero = parseInt(tabindex, 10) < 0;
    }
  }
  if (focusableByDefault)
    return !(disabled || hidden || tabIndexLessThanZero);
  else
    return tabIndexExists ? !tabIndexLessThanZero : false;
}

export = QW_ACT_R13;
