'use strict';

import { ElementHandle } from 'puppeteer';
import { ACTRuleResult } from '@qualweb/act-rules';
import Rule from './Rule.object';

import { DomUtils } from '@qualweb/util';

import languages from './language.json';

class QW_ACT_R3 extends Rule {

  constructor() {
    super({
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
        warning: 0,
        inapplicable: 0,
        failed: 0,
        type: ['ACTRule', 'TestCase'],
        a11yReq: ['WCAG21:language'],
        outcome: '',
        description: ''
      },
      results: new Array<ACTRuleResult>()
    });
  }

  async execute(element: ElementHandle | undefined): Promise<void> {
    const evaluation: ACTRuleResult = {
      verdict: '',
      description: '',
      resultCode: ''
    };

    if (element === undefined) { // if the element doesn't exist, there's nothing to test
      evaluation.verdict = 'inapplicable';
      evaluation.description = `html element doesn't exist`;
      evaluation.resultCode = 'RC1';
    } else if ((await DomUtils.getElementParent(element)) !== null) {
      evaluation.verdict = 'inapplicable';
      evaluation.description = 'html element is not the root element of the page';
      evaluation.resultCode = 'RC2';
    } else {
      const lang = await DomUtils.getElementAttribute(element, 'lang');
      const xmlLang = await DomUtils.getElementAttribute(element, 'xml:lang');

      if (lang === null || xmlLang === null) {
        evaluation.verdict = 'inapplicable';
        evaluation.description = `lang or xml:lang attribute doesn't exist in html element`;
        evaluation.resultCode = 'RC3';
      } else if (lang.trim() === '' || xmlLang.trim() === '') {
        evaluation.verdict = 'inapplicable';
        evaluation.description = 'lang or xml:lang attribute is empty in html element';
        evaluation.resultCode = 'RC4';
      } else {
        let primaryLang = lang.split('-')[0];
        let primaryXmlLang = xmlLang.split('-')[0];
        const validLang = this.isSubTagValid(primaryLang.toLowerCase());
        const validXmlLang = this.isSubTagValid(primaryXmlLang.toLowerCase());

        if (!validLang || !validXmlLang) {
          evaluation.verdict = 'inapplicable';
          evaluation.description = 'lang or xml:lang element is not valid';
          evaluation.resultCode = 'RC5';
        }
        // from now on, we know that both tags are valid
        else if (primaryLang.toLowerCase() === primaryXmlLang.toLowerCase()) {
          evaluation.verdict = 'passed';
          evaluation.description = 'lang and xml:lang attributes have the same value';
          evaluation.resultCode = 'RC6';
        } else {
          // if lang and xml:lang are different
          evaluation.verdict = 'failed';
          evaluation.description = 'lang and xml:lang attributes do not have the same value';
          evaluation.resultCode = 'RC7';
        }
      }
    }

    if (element !== undefined) {
      evaluation.htmlCode = await DomUtils.getElementHtmlCode(element);
      evaluation.pointer = await DomUtils.getElementSelector(element);
    }
 
    
    super.addEvaluationResult(evaluation);
  }

  private isSubTagValid(subTag: string) {
    return languages.hasOwnProperty(subTag);
  }
}

export = QW_ACT_R3;