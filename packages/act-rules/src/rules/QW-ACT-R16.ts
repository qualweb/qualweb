import type { QWElement } from '@qualweb/qw-element';
import { ElementExists, ElementHasOneOfTheFollowingRoles, ElementIsInAccessibilityTree } from '@qualweb/util/applicability';
import { Test, Verdict } from '@qualweb/core/evaluation';
import { AtomicRule } from '../lib/AtomicRule.object';

class QW_ACT_R16 extends AtomicRule {
  @ElementExists
  @ElementHasOneOfTheFollowingRoles([
    'checkbox',
    'combobox',
    'listbox',
    'menuitemcheckbox',
    'menuitemradio',
    'radio',
    'searchbox',
    'slider',
    'spinbutton',
    'switch',
    'textbox'
  ])
  @ElementIsInAccessibilityTree
  execute(element: QWElement): void {
    const test = new Test();

    const accessibleName = window.AccessibilityUtils.getAccessibleName(element);
    if (accessibleName && accessibleName.trim() !== '') {
      test.verdict = Verdict.PASSED;
      test.resultCode = 'P1';
    } else {
      test.verdict = Verdict.FAILED;
      test.resultCode = 'F1';
    }

    test.addElement(element, true, false, true);
    this.addTestResult(test);
  }
}

export { QW_ACT_R16 };
