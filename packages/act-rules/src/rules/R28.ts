'use strict';

import { DomElement } from 'htmlparser2';
import _ from 'lodash';

import { ACTRule, ACTResult } from '@qualweb/act-rules';

import {
  getElementSelector,
  transform_element_into_html
} from '../util';

import languages from './language.json';

const rule: ACTRule = {
  'name': 'Validity of HTML Lang attribute',
  'code': 'R28',
  'description': 'This rule checks the lang or xml:lang attribute has a valid language subtag.',
  'metadata': {
    'target': {
      'element': 'html',
      'attributes': 'lang, xml:lang'
    },
    'success-criteria': [{
      'name': '3.1.1',
      'level': 'A',
      'principle': 'Understandable'
    }],
    'related': [],
    'url': 
    'https://auto-wcag.github.io/auto-wcag/rules/SC3-1-1-html-lang-valid.html',
    'passed': 0,
    'notApplicable': 0,
    'failed': 0,
    'type': ['ACTRule', 'TestCase'],
    'a11yReq': ['WCAG21:language'],
    'outcome': '',
    'description': ''
  },
  'results': new Array<ACTResult>()
};

function hasPrincipleAndLevels(principles: string[], levels: string[]): boolean {
  let has = false;
  for (let sc of rule.metadata['success-criteria'] || []) {
    if (principles.includes(sc.principle) && levels.includes(sc.level)) {
      has = true;
    }
  }
  return has;
}

async function execute(element: DomElement | undefined, processedHTML: DomElement[]): Promise<void> {
  const evaluation: ACTResult = {
    verdict: '',
    description: '',
    code: '',
    pointer: ''
  };

  let url = rule.metadata['url'];
  evaluation['test'] = url;


  if (element === undefined) { // if the element doesn't exist, there's nothing to test
    evaluation.verdict = 'notApplicable';
    evaluation.description = `html element doesn't exist`;
    rule.metadata.notApplicable++;
  } else if (element.parent !== null) {
    evaluation.verdict = 'notApplicable';
    evaluation.description = 'html element is not the root element of the page';
    rule.metadata.notApplicable++;
  } else if (element.attribs === undefined) {
    evaluation.verdict = 'notApplicable';
    evaluation.description = `html element doesn't have attributes`;
    rule.metadata.notApplicable++;
  } else {
    let isLangNotEmpty = element.attribs['lang'] !== undefined && element.attribs['lang'] !== '';
    let isXMLLangNotEmpty = element.attribs['xml:lang'] !== undefined && element.attribs['xml:lang'] !== '';

    if (isLangNotEmpty && isXMLLangNotEmpty) { // passed
      if (checkValidity(element.attribs['lang']) && checkValidity(element.attribs['xml:lang'])) {
        evaluation.verdict = 'passed';
        evaluation.description = `The lang and xml:lang attributes have a valid value `;
        rule.metadata.passed = 1;
      } else {
        evaluation.verdict = 'failed';
        evaluation.description = 'lang or xml:lang not valid';
        rule.metadata.failed++;
      }
    } else if (isLangNotEmpty) { // passed
      if (checkValidity(element.attribs['lang'])) {
        evaluation.verdict = 'passed';
        evaluation.description = `The lang attribute has a valid value `;
        rule.metadata.passed = 1;
      } else {
        evaluation.verdict = 'failed';
        evaluation.description = 'lang or xml:lang not valid';
        rule.metadata.failed++;
      }
    } else if (isXMLLangNotEmpty && element && element.attribs) { // passed
      if (checkValidity(element.attribs['xml:lang'])) {
        evaluation.verdict = 'passed';
        evaluation.description = `The xml:lang attribute has a valid value `;
        rule.metadata.passed = 1;
      } else {
        evaluation.verdict = 'failed';
        evaluation.description = 'lang or xml:lang not valid';
        rule.metadata.failed++;
      }
    } else {
      evaluation.verdict = 'notApplicable';
      evaluation.description = 'lang and xml:lang element are empty or don\'t exist';
      rule.metadata.notApplicable++;
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
  rule.metadata.notApplicable = 0;
  rule.results = new Array<ACTResult>();
}

function outcomeRule(): void {
  if (rule.metadata.failed > 0) {
    rule.metadata.outcome = 'failed';
  } else if (rule.metadata.passed > 0) {
    rule.metadata.outcome = 'passed';
  } else {
    rule.metadata.outcome = 'notApplicable';
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
  hasPrincipleAndLevels,
  execute,
  getFinalResults,
  reset
};