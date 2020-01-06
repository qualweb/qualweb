'use strict';

import { Page, ElementHandle } from 'puppeteer';
import Rule from './Rule.object';

import { ACTRule, ACTRuleResult } from '@qualweb/act-rules';

import { DomUtils } from '@qualweb/util';

const rule: ACTRule = {
  name: '`id` attribute value is unique',
  code: 'QW-ACT-R18',
  mapping: '3ea0c8',
  description: 'This rule checks that all id attribute values on a single page are unique.',
  metadata: {
    target: {
      element: '*'
    },
    'success-criteria': [
      {
        name: '4.1.1',
        level: 'A',
        principle: 'Robust',
        url: 'https://www.w3.org/WAI/WCAG21/Understanding/parsing.html'
      }
    ],
    related: [],
    url: 'https://act-rules.github.io/rules/3ea0c8',
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

class QW_ACT_R18 extends Rule {

  constructor() {
    super(rule);
  }

  async execute(element: ElementHandle | undefined, page: Page): Promise<void> {

    const evaluation: ACTRuleResult = {
      verdict: '',
      description: '',
      resultCode: ''
    };

    if (element === undefined) {
      evaluation.verdict = 'inapplicable';
      evaluation.description = 'No elements with id';
      evaluation.resultCode = 'RC1';
    } else {
      const id = await DomUtils.getElementAttribute(element, 'id');
      if (id && id.trim()) {
        const elementsWithSameId = await page.$$('#' + id.trim());
        const genId = RegExp('qw-generated-id-');
    
        if (elementsWithSameId.length > 1) {
          evaluation.verdict = 'failed';
          evaluation.description = 'Several elements have identical id';
          evaluation.resultCode = 'RC2';
        } else if (!genId.test(id) && id !== undefined && id !== '') {
          evaluation.verdict = 'passed';
          evaluation.description = 'This element has a unique id';
          evaluation.resultCode = 'RC3';
        } else {
          evaluation.verdict = 'inapplicable';
          evaluation.description = `Element doesn't have a non empty id`;
          evaluation.resultCode = 'RC4';
        }
      }
    }

    if (element) {
      evaluation.htmlCode = await DomUtils.getElementHtmlCode(element);
      evaluation.pointer = await DomUtils.getElementSelector(element);
    }

    super.addEvaluationResult(evaluation);
  }
}

export = QW_ACT_R18;
