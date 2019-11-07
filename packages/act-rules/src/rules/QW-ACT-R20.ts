/**
 * Author: Bruno Andrade
 *
 * Description:
 *
 * Notes:
 *
 * Last modified: 7/11/2019
 */
'use strict';

import {DomElement} from 'htmlparser2';
import {ACTRule, ACTRuleResult} from '@qualweb/act-rules';
import {DomUtils} from '@qualweb/util';
import Rule from './Rule.object';

import {
  getElementSelector,
  transform_element_into_html
} from '../util';

/**
 * Technique information
 * @type {Object}
 */
const rule: ACTRule = {
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
    inapplicable: 0,
    warning: 0,
    failed: 0,
    type: ['ACTRule', 'TestCase'],
    a11yReq: ['WCAG21:language'],
    outcome: '',
    description: ''
  },
  results: new Array<ACTRuleResult>()
};

class QW_ACT_R20 extends Rule {

  constructor() {
    super(rule);
  }

  async execute(element: DomElement | undefined, processedHTML: DomElement[]): Promise<void> {
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
      if (element.attribs) {
        let roleAttr = element.attribs["role"];
        if (roleAttr) {
          if (!DomUtils.isElementHidden(element)) {
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
      } else {
        // doesnt happen, there is always at least the role attribute
      }
    }

    if (element !== undefined) {
      evaluation.code = transform_element_into_html(element);
      evaluation.pointer = getElementSelector(element);
    }

    super.addEvaluationResult(evaluation);
  }
}

export = QW_ACT_R20;
