'use strict';

import { ACTRule, ACTRuleResult } from '@qualweb/act-rules';
import { DomElement } from 'htmlparser2';
import { DomUtils as DomUtil } from '@qualweb/util';
import Rule from './Rule.object';
import {
  getElementSelector,
  transform_element_into_html
} from '../util';
import languages from './language.json';
import {trim} from 'lodash';

const rule: ACTRule = {
  name: 'Element within body has valid lang attribute',
  code: 'QW-ACT-R22',
  mapping: 'de46e4',
  description: 'This rule checks that the lang attribute of an element in the page body has a valid primary language subtag.',
  metadata: {
    target: {
      element: '[lang]'
    },
    'success-criteria': [
      {
        name: '3.1.2',
        level: 'AA',
        principle: 'Understandable ',
        url: 'https://www.w3.org/WAI/WCAG21/Understanding/language-of-parts'
      }
    ],
    related: [],
    url: 'https://act-rules.github.io/rules/de46e4',
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

  async execute(element: DomElement | undefined, processedHTML: DomElement[], url: string): Promise<void> {


    const evaluation: ACTRuleResult = {
      verdict: '',
      description: '',
      resultCode: ''
    };

    if (element === undefined) {
      evaluation.verdict = 'inapplicable';
      evaluation.description = "No elements with lang";
      evaluation.resultCode = 'RC1';
    } else {
      console.log(element.type);
      let lang = DomUtil.getElementAttribute(element, "lang").split("-");
      console.log(lang);
      let subtag = lang[0];
      console.log(subtag);

      if (trim(subtag)==="") {
        evaluation.verdict = 'inapplicable';
        evaluation.description = "Lang is empty";
        evaluation.resultCode = 'RC2';
      }
      else if (this.isSubTagValid(subtag)&&lang.length<=2) {
        evaluation.verdict = 'passed';
        evaluation.description = "This element has a valid lang attribute";
        evaluation.resultCode = 'RC3';
      }
      else {
        evaluation.verdict = 'failed';
        evaluation.description = "This element has an invalid lang attribute";
        evaluation.resultCode = 'RC4';
      }
    }

    if (element) {
      evaluation.code = transform_element_into_html(element);
      evaluation.pointer = getElementSelector(element);
    }
    super.addEvaluationResult(evaluation);
  }

  private isSubTagValid(subTag: string) {
    return languages.hasOwnProperty(subTag);
  }
}

export = QW_ACT_R18;
