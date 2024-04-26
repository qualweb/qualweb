import type { QWElement } from '@qualweb/qw-element';
import { ElementExists, ElementHasOneOfTheFollowingRoles } from '@shared/applicability';
import { Test } from '@shared/classes';
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
    const test = new Test('warning', undefined, 'W1');
    test.addElement(element);
    this.addTestResult(test);
  }
}

export { QW_ACT_R41 };
