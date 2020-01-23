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

  async execute(element: ElementHandle | undefined, page:Page): Promise<void> {
    const evaluation: ACTRuleResult = {
      verdict: '',
      description: '',
      resultCode: ''
    };

    let semanticRoles = ['checkbox', 'combobox', 'listbox', 'menuitemcheckbox', 'menuitemradio', 'radio', 'searchbox', 'slider', 'spinbutton', 'switch', 'textbox'];
    let accessibleName;

    if (element === undefined) {
      evaluation.verdict = 'inapplicable';
      evaluation.description = `There are no input, select, textarea or elements with role attribute in this web page.`;
      evaluation.resultCode = 'RC1';
    } else {
      let role = await DomUtils.getElementAttribute(element,"role");
      if (!role|| ( semanticRoles.includes(role.trim()))) {
        if (!await DomUtils.isElementHidden(element)) {
          accessibleName = await AccessibilityUtils.getAccessibleName(element, page);
          if (accessibleName !== undefined && accessibleName.trim() !== '') {
            evaluation.verdict = 'passed';
            evaluation.description = `This form field element has an not-empty accessible name`;
            evaluation.resultCode = 'RC2';
          } else {
            evaluation.verdict = 'failed';
            evaluation.description = `This form field element has an empty or undefined accessible name`;
            evaluation.resultCode = 'RC3';
          }
        } else {
          evaluation.verdict = 'inapplicable';
          evaluation.description = `This form field element has an not-empty accessible name but is hidden`;
          evaluation.resultCode = 'RC4';
        }
      } else {
        evaluation.verdict = 'inapplicable';
        evaluation.description = `Role has explicitly been set to something that isn't a form field`;
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

export = QW_ACT_R16;
