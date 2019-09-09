'use strict';

import { DomElement } from 'htmlparser2';
import _ from 'lodash';
import Rule from './Rule.object';

import { ACTRule, ACTRuleResult } from '@qualweb/act-rules';

import {
  getElementSelector,
  transform_element_into_html
} from '../util';

import languages from './language.json';

const rule: ACTRule = {
  name: 'HTML lang and xml:lang match',
  code: 'QW-ACT-R3',
  mapping: '5b7ae0',
  description: 'The rule checks that for the html element, there is no mismatch between the primary language in non-empty lang and xml:lang attributes, if both are used.',
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
    url: 'https://act-rules.github.io/rules/5b7ae0',
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

class QW_ACT_R3 extends Rule {

  constructor() {
    super(rule);
  }

  async execute(element: DomElement | undefined): Promise<void> {
    const evaluation: ACTRuleResult = {
      verdict: '',
      description: '',
      resultCode: ''
    };

    //let url = rule.metadata['url'];
    //evaluation['test'] = url;

    if (element === undefined) { // if the element doesn't exist, there's nothing to test
      evaluation.verdict = 'inapplicable';
      evaluation.description = `html element doesn't exist`;
      evaluation.resultCode = 'RC1';
    } else if (element.parent !== null) {
      evaluation.verdict = 'inapplicable';
      evaluation.description = 'html element is not the root element of the page';
      evaluation.resultCode = 'RC2';
    } else if (element.attribs === undefined) {
      evaluation.verdict = 'inapplicable';
      evaluation.description = `html element doesn't have attributes`;
      evaluation.resultCode = 'RC3';
    } else if (element.attribs['lang'] === undefined || element.attribs['xml:lang'] === undefined) {
      evaluation.verdict = 'inapplicable';
      evaluation.description = `lang or xml:lang attribute doesn't exist in html element`;
      evaluation.resultCode = 'RC4';
    } else if (element.attribs['lang'] === '' || element.attribs['xml:lang'] === '') {
      evaluation.verdict = 'inapplicable';
      evaluation.description = 'lang or xml:lang attribute is empty in html element';
      evaluation.resultCode = 'RC5';
    }

    if (element && element.attribs && element.attribs['lang'] && element.attribs['xml:lang']) {
      let lang = element.attribs['lang'].split('-')[0];
      let xmllang = element.attribs['xml:lang'].split('-')[0];

      let validLang = this.isSubTagValid(lang.toLowerCase());
      let validXMLLang = this.isSubTagValid(xmllang.toLowerCase());

      if (!validLang || !validXMLLang) {
        evaluation.verdict = 'inapplicable';
        evaluation.description = 'lang or xml:lang element is not valid';
        evaluation.resultCode = 'RC6';
      }
      // from now on, we know that both tags are valid
      else if (lang === xmllang) {
        evaluation.verdict = 'passed';
        evaluation.description = 'lang and xml:lang attributes have the same value';
        evaluation.resultCode = 'RC7';
      } else if (lang.toLowerCase() === xmllang.toLowerCase()) {
        evaluation.verdict = 'passed';
        evaluation.description = 'lang and xml:lang attributes have the same value';
        evaluation.resultCode = 'RC7';
      } else {
        // if lang and xml:lang are different
        evaluation.verdict = 'failed';
        evaluation.description = 'lang and xml:lang attributes do not have the same value';
        evaluation.resultCode = 'RC8';
      }
    }

    if (element !== undefined) {
      evaluation.code = transform_element_into_html(element);
      evaluation.pointer = getElementSelector(element);
    }
    
    super.addEvaluationResult(evaluation);
  }

  private isSubTagValid(subTag: string) {
    return languages.hasOwnProperty(subTag);
  }
}

export = QW_ACT_R3;