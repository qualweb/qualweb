import type { QWElement } from '@packages/qw-element/src';
import { ElementExists } from '@shared/applicability';
import { Test } from '@shared/classes';
import { Verdict } from '@shared/types';
import { AtomicRule } from '../lib/AtomicRule.object';

class QW_ACT_R27 extends AtomicRule {
  @ElementExists
  execute(element: QWElement): void {
    const ariaJSON = window.AccessibilityUtils.ariaAttributesRoles;
    const allElements = element.getElements('*');
    for (const elem of allElements ?? []) {
      const test = new Test();

      let countAria = 0;
      let failedAria = '';
      const elemAttribs = elem.getElementAttributesName();
      for (const attrib of elemAttribs || []) {
        if (attrib.startsWith('aria-')) {
          countAria++;
          if (!Object.keys(ariaJSON).includes(attrib)) {
            failedAria = failedAria.concat(', ', attrib);
          }
        }
      }

      if (failedAria.length) {
        test.verdict = Verdict.FAILED;
        test.resultCode = 'F1';
      } else if (countAria) {
        test.verdict = Verdict.PASSED;
        test.resultCode = 'P1';
      } else {
        continue;
      }

      test.addElement(elem);
      this.addTestResult(test);
    }
  }
}

export { QW_ACT_R27 };
