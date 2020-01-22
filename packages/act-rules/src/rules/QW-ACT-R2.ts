'use strict';

import { Page, ElementHandle } from 'puppeteer';
import { ACTRuleResult } from '@qualweb/act-rules';
import Rule from './Rule.object';

import { DomUtils } from '@qualweb/util';

class QW_ACT_R2 extends Rule {

  constructor() {
    super({
      name: 'HTML has lang attribute',
      code: 'QW-ACT-R2',
      mapping: 'b5c3f8',
      description: 'This rule checks that the html element has a non-empty lang or xml:lang attribute.',
      metadata: {
        target: {
          element: 'html',
          attributes: 'lang'
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

    const rootElement = (await DomUtils.getPageRootElement(page)) || '';
    const rootElementTagName = await DomUtils.getElementTagName(rootElement);
    const isMathDocument = await DomUtils.isMathDocument(await page.url());

    const isHtmlDocument = rootElementTagName.trim().toLowerCase() === 'html' && !isMathDocument;

    if (!element || !isHtmlDocument) {
      evaluation.verdict = 'inapplicable';
      evaluation.description = `The root element is not an \`html\` element.`;
      evaluation.resultCode = 'RC1';
    } else {
      const lang = await DomUtils.getElementAttribute(element, 'lang');

      if (lang && lang.trim()) {
        evaluation.verdict = 'passed';
        evaluation.description = `The \`lang\` attribute exists and has a value`;
        evaluation.resultCode = 'RC2';
      } else {
        evaluation.verdict = 'failed';
        evaluation.description = `The \`lang\` attribute doesn't exist or is empty ("")`;
        evaluation.resultCode = 'RC3';
      }
    }

    await super.addEvaluationResult(evaluation, element);
  }
}

export = QW_ACT_R2;