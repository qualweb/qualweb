import type { QWElement } from '@qualweb/qw-element';
import { ElementExists, ElementIsInAccessibilityTree } from '@qualweb/util/applicability';
import { Test, Verdict } from '@qualweb/core/evaluation';
import { AtomicRule } from '../lib/AtomicRule.object';

// Semantic roles that make a form field applicable to this rule.
const applicableRoles = [
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
];

// Input types that have no semantic role but still require an accessible name.
const applicableInputTypes = [
  'color',
  'date',
  'datetime-local',
  'file',
  'month',
  'password',
  'time',
  'week'
];

class QW_ACT_R16 extends AtomicRule {
  @ElementExists
  @ElementIsInAccessibilityTree
  execute(element: QWElement): void {
    const role = window.AccessibilityUtils.getElementRole(element);

    // Applicable if the element has one of the applicable semantic roles, or if
    // it is an input with no semantic role and one of the applicable types.
    const applicableByRole = !!role && applicableRoles.includes(role);
    const applicableByInputType =
      !role &&
      element.getElementTagName() === 'input' &&
      applicableInputTypes.includes((element.getElementAttribute('type') ?? '').toLowerCase());

    if (!applicableByRole && !applicableByInputType) {
      return;
    }

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
