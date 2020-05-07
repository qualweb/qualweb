
'use strict';

import { ACTRuleResult } from '@qualweb/act-rules';
import { DomUtils } from '@qualweb/util';
import Rule from '../lib/Rule.object';
import { ACTRule, ElementExists } from '../lib/decorator';
import {QWElement} from "@qualweb/qw-element";

@ACTRule
class QW_ACT_R20 extends Rule {

  constructor(rule?: any) {
    super(rule);
  }

  @ElementExists
  execute(element: QWElement): void {

    const evaluation: ACTRuleResult = {
      verdict: '',
      description: '',
      resultCode: ''
    };

    const validRoleValues = ['button', 'checkbox', 'gridcell', 'link', 'menuitem', 'menuitemcheckbox', 'menuitemradio', 'option', 'progressbar', 'radio', 'scrollbar', 'searchbox', 'separator', 'slider', 'spinbutton', 'switch', 'tab', 'tabpanel', 'textbox', 'treeitem', 'combobox', 'grid', 'listbox', 'menu', 'menubar', 'radiogroup', 'tablist', 'tree', 'treegrid', 'application', 'article', 'cell', 'collumnheader', 'definition', 'directory', 'document', 'feed', 'figure', 'group', 'heading', 'img', 'list', 'listitem', 'math', 'none', 'note', 'presentation', 'row', 'rowgroup', 'rowheader', 'separator', 'table', 'term', 'toolbar', 'tooltip', 'banner', 'complementary', 'contentinfo', 'form', 'main', 'navigation', 'region', 'search', 'alert', 'log', 'marquee', 'status', 'timer'];
    const roleAttr = element.getElementAttribute('role');
    
    if (roleAttr) {
      const isHidden = DomUtils.isElementHidden(element);
      if (!isHidden) {
        let validRolesFound = 0;
        const roles = roleAttr.split(' ');
        for (const role of roles || []) {
          if (validRoleValues.includes(role)) {
            validRolesFound++;
          }
        }
        if (validRolesFound > 0) {
          evaluation.verdict = 'passed';
          evaluation.description = `The test target has a valid \`role\` attribute.`;
          evaluation.resultCode = 'RC1';
        } else {
          evaluation.verdict = 'failed';
          evaluation.description = `The test target has an invalid \`role\` attribute.`;
          evaluation.resultCode = 'RC2';
        }
      } else {
        evaluation.verdict = 'inapplicable';
        evaluation.description = `The test target is not included in the accessibility tree.`;
        evaluation.resultCode = 'RC3';
      }
    } else {
      evaluation.verdict = 'inapplicable';
      evaluation.description = `The \`role\` attribute doesn't exits or is empty ("").`;
      evaluation.resultCode = 'RC4';
    }

    super.addEvaluationResult(evaluation, element);
  }
}

export = QW_ACT_R20;
