'use strict';

import { DomElement } from 'htmlparser2';
import _ from 'lodash';

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

function getRuleMapping(): string {
  return rule.mapping;
}

function hasPrincipleAndLevels(principles: string[], levels: string[]): boolean {
  let has = false;
  for (let sc of rule.metadata['success-criteria'] || []) {
    if (principles.includes(sc.principle) && levels.includes(sc.level)) {
      has = true;
    }
  }
  return has;
}

async function execute(element: DomElement | undefined): Promise<void> {
  const evaluation: ACTRuleResult = {
    verdict: '',
    description: '',
    resultCode: ''
  };

  let url = rule.metadata['url'];
  evaluation['test'] = url;


  if (element === undefined) { // if the element doesn't exist, there's nothing to test
    evaluation.verdict = 'inapplicable';
    evaluation.description = `html element doesn't exist`;
    evaluation.resultCode = 'RC1';
    rule.metadata.inapplicable++;
  } else if (element.parent !== null) {
    evaluation.verdict = 'inapplicable';
    evaluation.description = 'html element is not the root element of the page';
    evaluation.resultCode = 'RC2';
    rule.metadata.inapplicable++;
  } else if (element.attribs === undefined) {
    evaluation.verdict = 'inapplicable';
    evaluation.description = `html element doesn't have attributes`;
    evaluation.resultCode = 'RC3';
    rule.metadata.inapplicable++;
  } else {
    let isLangNotEmpty = element.attribs['lang'] !== undefined && element.attribs['lang'] !== '';
    let isXMLLangNotEmpty = element.attribs['xml:lang'] !== undefined && element.attribs['xml:lang'] !== '';

    if (isLangNotEmpty && isXMLLangNotEmpty) { // passed
      if (checkValidity(element.attribs['lang']) && checkValidity(element.attribs['xml:lang'])) {
        evaluation.verdict = 'passed';
        evaluation.description = `The lang and xml:lang attributes have a valid value `;
        evaluation.resultCode = 'RC4';
        rule.metadata.passed = 1;
      } else {
        evaluation.verdict = 'failed';
        evaluation.description = 'lang or xml:lang not valid';
        evaluation.resultCode = 'RC5';
        rule.metadata.failed++;
      }
    } else if (isLangNotEmpty) { // passed
      if (checkValidity(element.attribs['lang'])) {
        evaluation.verdict = 'passed';
        evaluation.description = `The lang attribute has a valid value `;
        evaluation.resultCode = 'RC6';
        rule.metadata.passed = 1;
      } else {
        evaluation.verdict = 'failed';
        evaluation.description = 'lang or xml:lang not valid';
        evaluation.resultCode = 'RC5';
        rule.metadata.failed++;
      }
    } else if (isXMLLangNotEmpty && element && element.attribs) { // passed
      if (checkValidity(element.attribs['xml:lang'])) {
        evaluation.verdict = 'passed';
        evaluation.description = `The xml:lang attribute has a valid value`;
        evaluation.resultCode = 'RC7';
        rule.metadata.passed = 1;
      } else {
        evaluation.verdict = 'failed';
        evaluation.description = 'lang or xml:lang not valid';
        evaluation.resultCode = 'RC5';
        rule.metadata.failed++;
      }
    } else {
      evaluation.verdict = 'inapplicable';
      evaluation.description = `lang and xml:lang element are empty or don't exist`;
      evaluation.resultCode = 'RC8';
      rule.metadata.inapplicable++;
    }
  }

  if (element !== undefined) {
    evaluation.code = transform_element_into_html(element);
    evaluation.pointer = getElementSelector(element);
  }

  rule.results.push(_.clone(evaluation));
}

function getFinalResults() {
  outcomeRule();
  return _.cloneDeep(rule);
}

function reset(): void {
  rule.metadata.passed = 0;
  rule.metadata.failed = 0;
  rule.metadata.inapplicable = 0;
  rule.results = new Array<ACTRuleResult>();
}

function outcomeRule(): void {
  if (rule.metadata.failed > 0) {
    rule.metadata.outcome = 'failed';
  } else if (rule.metadata.passed > 0) {
    rule.metadata.outcome = 'passed';
  } else {
    rule.metadata.outcome = 'inapplicable';
  }

  if (rule.results.length > 0) {
    addDescription();
  }
}

function addDescription(): void {
  for (const result of rule.results || []) {    
    if (result.verdict === rule.metadata.outcome) {
      rule.metadata.description = result.description;
      break;
    }
  }
}

function checkValidity(element: string) {
  const splitted = element.split('-');
  const lang = splitted[0].toLocaleLowerCase();

  return isSubTagValid(lang) && splitted.length < 3;
}

function isSubTagValid(subtag: string) {
  return languages.hasOwnProperty(subtag);
}

export {
  getRuleMapping,
  hasPrincipleAndLevels,
  execute,
  getFinalResults,
  reset
};