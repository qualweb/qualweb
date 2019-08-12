'use strict';

import { DomElement } from 'htmlparser2';
import _ from 'lodash';

import { ACTRule, ACTRuleResult } from '@qualweb/act-rules';

import {
  getElementSelector,
  transform_element_into_html
} from '../util';

const rule: ACTRule = {
  name: 'Meta-refresh no delay',
  code: 'QW-ACT-R4',
  mapping: 'bc659a',
  description: 'This rule checks that the meta element is not used for delayed redirecting or refreshing.',
  metadata: {
    target: {
      element: 'meta'
    },
    'success-criteria': [{
        name: '2.1.1',
        level: 'A',
        principle: 'Operable',
        url: 'https://www.w3.org/WAI/WCAG21/Understanding/keyboard'
      },
      {
        name: '2.2.4',
        level: 'AAA',
        principle: 'Operable',
        url: 'https://www.w3.org/WAI/WCAG21/Understanding/interruptions'
      },
      {
        name: '3.2.5',
        level: 'AAA',
        principle: 'Understandable',
        url: 'https://www.w3.org/WAI/WCAG21/Understanding/change-on-request'
      }
    ],
    related: ['H76', 'F40', 'F41'],
    url: 'https://act-rules.github.io/rules/bc659a',
    passed: 0,
    failed: 0,
    inapplicable: 0,
    type: ['ACTRule', 'TestCase'],
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
  
  if (element === undefined) { // if the element doesn't exist, there's nothing to test
    return;
  }

  const evaluation: ACTRuleResult = {
    verdict: '',
    description: '',
    resultCode: ''
  };

  if (rule.metadata.passed === 1 || rule.metadata.failed === 1) { // only one meta needs to pass or fail, others will be discarded
    evaluation.verdict = 'inapplicable';
    evaluation.description = 'Already exists one valid or invalid <meta> above';
    evaluation.resultCode = 'RC1';
    rule.metadata.inapplicable++;
  } else if (element.attribs === undefined) { // not applicable
    evaluation.verdict = 'inapplicable';
    evaluation.description = 'Inexistent attributes "content" and "http-equiv"';
    evaluation.resultCode = 'RC2';
    rule.metadata.inapplicable++;
  } else if (element.attribs.content === undefined) { // not applicable
    evaluation.verdict = 'inapplicable';
    evaluation.description = 'Inexistent attribute "content"';
    evaluation.resultCode = 'RC3';
    rule.metadata.inapplicable++;
  } else if (element.attribs['http-equiv'] === undefined) { // not applicable
    evaluation.verdict = 'inapplicable';
    evaluation.description = 'Inexistent attribute "http-equiv"';
    evaluation.resultCode = 'RC4';
    rule.metadata.inapplicable++;
  } else if (element.attribs.content === '') { // not applicable
    evaluation.verdict = 'inapplicable';
    evaluation.description = 'Attribute "content" is empty';
    evaluation.resultCode = 'RC5';
    rule.metadata.inapplicable++;
  } else {
    let content = element.attribs.content;

    let indexOf = content.indexOf(';');

    if (indexOf === -1) { // if is a refresh
      if (checkIfIsNumber(content) && _.isInteger(parseInt(content, 0))) {
        let n = Number(content);
        if (n < 0) { // not applicable
          evaluation.verdict = 'inapplicable';
          evaluation.description = `Time value can't be negative`;
          evaluation.resultCode = 'RC6';
          rule.metadata.inapplicable++;
        } else if (n === 0) { // passes because the time is 0
          evaluation.verdict = 'passed';
          evaluation.description = 'Refreshes immediately';
          evaluation.resultCode = 'RC7';
          rule.metadata.passed++;
        } else if (n > 72000) { // passes because the time is bigger than 72000
          evaluation.verdict = 'passed';
          evaluation.description = 'Refreshes after more than 20 hours';
          evaluation.resultCode = 'RC8';
          rule.metadata.passed++;
        } else { // fails because the time is in between 0 and 72000
          evaluation.verdict = 'failed';
          evaluation.description = `Refreshes after ${n} seconds`;
          evaluation.resultCode = 'RC9';
          rule.metadata.failed++;
        }
      } else { // not applicable
        evaluation.verdict = 'inapplicable';
        evaluation.description = '"Content" attribute is invalid';
        evaluation.resultCode = 'RC10';
        rule.metadata.inapplicable++;
      }
    } else { // if is a redirect
      let split = content.split(';');

      if (split.length > 2) { // not applicable
        evaluation.verdict = 'inapplicable';
        evaluation.description = 'Malformated "Content" attribute';
        evaluation.resultCode = 'RC11';
        rule.metadata.inapplicable++;
      } else if (split[0].trim() === '' || split[1].trim() === '') { // not applicable
        evaluation.verdict = 'inapplicable';
        evaluation.description = '"Content" attribute is invalid';
        evaluation.resultCode = 'RC10';
        rule.metadata.inapplicable++;
      } else if (checkIfIsNumber(split[0]) && _.isInteger(parseInt(split[0], 0))) {
        let n = Number(split[0]);
        if (n < 0) { // not applicable
          evaluation.verdict = 'inapplicable';
          evaluation.description = `Time value can't be negative`;
          evaluation.resultCode = 'RC6';
          rule.metadata.inapplicable++;
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
              evaluation.resultCode = 'RC12';
              rule.metadata.passed++;
            } else if (n > 72000) { // passes because the time is bigger than 72000 and the url exists
              evaluation.verdict = 'passed';
              evaluation.description = 'Redirects after more than 20 hours';
              evaluation.resultCode = 'RC13';
              rule.metadata.passed++;
            } else { // fails because the time is in between 0 and 72000, but the url exists
              evaluation.verdict = 'failed';
              evaluation.description = `Redirects after ${n} seconds`;
              evaluation.resultCode = 'RC14';
              rule.metadata.failed++;
            }
          } else { // not applicable
            evaluation.verdict = 'inapplicable';
            evaluation.description = 'Url is not valid';
            evaluation.resultCode = 'RC15';
            rule.metadata.inapplicable++;
          }
        } else { // not applicable
          evaluation.verdict = 'inapplicable';
          evaluation.description = 'Url is malformated';
          evaluation.resultCode = 'RC16';
          rule.metadata.inapplicable++;
        }
      } else { // not applicable
        evaluation.verdict = 'inapplicable';
        evaluation.description = '"Content" attribute is invalid"';
        evaluation.resultCode = 'RC10';
        rule.metadata.inapplicable++;
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
  getRuleMapping,
  hasPrincipleAndLevels,
  execute,
  getFinalResults,
  reset
};