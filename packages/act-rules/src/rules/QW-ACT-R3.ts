'use strict';

import { ElementHandle, Page } from 'puppeteer';
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
      const xmlLang = await DomUtils.getElementAttribute(element, 'xml:lang');

      if (lang === null || xmlLang === null) {
        evaluation.verdict = 'inapplicable';
        evaluation.description = `The \`lang\` or \`xml:lang\` attribute doesn't exist in the \`html\` element.`;
        evaluation.resultCode = 'RC2';
      } else if (!lang.trim() || !xmlLang.trim()) {
        evaluation.verdict = 'inapplicable';
        evaluation.description = `The \`lang\` or \`xml:lang\` attribute is empty ("") in the \`html\` element.`;
        evaluation.resultCode = 'RC3';
      } else {
        const primaryLang = lang.split('-')[0];
        const primaryXmlLang = xmlLang.split('-')[0];
        const validLang = this.isSubTagValid(primaryLang.toLowerCase());
        const validXmlLang = this.isSubTagValid(primaryXmlLang.toLowerCase());

        if (!validLang || !validXmlLang) {
          evaluation.verdict = 'inapplicable';
          evaluation.description = `The \`lang\` or \`xml:lang\` attribute doesn't have a valid value.`;
          evaluation.resultCode = 'RC5';
        }
        // from now on, we know that both tags are valid
        else if (primaryLang.toLowerCase() === primaryXmlLang.toLowerCase()) {
          evaluation.verdict = 'passed';
          evaluation.description = `The \`lang\` and \`xml:lang\` attributes have the same value.`;
          evaluation.resultCode = 'RC6';
        } else {
          // if lang and xml:lang are different
          evaluation.verdict = 'failed';
          evaluation.description = `The \`lang\` and \`xml:lang\` attributes don't have the same value.`;
          evaluation.resultCode = 'RC7';
        }
      }
    }
    
    await super.addEvaluationResult(evaluation, element);
  }

  private isSubTagValid(subTag: string): boolean {
    return languages.hasOwnProperty(subTag);
  }
}

export = QW_ACT_R3;