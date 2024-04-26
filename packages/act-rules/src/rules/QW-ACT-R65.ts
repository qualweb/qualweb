import type { QWElement } from '@qualweb/qw-element';
import { ElementExists, ElementHasOneOfTheFollowingRoles } from '@shared/applicability';
import { Test } from '@shared/classes';
import { AtomicRule } from '../lib/AtomicRule.object';

class QW_ACT_R65 extends AtomicRule {
  @ElementExists
  @ElementHasOneOfTheFollowingRoles([
    'button',
    'checkbox',
    'img',
    'math',
    'menuitemcheckbox',
    'menuitemradio',
    'option',
    'progressbar',
    'radio',
    'scrollbar',
    'separator',
    'slider',
    'switch',
    'tab'
  ])
  execute(element: QWElement): void {
    // Without ShadowDom or iframes
    const elementList = element.getElements('*');
    const inSequentialFocusList = elementList.filter((element) => {
      return window.AccessibilityUtils.isPartOfSequentialFocusNavigation(element);
    });

    const test = new Test();

    if (inSequentialFocusList.length === 0) {
      test.verdict = 'passed';
      test.resultCode = 'P1';
      test.addElement(element);
    } else {
      test.verdict = 'failed';
      test.resultCode = 'F1';
      test.addElement(element, false);
    }

    this.addTestResult(test);
  }
}

export { QW_ACT_R65 };
