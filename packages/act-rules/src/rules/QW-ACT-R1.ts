'use strict';

import { DomElement } from 'htmlparser2';
import _ from 'lodash';
import Rule from './Rule.object';

import { ACTRule, ACTRuleResult } from '@qualweb/act-rules';

import {
  getElementSelector,
  transform_element_into_html
} from '../util';

const rule: ACTRule = {
  name: 'HTML Page has a title',
  code: 'QW-ACT-R1',
  mapping: '2779a5',
  description: 'This rule checks that the HTML page has a title.',
  metadata: {
    target: {
      element: 'title'
    },
    'success-criteria': [{
      name: '2.4.2',
      level: 'A',
      principle: 'Operable',
      url: 'https://www.w3.org/WAI/WCAG21/Understanding/page-titled'
    }],
    related: [],
    url: 'https://act-rules.github.io/rules/2779a5',
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
    let rootElem: DomElement | undefined = undefined;

    //the first title element was already tested
    if (super.getNumberOfInapplicableResults() > 0 || super.getNumberOfPassedResults() > 0 || super.getNumberOfFailedResults() > 0) {
      return;
    }
    // the first title element was not tested yet
    else {
      //the root is not a html element
      for (const e of processedHTML || []) {
        if (e.name === 'html') {
          rootElem = _.clone(e);
          break;
        }
      }
      //the root element is a html element
      if (rootElem) {
        //the title element does not exit
        if (!element) {
          evaluation.verdict = 'failed';
          evaluation.description = `Title element doesn't exist`;
          evaluation.resultCode = 'RC1';
        }
        //the title element is empty
        else if (element.children && (element.children.length === 0 || element.children[0].data.trim() === '')) {
          evaluation.verdict = 'failed';
          evaluation.description = 'Title element is empty';
          evaluation.resultCode = 'RC2';
        }

        //the title element exists and it's not empty
        else {
          evaluation.verdict = 'passed';
          evaluation.description = `Title element exists and it's not empty`;
          evaluation.resultCode = 'RC3';
        }
      }
      //the root element is not a html element
      else {
        evaluation.verdict = 'inapplicable';
        evaluation.description = 'The root element is not a html element';
        evaluation.resultCode = 'RC4';
      }
    }

    if (rootElem && element) {
      evaluation.code = transform_element_into_html(element);
      evaluation.pointer = getElementSelector(element);
    }
    super.addEvaluationResult(evaluation);
  }
}

export = QW_ACT_R1;