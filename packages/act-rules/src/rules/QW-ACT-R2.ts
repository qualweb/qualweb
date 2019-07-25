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

import { ACTRule, ACTResult } from '@qualweb/act-rules';

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
      principle: 'Understandable'
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
  results: new Array<ACTResult>()
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

/**
 * ver tag html
 * parent
 *
 * Evaluates the technique to the given element
 * @param  {object} elem
 */
async function execute(element: DomElement | undefined, processedHTML: DomElement[]): Promise<void> {
  const evaluation: ACTResult = {
    verdict: '',
    description: ''
  };

  if (element === undefined) { // if the element doesn't exist, there's nothing to test
    evaluation.verdict = 'inapplicable';
    evaluation.description = `There is no <html> element`;
    rule.metadata.inapplicable++;

  } else if (element.parent !== null) {
    evaluation.verdict = 'inapplicable';
    evaluation.description = `The <html> element is not the root element of the page`;
    rule.metadata.inapplicable++;
  } else if (element.attribs && element.attribs['xml:lang'] !== '' && element.attribs['xml:lang'] !== undefined) { // passed
    evaluation.verdict = 'passed';
    evaluation.description = `The xml:lang attribute has a value`;
    rule.metadata.passed++;
  } else if (element.attribs && element.attribs['lang'] !== '' && element.attribs['lang'] !== undefined) { // passed
    evaluation.verdict = 'passed';
    evaluation.description = `The lang attribute has a value `;
    rule.metadata.passed++;
  } else if ((element.attribs && element.attribs['lang'] === undefined) || (element.attribs && element.attribs['xml:lang'] === undefined)) { // failed
    evaluation.verdict = 'failed';
    evaluation.description = `The lang and xml:lang attributes are empty or undefined`;
    rule.metadata.failed++;
  } else if ((element.attribs && element.attribs['lang'] === '') || (element.attribs && element.attribs['xml:lang'] === '')) { // failed
    evaluation.verdict = 'failed';
    evaluation.description = `The lang and xml:lang attributes are empty or undefined`;
    rule.metadata.failed++;
  }

  if (element !== undefined) {
    evaluation['code'] = transform_element_into_html(element);
    evaluation['pointer'] = getElementSelector(element);
  }

  rule.results.push(_.clone(evaluation));
};

function getFinalResults() {
  outcomeRule();
  return _.cloneDeep(rule);
}

function reset(): void {
  rule.metadata.passed = 0;
  rule.metadata.failed = 0;
  rule.metadata.inapplicable = 0;
  rule.results = new Array<ACTResult>();
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

export {
  getRuleMapping,
  hasPrincipleAndLevels,
  execute,
  getFinalResults,
  reset
};