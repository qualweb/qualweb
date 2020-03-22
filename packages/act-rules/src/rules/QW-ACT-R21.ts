'use strict';

import { ElementHandle, Page } from 'puppeteer';
import { ACTRuleResult } from '@qualweb/act-rules';
import { AccessibilityUtils, DomUtils } from '@qualweb/util';
import Rule from '../lib/Rule.object';
import { ACTRule, ElementExists } from '../lib/decorator';

@ACTRule
class QW_ACT_R21 extends Rule {

  constructor(rule?: any) {
    super(rule);
  }

  @ElementExists
  async execute(element: ElementHandle, page: Page): Promise<void> {

    const roleList = ['img', 'graphics-document', 'graphics-symbol'];

    const elementsToEvaluate = await element.$$('svg *');
    elementsToEvaluate.push(element);

    for (const elem of elementsToEvaluate || []) {
      const evaluation: ACTRuleResult = {
        verdict: '',
        description: '',
        resultCode: ''
      };

      const [role, isHidden, accessibleName] = await Promise.all([
        DomUtils.getElementAttribute(elem, 'role'),
        DomUtils.isElementHidden(elem),
        AccessibilityUtils.getAccessibleNameSVG(elem, page)
      ]);

      if (!role || (role && roleList.indexOf(role) < 0) || isHidden) {
        evaluation.verdict = 'inapplicable';
        evaluation.description = `No test target with this specific roles is included in the accessibility tree.`;
        evaluation.resultCode = 'RC1';
      } else if (accessibleName && accessibleName.trim()) {
        evaluation.verdict = 'passed';
        evaluation.description = `The test target has an accessible name.`;
        evaluation.resultCode = 'RC2';
      } else {
        evaluation.verdict = 'failed';
        evaluation.description = `The test target doesn't have an accessible name.`;
        evaluation.resultCode = 'RC3';
      }
      
      await super.addEvaluationResult(evaluation, elem);
    }
  }
}

export = QW_ACT_R21;
