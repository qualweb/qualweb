'use strict';

import { DomElement } from 'htmlparser2';
import _ from 'lodash';
import Rule from './Rule.object';

import { ACTRule, ACTRuleResult } from '@qualweb/act-rules';

import {
  getElementSelector,
  transform_element_into_html,
  getContentHash
} from '../util';

import languages from './language.json';

const rule: ACTRule = {
  name: 'Links with identical accessible names have equivalent purpose',
  code: 'QW-ACT-R9',
  mapping: 'b20e66',
  description: 'This rule checks that links with identical accessible names resolve to the same resource or equivalent resources.',
  metadata: {
    target: {
      element: 'a,[role="link"]'
    },
    'success-criteria': [{
      name: '2.4.9',
      level: 'AAA',
      principle: 'Operable',
      url: 'https://www.w3.org/WAI/WCAG21/Understanding/link-purpose-link-only.html'
    }],
    related: [],
    url: 'https://act-rules.github.io/rules/b20e66',
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

class QW_ACT_R9 extends Rule {

  constructor() {
    super(rule);
  }

  async execute(element: DomElement | undefined): Promise<void> {
    const evaluation: ACTRuleResult = {
      verdict: '',
      description: '',
      resultCode: ''
    };
    if (element === undefined || element.previous === undefined) { // if the element doesn't exist, there's nothing to test
      evaluation.verdict = 'inapplicable';
      evaluation.description = `There are no consecutive links`;
      evaluation.resultCode = 'RC1';
      super.addEvaluationResult(evaluation);
    }
    let previous = element.previous;
    let isHiddenFirst = false;
    let isHiddenSecond = false;
    let aNameFirst = "";
    let aNameSecond = "";

    //let url = rule.metadata['url'];
    //evaluation['test'] = url;

    if (isHiddenFirst || isHiddenSecond) {
      evaluation.verdict = 'inapplicable';
      evaluation.description = 'On of the links is not in the AT';
      evaluation.resultCode = 'RC2';
    } else if (aNameFirst !== aNameSecond) {
      evaluation.verdict = 'inapplicable';
      evaluation.description = `The links dont have the same accessible name`;
      evaluation.resultCode = 'RC3';
    } else {
      let refFirst = this.getReferenceURl(element);
      let refSecond =  this.getReferenceURl(previous);
    


      if (refFirst && refSecond && refFirst === refSecond) { // passed
          evaluation.verdict = 'passed';
          evaluation.description = `The links have the same reference and accessible name `;
          evaluation.resultCode = 'RC4';
        } else if(getContentHash(refFirst) === getContentHash(refSecond)){
          evaluation.verdict = 'passed';
          evaluation.description = `The links have diferent references to the same content and accessible name `;
          evaluation.resultCode = 'RC4';

        }else{
          evaluation.verdict = 'failed';
          evaluation.description = `The links have diferent references to the diferent content`;
          evaluation.resultCode = 'RC5';

        }
    }

    if (element !== undefined) {
      evaluation.code = transform_element_into_html(element);
      evaluation.pointer = getElementSelector(element);
    }

    super.addEvaluationResult(evaluation);
  }

  private checkValidity(element: string) {
    const split = element.split('-');
    const lang = split[0].toLocaleLowerCase();

    return this.isSubTagValid(lang) && split.length < 3;
  }

  private isSubTagValid(subTag: string) {
    return languages.hasOwnProperty(subTag);
  }
  private getReferenceURl(element: DomElement) {
    let hRef = element.attribs['href'];
    let onClick = element.attribs['onclick'];
    let onkeypress = element.attribs['onkeypress'];
    let result;

    if (hRef)
      result = hRef;
    else if (onClick)
      result = onClick;
    else if (onkeypress)
      result = onkeypress;

    return result;
  }
}

export = QW_ACT_R9;