'use strict';

import { Page, ElementHandle } from 'puppeteer';
import { ACTRuleResult } from '@qualweb/act-rules';
import { DomUtils, ShadowDomUtils } from '@qualweb/util';
import Rule from '../lib/Rule.object';
import { ACTRule, ElementExists } from '../lib/decorator';

@ACTRule
class QW_ACT_R18 extends Rule {

  constructor(rule?: any) {
    super(rule);
  }

  @ElementExists
  async execute(element: ElementHandle, page: Page): Promise<void> {

    const evaluation: ACTRuleResult = {
      verdict: '',
      description: '',
      resultCode: ''
    };

    const treeSelector = await ShadowDomUtils.getTreeSelector(element);
    const id = await DomUtils.getElementAttribute(element, 'id');
    if (id && id.trim()) {
      try {
        const elementsWithSameId = await page.$$(`[id="${id.trim()}"]` + treeSelector);
        const genId = RegExp('qw-generated-id-');
  
        if (elementsWithSameId.length > 1) {
          evaluation.verdict = 'failed';
          evaluation.description = `Several elements have the same \`id\` attribute (${id}).`;
          evaluation.resultCode = 'RC1';
        } else if (!genId.test(id)) {
          evaluation.verdict = 'passed';
          evaluation.description = 'The test target has a unique `id` attribute.';
          evaluation.resultCode = 'RC2';
        }
      } catch (err) {
        evaluation.verdict = 'inapplicable';
        evaluation.description = `The test target \`id\` attribute has a invalid value.`;
        evaluation.resultCode = 'RC3';
      }
    }

    await super.addEvaluationResult(evaluation, element);
  }
}

export = QW_ACT_R18;
