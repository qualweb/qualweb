'use strict';

import { Page, ElementHandle } from 'puppeteer';
import { ACTRule, ACTRuleResult } from '@qualweb/act-rules';
import Rule from './Rule.object';

import { DomUtils } from '../../../util/index';

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
      principle: 'Understandable',
      url: 'https://www.w3.org/WAI/WCAG21/Understanding/language-of-page'
    }],
    related: [],
    url: 'https://act-rules.github.io/rules/b5c3f8',
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

class QW_ACT_R2 extends Rule {

  constructor() {
    super(rule);
  }

  async execute(element: ElementHandle | undefined, page: Page): Promise<void> {
    const evaluation: ACTRuleResult = {
      verdict: '',
      description: '',
      resultCode: ''
    };

    const mathElement = await page.$$('math');

    if (element === undefined || mathElement.length > 0) { // if the element doesn't exist, there's nothing to test
      evaluation.verdict = 'inapplicable';
      evaluation.description = `There is no <html> element`;
      evaluation.resultCode = 'RC1';
      evaluation.description = `The <html> element is not the root element of the page`;
      evaluation.resultCode = 'RC2';
    } else {
      let teste = await page.evaluate(() => {
        return document.contentType+" "+document.documentElement.childNodes.length;
      });
      console.log(teste);
      let banana = await element.evaluate(() => {
        return document.contentType+" "+document.documentElement.childNodes.length;
      });
      console.log(banana);
      const lang = await DomUtils.getElementAttribute(element, 'lang');
      const xmlLang = await DomUtils.getElementAttribute(element, 'xml:lang');

      if (lang !== null && xmlLang !== null && xmlLang.trim() !== '') { // passed
        evaluation.verdict = 'passed';
        evaluation.description = `The xml:lang attribute has a value`;
        evaluation.resultCode = 'RC3';
      } else if (lang !== null && lang.trim() !== '') { // passed
        evaluation.verdict = 'passed';
        evaluation.description = `The lang attribute has a value`;
        evaluation.resultCode = 'RC4';
      } else if (lang === null || xmlLang === null) { // failed
        evaluation.verdict = 'failed';
        evaluation.description = `The lang and xml:lang attributes are empty or undefined`;
        evaluation.resultCode = 'RC5';
      } else if (lang.trim() === '' || xmlLang.trim() === '') { // failed
        evaluation.verdict = 'failed';
        evaluation.description = `The lang and xml:lang attributes are empty or undefined`;
        evaluation.resultCode = 'RC5';
      }
    }
    
    if (element !== undefined) {
      evaluation.htmlCode = await DomUtils.getElementHtmlCode(element);
      evaluation.pointer = await DomUtils.getElementSelector(element);
    }

    super.addEvaluationResult(evaluation);
  }
}

export = QW_ACT_R2;