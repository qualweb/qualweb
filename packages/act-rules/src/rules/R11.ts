'use strict';

import { DomElement } from 'htmlparser2';
import _ from 'lodash';

import { ACTRule, ACTResult } from '@qualweb/act-rules';

import {
  getElementSelector,
  transform_element_into_html
} from '../util';

const rule: ACTRule = {
  'name': 'HTML Page has a title',
  'code': 'R11',
  'description': 'This rule checks that the HTML page has a title.',
  'metadata': {
    'target': {
      'element': 'title'
    },
    'success-criteria': [{
      'name': '2.4.2',
      'level': 'A',
      'principle': 'Operable'
    }],
    'related': [],
    'url': 'https://auto-wcag.github.io/auto-wcag/rules/SC2-4-2-page-has-title.html',
    'passed': 0,
    'notApplicable': 0,
    'failed': 0,
    'type': ['ACTRule', 'TestCase'],
    'a11yReq': ['WCAG21:title'],
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
  let rootElem: DomElement | undefined = undefined;

  //the first title element was already tested
  if (rule['metadata']['notApplicable'] > 0 || rule['metadata']['passed'] > 0 || rule['metadata']['failed'] > 0) {
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
        rule.metadata.failed++;
      }
      //the title element is empty
      else if (element.children && element.children.length === 0) {
        evaluation.verdict = 'failed';
        evaluation.description = 'Title element is empty';
        rule.metadata.failed++;
      }

      //the title element exists and it's not empty
      else {
        evaluation.verdict = 'passed';
        evaluation.description = `Title element exists and it's not empty`;
        rule.metadata.passed++;
      }
    }
    //the root element is not a html element
    else {
      evaluation.verdict = 'notApplicable';
      evaluation.description = 'The root element is not a html element';
      rule.metadata.notApplicable++;
    }
  }

  if (rootElem && element) {
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

export {
  hasPrincipleAndLevels,
  execute,
  getFinalResults,
  reset
};