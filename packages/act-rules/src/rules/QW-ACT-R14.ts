'use strict';

import { ElementHandle } from 'puppeteer';
import Rule from './Rule.object';
import { ACTRuleResult } from '@qualweb/act-rules';
import { DomUtils } from '@qualweb/util';

class QW_ACT_R14 extends Rule {

  constructor() {
    super({
      name: 'meta viewport does not prevent zoom',
      code: 'QW-ACT-R14',
      mapping: 'b4f0c3',
      description: 'This rule checks that the meta element retains the user agent ability to zoom.',
      metadata: {
        target: {
          element: 'meta',
          attributes: 'name="viewport"'
        },
        'success-criteria': [{
          name: '1.4.4',
          level: 'AA',
          principle: 'Perceivable',
          url: 'https://www.w3.org/WAI/WCAG21/Understanding/resize-text'
        }],
        related: [],
        url: 'https://act-rules.github.io/rules/b4f0c3',
        passed: 0,
        warning: 0,
        failed: 0,
        type: ['ACTRule', 'TestCase'],
        a11yReq: ['WCAG21:title'],
        outcome: '',
        description: ''
      },
      results: new Array<ACTRuleResult>()
    });
  }

  async execute(element: ElementHandle | undefined): Promise<void> {

    if (!element) {
      return;
    }

    const evaluation: ACTRuleResult = {
      verdict: '',
      description: '',
      resultCode: ''
    };

    const name = await DomUtils.getElementAttribute(element, 'name');
    if (name !== null && name.toLowerCase() === 'viewport') {
      const content = await DomUtils.getElementAttribute(element, 'content');
      if (content !== null) {
        let maximumScale = '';
        let userScalable = '';
        let contentValues = content.split(',');
        if (contentValues[0].trim().length > 0) {
          for (const valueItem of contentValues || []) {
            const value = valueItem.trim().split('=');
            if (value[0] === 'maximum-scale') {
              maximumScale = value[1];
            } else if (value[0] === 'user-scalable') {
              userScalable = value[1];
            }
          }
        }
        if (!maximumScale && !userScalable) {
          evaluation.verdict = 'passed';
          evaluation.description = `The \`meta\` element with a \`name="viewport"\` attribute doesn't define the \`maximum-scale\` and \`user-scalable\` values.`;
          evaluation.resultCode = 'RC1';
        } else if (userScalable === 'no' || maximumScale == 'yes' || parseFloat(maximumScale) < 2) {
          evaluation.verdict = 'failed';
          evaluation.description = `The \`meta\` element with a \`name="viewport"\` attribute abolishes the user agent ability to zoom with user-scalable=no or maximum-scale < 2.`;
          evaluation.resultCode = 'RC2';
        } else {
          evaluation.verdict = 'passed';
          evaluation.description = `The \`meta\` element with a \`name="viewport"\` attribute retains the user agent ability to zoom.`;
          evaluation.resultCode = 'RC3';
        }
      } else {
        evaluation.verdict = 'inapplicable';
        evaluation.description = `The \`meta\` element with a \`name="viewport"\` attribute doesn't have the \`content\` attribute.`;
        evaluation.resultCode = 'RC4';
      }
    } else {
      evaluation.verdict = 'inapplicable';
      evaluation.description = `The \`meta\` element with a \`name="viewport"\` attribute is not present within the page.`;
      evaluation.resultCode = 'RC5';
    }

    await super.addEvaluationResult(evaluation, element);
  }
}

export = QW_ACT_R14;
