import type { QWElement } from '@qualweb/qw-element';
import { ElementExists, ElementHasOneOfTheFollowingRoles } from '@qualweb/util/applicability';
import { Test, Verdict } from '@qualweb/core/evaluation';
import { AtomicRule } from '../lib/AtomicRule.object';

class QW_ACT_R41 extends AtomicRule {
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
  execute(element: QWElement): void {
    const test = new Test(Verdict.WARNING, undefined, 'W1');
    test.addElement(element);
    this.addTestResult(test);
  }
}

export { QW_ACT_R41 };
