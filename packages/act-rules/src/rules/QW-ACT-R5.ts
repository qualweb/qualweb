'use strict';

import { ElementHandle, Page } from 'puppeteer';
import Rule from './Rule.object';
import { ACTRuleResult } from '@qualweb/act-rules';
import { DomUtils } from '@qualweb/util';
import languages from './language.json';

class QW_ACT_R5 extends Rule {

  constructor() {
    super({
      name: 'Validity of HTML Lang attribute',
      code: 'QW-ACT-R5',
      mapping: 'bf051a',
      description: 'This rule checks the lang or xml:lang attribute has a valid language subtag.',
      metadata: {
        target: {
          element: 'html',
          attributes: ['lang']
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
        warning: 0,
        failed: 0,
        type: ['ACTRule', 'TestCase'],
        a11yReq: ['WCAG21:language'],
        outcome: '',
        description: ''
      },
      results: new Array<ACTRuleResult>()
    });
  }

  async execute(element: ElementHandle | undefined, page: Page): Promise<void> {
    const evaluation: ACTRuleResult = {
      verdict: '',
      description: '',
      resultCode: ''
    };

    const rootElement = await DomUtils.getPageRootElement(page);
    let rootElementTagName; 
    if (rootElement) {
      rootElementTagName = await DomUtils.getElementTagName(rootElement);
    }
    const isMathDocument = await DomUtils.isMathDocument(await page.url());

    const isHtmlDocument = rootElementTagName.trim().toLowerCase() === 'html' && !isMathDocument;

    if (!element || !isHtmlDocument) {
      evaluation.verdict = 'inapplicable';
      evaluation.description = `The root element is not an \`html\` element.`;
      evaluation.resultCode = 'RC1';
    } else {
      const lang = await DomUtils.getElementAttribute(element, 'lang');

      if (lang && lang.trim()) { // passed
        if (this.checkValidity(lang)) {
          evaluation.verdict = 'passed';
          evaluation.description = `The \`lang\´ attribute has a valid value.`;
          evaluation.resultCode = 'RC2';
        } else {
          evaluation.verdict = 'failed';
          evaluation.description = 'The \`lang\` attribute does not have a valid value.';
          evaluation.resultCode = 'RC3';
        }
      } else {
        evaluation.verdict = 'inapplicable';
        evaluation.description = `The \`lang\` attribute is empty or doesn't exist.`;
        evaluation.resultCode = 'RC4';
      }
    }

    await super.addEvaluationResult(evaluation, element);
  }

  private checkValidity(lang: string): boolean {
    const subLangs = lang.split('-');
    
    if (subLangs.length > 2) {
      return false;
    }

    return this.isSubTagValid(subLangs[0]);
  }

  private isSubTagValid(subTag: string): boolean {
    return languages.hasOwnProperty(subTag);
  }
}

export = QW_ACT_R5;