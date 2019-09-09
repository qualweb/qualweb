/**
 * Author: António Estriga
 *
 * Description:
 *
 * Notes:
 *
 * Last modified: 12/11/2011
 */
'use strict';

import { DomElement } from 'htmlparser2';
import _ from 'lodash';

import { ACTRule, ACTRuleResult } from '@qualweb/act-rules';
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
  name: 'HTML has lang attribute',
  code: 'QW-ACT-R2',
  mapping: 'b5c3f8',
  description: 'This rule checks that the html element has a non-empty lang or xml:lang attribute.',
  metadata: {
    target: {
      element: 'html',
      attributes: ['lang', 'xml:lang']
    },
    'success-criteria': [{
      name: '3.1.1',
      level: 'A',
      principle: 'Understandable',
      url: 'https://www.w3.org/WAI/WCAG21/Understanding/language-of-page'
    }],
    related: [],
    url: 'https://act-rules.github.io/rules/b5c3f8',
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

class QW_ACT_R2 extends Rule {

  constructor() {
    super(rule);
  }

  async execute(element: DomElement | undefined): Promise<void> {
    const evaluation: ACTRuleResult = {
      verdict: '',
      description: '',
      resultCode: ''
    };

    if (element === undefined) { // if the element doesn't exist, there's nothing to test
      evaluation.verdict = 'inapplicable';
      evaluation.description = `There is no <html> element`;
      evaluation.resultCode = 'RC1';
    } else if (element.parent !== null) {
      evaluation.verdict = 'inapplicable';
      evaluation.description = `The <html> element is not the root element of the page`;
      evaluation.resultCode = 'RC2';
    } else if (element.attribs && element.attribs['xml:lang'] !== '' && element.attribs['xml:lang'] !== undefined) { // passed
      evaluation.verdict = 'passed';
      evaluation.description = `The xml:lang attribute has a value`;
      evaluation.resultCode = 'RC3';
    } else if (element.attribs && element.attribs['lang'] !== '' && element.attribs['lang'] !== undefined) { // passed
      evaluation.verdict = 'passed';
      evaluation.description = `The lang attribute has a value `;
      evaluation.resultCode = 'RC4';
    } else if ((element.attribs && element.attribs['lang'] === undefined) || (element.attribs && element.attribs['xml:lang'] === undefined)) { // failed
      evaluation.verdict = 'failed';
      evaluation.description = `The lang and xml:lang attributes are empty or undefined`;
      evaluation.resultCode = 'RC5';
    } else if ((element.attribs && element.attribs['lang'] === '') || (element.attribs && element.attribs['xml:lang'] === '')) { // failed
      evaluation.verdict = 'failed';
      evaluation.description = `The lang and xml:lang attributes are empty or undefined`;
      evaluation.resultCode = 'RC5';
    }
    
    if (element !== undefined) {
      evaluation.code = transform_element_into_html(element);
      evaluation.pointer = getElementSelector(element);
    }

    super.addEvaluationResult(evaluation);
  }
}

export = QW_ACT_R2;