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
  name: 'Validity of HTML Lang attribute',
  code: 'QW-ACT-R5',
  mapping: 'bf051a',
  description: 'This rule checks the lang or xml:lang attribute has a valid language subtag.',
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
    url: 'https://act-rules.github.io/rules/bf051a',
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

class QW_ACT_R5 extends Rule {

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
    } else {
      let isLangNotEmpty = element.attribs['lang'] !== undefined && element.attribs['lang'] !== '';
      let isXMLLangNotEmpty = element.attribs['xml:lang'] !== undefined && element.attribs['xml:lang'].trim() !== '';

      if (isLangNotEmpty && isXMLLangNotEmpty) { // passed
        if (this.checkValidity(element.attribs['lang']) || this.checkValidity(element.attribs['xml:lang'])) {
          evaluation.verdict = 'passed';
          evaluation.description = `The lang and xml:lang attributes have a valid value `;
          evaluation.resultCode = 'RC4';
        } else {
          evaluation.verdict = 'failed';
          evaluation.description = 'lang or xml:lang not valid';
          evaluation.resultCode = 'RC5';
        }
      } else if (isLangNotEmpty) { // passed
        if (this.checkValidity(element.attribs['lang'])) {
          evaluation.verdict = 'passed';
          evaluation.description = `The lang attribute has a valid value `;
          evaluation.resultCode = 'RC6';
        } else {
          evaluation.verdict = 'failed';
          evaluation.description = 'lang or xml:lang not valid';
          evaluation.resultCode = 'RC5';
        }
      } else if (isXMLLangNotEmpty && element && element.attribs) { // passed
        if (this.checkValidity(element.attribs['xml:lang'])) {
          evaluation.verdict = 'passed';
          evaluation.description = `The xml:lang attribute has a valid value`;
          evaluation.resultCode = 'RC7';
        } else {
          evaluation.verdict = 'failed';
          evaluation.description = 'lang or xml:lang not valid';
          evaluation.resultCode = 'RC5';
        }
      } else {
        evaluation.verdict = 'inapplicable';
        evaluation.description = `lang and xml:lang element are empty or don't exist`;
        evaluation.resultCode = 'RC8';
      }
    }

    if (element !== undefined) {
      evaluation.code = transform_element_into_html(element);
      evaluation.pointer = getElementSelector(element);
    }

    super.addEvaluationResult(evaluation);
  }

  private checkValidity(element: string): boolean {
    const split = element.split('-');
    const lang = split[0].toLocaleLowerCase();

    return this.isSubTagValid(lang) && split.length < 3;
  }

  private isSubTagValid(subTag: string): boolean {
    return languages.hasOwnProperty(subTag);
  }
}

export = QW_ACT_R5;