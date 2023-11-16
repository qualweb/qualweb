import { ACTRule } from '@qualweb/act-rules';
import { Translate } from '@qualweb/locale';
import AtomicRule from '../lib/AtomicRule.object';
import { ACTRuleDecorator, ElementExists, isInMainContext } from '../lib/decorator';
import Test from '../lib/Test.object';

@ACTRuleDecorator
class QW_ACT_R9 extends AtomicRule {
  constructor(rule: ACTRule, locale: Translate) {
    super(rule, locale);
  }

  @ElementExists
  @isInMainContext
  execute(): void {
    const links = window.qwPage.getElements('a[href], [role="link"]');

    const accessibleNames = new Array<string>();
    const hrefList = new Array<string | null>();
    const applicableLinks = new Array<typeof window.qwElement>();

    for (const link of links ?? []) {
      let aName;
      if (window.DomUtils.isElementADescendantOf(link, ['svg'], [])) {
        aName = window.AccessibilityUtils.getAccessibleNameSVG(link);
      } else if (window.AccessibilityUtils.isElementInAT(link)) {
        aName = window.AccessibilityUtils.getAccessibleName(link);
      }
      const href = link.getElementAttribute('href');

      if (aName) {
        hrefList.push(href);
        accessibleNames.push(aName);
        applicableLinks.push(link);
      }
    }

    let counter = 0;
    const blacklist = new Array<number>();
    for (const accessibleName of accessibleNames ?? []) {
      const elementList = new Array<typeof window.qwElement>();

      if (blacklist.indexOf(counter) < 0 && accessibleName && accessibleName !== '') {
        const hasEqualAn = this.isInListExceptIndex(accessibleName, accessibleNames, counter);

        if (hasEqualAn.length > 0) {
          blacklist.push(...hasEqualAn);
          let hasEqualHref = true;
          for (const index of hasEqualAn) {
            hasEqualHref = hrefList[index] === hrefList[counter] && hrefList[counter] !== null;
            elementList.push(applicableLinks[index]);
          }
          elementList.push(applicableLinks[counter]);
          hasEqualAn.push(counter);

          const test = new Test();

          if (hasEqualHref) {
            test.verdict = 'passed';
            test.resultCode = 'P1';
          } else {
            test.verdict = 'warning';
            test.resultCode = 'F1';
          }

          test.addElements(elementList, true, false, true);
          super.addTestResult(test);
        }
      }
      counter++;
    }
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

export = QW_ACT_R9;
