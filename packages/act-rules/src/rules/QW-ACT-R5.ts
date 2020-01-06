'use strict';

import { ElementHandle } from 'puppeteer';
import Rule from './Rule.object';

import { ACTRule, ACTRuleResult } from '@qualweb/act-rules';

import { DomUtils } from '@qualweb/util';

import languages from './language.json';

const rule: ACTRule = {
  name: 'Validity of HTML Lang attribute',
  code: 'QW-ACT-R5',
  mapping: 'bf051a',
  description: 'This rule checks the lang or xml:lang attribute has a valid language subtag.',
  metadata: {
    target: {
      element: 'html',
      attributes: ['lang']
    },
    'success-criteria': [{
      name: '3.1.1',
      level: 'A',
      principle: 'Understandable',
      url: 'https://www.w3.org/WAI/WCAG21/Understanding/language-of-page'
    }],
    related: [],
    url: 'https://act-rules.github.io/rules/bf051a',
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

class QW_ACT_R5 extends Rule {

  constructor() {
    super(rule);
  }

  async execute(element: ElementHandle | undefined): Promise<void> {
    const evaluation: ACTRuleResult = {
      verdict: '',
      description: '',
      resultCode: ''
    };

    if (element === undefined) { // if the element doesn't exist, there's nothing to test
      evaluation.verdict = 'inapplicable';
      evaluation.description = `html element doesn't exist`;
      evaluation.resultCode = 'RC1';
    } else if ((await DomUtils.getElementParent(element)) !== null) {
      evaluation.verdict = 'inapplicable';
      evaluation.description = 'html element is not the root element of the page';
      evaluation.resultCode = 'RC2';
    } else {
      const lang = await DomUtils.getElementAttribute(element, 'lang');

      if (lang !== null && lang.trim() !== '') { // passed
        if (this.checkValidity(lang)) {
          evaluation.verdict = 'passed';
          evaluation.description = `The lang attribute has a valid value `;
          evaluation.resultCode = 'RC3';
        } else {
          evaluation.verdict = 'failed';
          evaluation.description = 'The lang attribute is not valid';
          evaluation.resultCode = 'RC4';
        }
      } else {
        evaluation.verdict = 'inapplicable';
        evaluation.description = `The lang attribute is empty or doesn't exist`;
        evaluation.resultCode = 'RC5';
      }
    }

    if (element !== undefined) {
      evaluation.htmlCode = await DomUtils.getElementHtmlCode(element);
      evaluation.pointer = await DomUtils.getElementSelector(element);
    }

    super.addEvaluationResult(evaluation);
  }

  private checkValidity(lang: string): boolean {
    const subLangs = lang.split('-');
    
    if (subLangs.length > 2) {
      return false;
    }

    return this.isSubTagValid(subLangs[0]);
  }

  private isSubTagValid(subTag: string): boolean {
    return languages.hasOwnProperty(subTag);
  }
}

export = QW_ACT_R5;