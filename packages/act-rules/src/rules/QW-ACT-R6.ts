import type { QWElement } from '@qualweb/qw-element';
import { ElementExists, IsHTMLDocument, ElementIsInAccessibilityTree, Test } from '@qualweb/lib';
import { AtomicRule } from '../lib/AtomicRule.object';

class QW_ACT_R6 extends AtomicRule {
  
  @ElementExists
  @IsHTMLDocument
  @ElementIsInAccessibilityTree
  execute(element: QWElement): void {
    const accessibleName = window.AccessibilityUtils.getAccessibleName(element);

    const test = new Test();

    if (accessibleName && accessibleName.trim() !== '') {
      test.verdict = 'passed';
      test.resultCode = 'P1';
    } else {
      test.verdict = 'failed';
      test.resultCode = 'F1';
    }

    test.addElement(element, true, false, true);
    this.addTestResult(test);
  }
}

export { QW_ACT_R6 };
