'use strict';

import { ElementHandle, Page } from 'puppeteer';
import Rule from './Rule.object';
import { ACTRuleResult } from '@qualweb/act-rules';
import { DomUtils, AccessibilityUtils } from '@qualweb/util';

class QW_ACT_R16 extends Rule {

  constructor() {
    super({
      name: 'Form control has accessible name',
      code: 'QW-ACT-R16',
      mapping: 'e086e5',
      description: 'Form control has accessible name',
      metadata: {
        target: {
          element: ['input', 'select', 'textarea', '*[role]'],
        },
        'success-criteria': [
          {
            name: '3.3.2',
            level: 'A',
            principle: 'Understandable',
            url: 'https://www.w3.org/WAI/WCAG21/Understanding/labels-or-instructions'
          },
          {
            name: '4.1.2',
            level: 'A',
            principle: 'Robust',
            url: 'https://www.w3.org/WAI/WCAG21/Understanding/name-role-value'
          }
        ],
        related: [],
        url: 'https://act-rules.github.io/rules/e086e5',
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

  async execute(element: ElementHandle | undefined, page:Page): Promise<void> {

    if (!element) {
      return;
    }

    const evaluation: ACTRuleResult = {
      verdict: '',
      description: '',
      resultCode: ''
    };

    const semanticRoles = ['checkbox', 'combobox', 'listbox', 'menuitemcheckbox', 'menuitemradio', 'radio', 'searchbox', 'slider', 'spinbutton', 'switch', 'textbox'];

    const role = await DomUtils.getElementAttribute(element, 'role');
    if (!role || semanticRoles.includes(role.trim())) {
      const isHidden = await DomUtils.isElementHidden(element);
      if (!isHidden) {
        const accessibleName = await AccessibilityUtils.getAccessibleName(element, page);
        if (accessibleName && accessibleName.trim()) {
          evaluation.verdict = 'passed';
          evaluation.description = `The test target has an accessible name.`;
          evaluation.resultCode = 'RC1';
        } else {
          evaluation.verdict = 'failed';
          evaluation.description = `The test target doesn't exists or it's empty ("").`;
          evaluation.resultCode = 'RC2';
        }
      } else {
        evaluation.verdict = 'inapplicable';
        evaluation.description = `The test target has an accessible name but it's hidden.`;
        evaluation.resultCode = 'RC3';
      }
    } else {
      evaluation.verdict = 'inapplicable';
      evaluation.description = `The \`role\` has explicitly been set to something that isn't a form field.`;
      evaluation.resultCode = 'RC4';
    }

    await super.addEvaluationResult(evaluation, element);
  }
}

export = QW_ACT_R16;
