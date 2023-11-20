import { ACTRule } from '@qualweb/act-rules';
import { Translate } from '@qualweb/locale';
import AtomicRule from '../lib/AtomicRule.object';
import { ACTRuleDecorator, ElementExists, isInMainContext } from '../lib/decorator';
import Test from '../lib/Test.object';

@ACTRuleDecorator
class QW_ACT_R10 extends AtomicRule {
  constructor(rule: ACTRule, locale: Translate) {
    super(rule, locale);
  }

  @ElementExists
  @isInMainContext
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

      const elements = new Array<typeof window.qwElement>();

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
            test.verdict = 'passed';
            test.resultCode = 'P1';
          } else {
            test.verdict = 'warning';
            test.resultCode = 'F1';
          }

          test.addElements(elements);
          super.addTestResult(test);
        }
      }
      counter++;
    }
  }

  private getContentHash(elements: Array<typeof window.qwElement>): Array<string> {
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
export = QW_ACT_R10;
