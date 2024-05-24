import type { QWElement } from '@packages/qw-element/src';
import { ElementExists, IsInMainContext } from '@shared/applicability';
import { Test } from '@shared/classes';
import { Verdict } from '@shared/types';
import { AtomicRule } from '../lib/AtomicRule.object';

class QW_ACT_R10 extends AtomicRule {
  @ElementExists
  @IsInMainContext
  execute(): void {
    const iframes = window.qwPage.getElements('iframe');
    const accessibleNames = new Array<string>();

    // add iframe contents
    for (const link of iframes ?? []) {
      if (window.AccessibilityUtils.isElementInAT(link)) {
        const aName = window.AccessibilityUtils.getAccessibleName(link);
        if (aName) {
          accessibleNames.push(aName);
        }
      }
    }

    let counter = 0;
    const blacklist = new Array<number>();
    for (const accessibleName of accessibleNames ?? []) {
      const test = new Test();

      const elements = new Array<QWElement>();

      if (blacklist.indexOf(counter) >= 0) {
        //element already evaluated
      } else if (accessibleName && accessibleName.trim() !== '') {
        const hasEqualAn = this.isInListExceptIndex(accessibleName, accessibleNames, counter);
        if (hasEqualAn.length > 0) {
          blacklist.push(...hasEqualAn);
          hasEqualAn.push(counter);

          for (const index of hasEqualAn ?? []) {
            elements.push(iframes[index]);
          }
          const hashArray = this.getContentHash(elements);
          const firstHash = hashArray.pop();
          let result = true;
          for (const hash of hashArray ?? []) {
            if (!firstHash || !hashArray || hash !== firstHash) {
              result = false;
            }
          }
          if (result && hashArray.length !== 0) {
            //passed
            test.verdict = Verdict.PASSED;
            test.resultCode = 'P1';
          } else {
            test.verdict = Verdict.WARNING;
            test.resultCode = 'F1';
          }

          test.addElements(elements);
          this.addTestResult(test);
        }
      }
      counter++;
    }
  }

  private getContentHash(elements: Array<QWElement>): Array<string> {
    const content = new Array<string>();
    try {
      for (const element of elements ?? []) {
        const htmlContent = element.getContentFrame();
        if (htmlContent !== null && htmlContent.defaultView) {
          content.push(htmlContent.documentElement.outerHTML);
        }
      }
    } catch (e) {}

    return content;
  }

  private isInListExceptIndex(accessibleName: string, accessibleNames: Array<string>, index: number): Array<number> {
    const result = new Array<number>();
    let counter = 0;

    for (const accessibleNameToCompare of accessibleNames ?? []) {
      if (accessibleNameToCompare === accessibleName && counter !== index) {
        result.push(counter);
      }
      counter++;
    }

    return result;
  }
}
export { QW_ACT_R10 };
