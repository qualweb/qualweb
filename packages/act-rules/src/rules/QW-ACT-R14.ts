'use strict';

import {DomElement} from 'htmlparser2';
import _ from 'lodash';
import Rule from './Rule.object';

import {ACTRule, ACTRuleResult} from '@qualweb/act-rules';

import {
  getElementSelector,
  transform_element_into_html
} from '../util';

const rule: ACTRule = {
  name: 'meta viewport does not prevent zoom',
  code: 'QW-ACT-R14',
  mapping: 'b4f0c3',
  description: 'This rule checks that the meta element retains the user agent ability to zoom.',
  metadata: {
    target: {
      element: 'meta',
      attributes: 'name="viewport"'
    },
    'success-criteria': [{
      name: '1.4.4',
      level: 'AA',
      principle: 'Perceivable',
      url: 'https://www.w3.org/WAI/WCAG21/Understanding/resize-text'
    }],
    related: [],
    url: 'https://act-rules.github.io/rules/b4f0c3',
    passed: 0,
    warning: 0,
    failed: 0,
    inapplicable: 0,
    type: ['ACTRule', 'TestCase'],
    a11yReq: ['WCAG21:title'],
    outcome: '',
    description: ''
  },
  results: new Array<ACTRuleResult>()
};

class QW_ACT_R14 extends Rule {

  constructor() {
    super(rule);
  }

  async execute(element: DomElement | undefined, processedHTML: DomElement[]): Promise<void> {
    const evaluation: ACTRuleResult = {
      verdict: '',
      description: '',
      resultCode: ''
    };

    if (element) {
      if (element.attribs) {
        if (element.attribs["name"] && _.toLower(element.attribs["name"]) === 'viewport') {
          if (element.attribs["content"] !== undefined) {
            let value: string[];
            let maximumScale = '';
            let userScalable = '';
            let contentValues = _.split(element.attribs["content"], ",");
            if (contentValues[0].length > 0) {
              for (let valueItem of contentValues) {
                value = _.split(_.trim(valueItem), "=");
                if (value[0] === 'maximum-scale') {
                  maximumScale = value[1];
                } else if (value[0] === 'user-scalable') {
                  userScalable = value[1];
                }
              }
            }
            if (!maximumScale && !userScalable) {
              evaluation.verdict = 'passed';
              evaluation.description = `The meta name="viewport" element does not define the maximum-scale and user-scalable values.`;
              evaluation.resultCode = 'RC1';
            } else if (userScalable === 'no' || maximumScale == 'yes' || parseFloat(maximumScale) < 2) {
              evaluation.verdict = 'failed';
              evaluation.description = `The meta name="viewport" element abolishes the user agent ability to zoom with user-scalable=no or maximum-scale < 2.`;
              evaluation.resultCode = 'RC2';
            } else {
              evaluation.verdict = 'passed';
              evaluation.description = `The meta name="viewport" element retains the user agent ability to zoom.`;
              evaluation.resultCode = 'RC2';
            }
          } else {
            evaluation.verdict = 'inapplicable';
            evaluation.description = `The meta name="viewport" element does not have content attribute.`;
            evaluation.resultCode = 'RC2';
          }
        } else {
          evaluation.verdict = 'inapplicable';
          evaluation.description = `The meta name="viewport" element is not present within the page.`;
          evaluation.resultCode = 'RC2';
        }
      }
    }

    if (element) {
      evaluation.code = transform_element_into_html(element);
      evaluation.pointer = getElementSelector(element);
    }
    super.addEvaluationResult(evaluation);
  }
}

export = QW_ACT_R14;
