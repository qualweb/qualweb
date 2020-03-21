'use strict';

import { Page, ElementHandle } from 'puppeteer';
import { ACTRuleResult } from '@qualweb/act-rules';
import { DomUtils } from '@qualweb/util';
import Rule from '../lib/Rule.object';
import { ACTRule } from '../lib/decorator';

@ACTRule
class QW_ACT_R2 extends Rule {

  constructor(rule?: any) {
    super(rule);
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