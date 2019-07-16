'use strict';

import { DomElement } from 'htmlparser2';
import _ from 'lodash';

import { ACTRule, ACTResult } from '@qualweb/act-rules';

import {
  getElementSelector,
  transform_element_into_html
} from '../util';

const rule: ACTRule = {
  'name': 'Meta-refresh no delay',
  'code': 'R23',
  'description': 'This rule checks that the meta element is not used for delayed redirecting or refreshing.',
  'metadata': {
    'target': {
      'element': 'meta'
    },
    'success-criteria': [{
        'name': '2.1.1',
        'level': 'A',
        'principle': 'Operable'
      },
      {
        'name': '2.2.4',
        'level': 'AAA',
        'principle': 'Operable'
      },
      {
        'name': '3.2.5',
        'level': 'AAA',
        'principle': 'Understandable'
      }
    ],
    'related': ['H76', 'F40', 'F41'],
    'url': 'https://auto-wcag.github.io/auto-wcag/rules/SC2-2-1+SC2-2-4-meta-refresh.html',
    'passed': 0,
    'failed': 0,
    'notApplicable': 0,
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
  
  if (element === undefined) { // if the element doesn't exist, there's nothing to test
    return;
  }

  const evaluation: ACTResult = {
    verdict: '',
    description: '',
    code: '',
    pointer: ''
  };

  if (rule.metadata.passed === 1 || rule.metadata.failed === 1) { // only one meta needs to pass or fail, others will be discarded
    evaluation.verdict = 'notApplicable';
    evaluation.description = 'Already exists one valid or invalid <meta> above';
    rule.metadata.notApplicable++;
  } else if (element.attribs === undefined) { // not applicable
    evaluation.verdict = 'notApplicable';
    evaluation.description = 'Inexistent attributes "content" and "http-equiv"';
    rule.metadata.notApplicable++;
  } else if (element.attribs.content === undefined) { // not applicable
    evaluation.verdict = 'notApplicable';
    evaluation.description = 'Inexistent attribute "content"';
    rule.metadata.notApplicable++;
  } else if (element.attribs['http-equiv'] === undefined) { // not applicable
    evaluation.verdict = 'notApplicable';
    evaluation.description = 'Inexistent attribute "http-equiv"';
    rule.metadata.notApplicable++;
  } else if (element.attribs.content === '') { // not applicable
    evaluation.verdict = 'notApplicable';
    evaluation.description = 'Attribute "content" is empty';
    rule.metadata.notApplicable++;
  } else {
    let content = element.attribs.content;

    let indexOf = content.indexOf(';');

    if (indexOf === -1) { // if is a refresh
      if (checkIfIsNumber(content) && _.isInteger(parseInt(content, 0))) {
        let n = Number(content);
        if (n < 0) { // not applicable
          evaluation.verdict = 'notApplicable';
          evaluation.description = `Time value can't be negative`;
          rule.metadata.notApplicable++;
        } else if (n === 0) { // passes because the time is 0
          evaluation.verdict = 'passed';
          evaluation.description = 'Refreshes immediately';
          rule.metadata.passed++;
        } else if (n > 72000) { // passes because the time is bigger than 72000
          evaluation.verdict = 'passed';
          evaluation.description = 'Refreshes after more than 20 hours';
          rule.metadata.passed++;
        } else { // fails because the time is in between 0 and 72000
          evaluation.verdict = 'failed';
          evaluation.description = `Refreshes after ${n} seconds`;
          rule.metadata.failed++;
        }
      } else { // not applicable
        evaluation.verdict = 'notApplicable';
        evaluation.description = '"Content" attribute is invalid';
        rule.metadata.notApplicable++;
      }
    } else { // if is a redirect
      let split = content.split(';');

      if (split.length > 2) { // not applicable
        evaluation.verdict = 'notApplicable';
        evaluation.description = 'Malformated "Content" attribute';
        rule.metadata.notApplicable++;
      } else if (split[0].trim() === '' || split[1].trim() === '') { // not applicable
        evaluation.verdict = 'notApplicable';
        evaluation.description = '"Content" attribute is invalid';
        rule.metadata.notApplicable++;
      } else if (checkIfIsNumber(split[0]) && _.isInteger(parseInt(split[0], 0))) {
        let n = Number(split[0]);
        if (n < 0) { // not applicable
          evaluation.verdict = 'notApplicable';
          evaluation.description = `Time value can't be negative`;
          rule.metadata.notApplicable++;
        }

        if (content[indexOf + 1] === ' ') { // verifies if the url is well formated
          let url: string | null = null;

          if (split[1].toLowerCase().includes('url=')) {
            url = split[1].split(`'`)[1].trim();
          } else {
            url = split[1].trim();
          }

          if (validURL(url)) {
            if (n === 0) { // passes because the time is 0 and the url exists
              evaluation.verdict = 'passed';
              evaluation.description = 'Redirects immediately';
              rule.metadata.passed++;
            } else if (n > 72000) { // passes because the time is bigger than 72000 and the url exists
              evaluation.verdict = 'passed';
              evaluation.description = 'Redirects after more than 20 hours';
              rule.metadata.passed++;
            } else { // fails because the time is in between 0 and 72000, but the url exists
              evaluation.verdict = 'failed';
              evaluation.description = `Redirects after ${n} seconds`;
              rule.metadata.failed++;
            }
          } else { // not applicable
            evaluation.verdict = 'notApplicable';
            evaluation.description = 'Url is not valid';
            rule.metadata.notApplicable++;
          }
        } else { // not applicable
          evaluation.verdict = 'notApplicable';
          evaluation.description = 'Url is malformated';
          rule.metadata.notApplicable++;
        }
      } else { // not applicable
        evaluation.verdict = 'notApplicable';
        evaluation.description = '"Content" attribute is invalid"';
        rule.metadata.notApplicable++;
      }
    }
  }

  evaluation.code = transform_element_into_html(element);
  evaluation.pointer = getElementSelector(element);

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

function validURL(url: string): boolean {
  var pattern = new RegExp('^(https?:\\/\\/)?'+ // protocol
    '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|'+ // domain name
    '((\\d{1,3}\\.){3}\\d{1,3}))'+ // OR ip (v4) address
    '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*'+ // port and path
    '(\\?[;&a-z\\d%_.~+=-]*)?'+ // query string
    '(\\#[-a-z\\d_]*)?$','i'); // fragment locator
  return !!pattern.test(url);
}

function checkIfIsNumber(num: string): boolean {
  let success = true;
  for (let n of num) {
    if (isNaN(parseInt(n, 0))) {
      success = false;
      break;
    }
  }

  return success;
};

export {
  hasPrincipleAndLevels,
  execute,
  getFinalResults,
  reset
};