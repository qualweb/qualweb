
'use strict';

import { ElementHandle } from 'puppeteer';
import Rule from './Rule.object';
import { ACTRuleResult } from '@qualweb/act-rules';
import { DomUtils } from '@qualweb/util';

class QW_ACT_R20 extends Rule {

  constructor() {
    super({
      name: 'role attribute has valid value',
      code: 'QW-ACT-R20',
      mapping: '674b10',
      description: 'This rule checks that each role attribute has a valid value.',
      metadata: {
        target: {
          element: '*',
          attributes: ['role']
        },
        'success-criteria': [
          {
            name: '4.1.2',
            level: 'A',
            principle: 'Robust',
            url: 'https://www.w3.org/WAI/WCAG21/Understanding/name-role-value'
          }
        ],
        related: [],
        url: 'https://act-rules.github.io/rules/674b10',
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

  async execute(element: ElementHandle | undefined): Promise<void> {
    const evaluation: ACTRuleResult = {
      verdict: '',
      description: '',
      resultCode: ''
    };

    let validRoleValues = ['button', 'checkbox', 'gridcell', 'link', 'menuitem', 'menuitemcheckbox', 'menuitemradio', 'option', 'progressbar', 'radio', 'scrollbar', 'searchbox', 'separator', 'slider', 'spinbutton', 'switch', 'tab', 'tabpanel', 'textbox', 'treeitem', 'combobox', 'grid', 'listbox', 'menu', 'menubar', 'radiogroup', 'tablist', 'tree', 'treegrid', 'application', 'article', 'cell', 'collumnheader', 'definition', 'directory', 'document', 'feed', 'figure', 'group', 'heading', 'img', 'list', 'listitem', 'math', 'none', 'note', 'presentation', 'row', 'rowgroup', 'rowheader', 'separator', 'table', 'term', 'toolbar', 'tooltip', 'banner', 'complementary', 'contentinfo', 'form', 'main', 'navigation', 'region', 'search', 'alert', 'log', 'marquee', 'status', 'timer'];
    let validRolesFound = 0;

    if (element === undefined) { // if the element doesn't exist
      evaluation.verdict = 'inapplicable';
      evaluation.description = `There isn't an element with role attribute to test`;
      evaluation.resultCode = 'RC1';
    } else {
      let roleAttr = await DomUtils.getElementAttribute(element,"role");
      if (roleAttr) {
        if (!await DomUtils.isElementHidden(element)) {
          let roles = roleAttr.split(' ');
          for (let role of roles) {
            if (validRoleValues.includes(role)) {
              validRolesFound++;
            }
          }
          if (validRolesFound > 0) {
            evaluation.verdict = 'passed';
            evaluation.description = `This element has a valid role attribute`;
            evaluation.resultCode = 'RC2';
          } else {
            evaluation.verdict = 'failed';
            evaluation.description = `This element has an invalid role attribute`;
            evaluation.resultCode = 'RC3';
          }
        } else {
          evaluation.verdict = 'inapplicable';
          evaluation.description = `This element is not included in the accessibility tree`;
          evaluation.resultCode = 'RC4';
        }
      } else {
        evaluation.verdict = 'inapplicable';
        evaluation.description = `This role attribute is empty or null`;
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

export = QW_ACT_R20;
