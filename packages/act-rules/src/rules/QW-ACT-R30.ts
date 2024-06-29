import type { QWElement } from '@qualweb/qw-element';
import { ElementAllowsNameFromContent, ElementExists, ElementIsVisible, ElementIsWidget } from '@qualweb/common';
import { Test } from '@qualweb/common';
import { Verdict } from '@qualweb/common';
import { AtomicRule } from '../lib/AtomicRule.object';

class QW_ACT_R30 extends AtomicRule {
  @ElementExists
  @ElementIsVisible
  @ElementIsWidget
  @ElementAllowsNameFromContent
  execute(element: QWElement): void {
    const test = new Test();

    const accessibleName = window.AccessibilityUtils.getAccessibleName(element);
    const elementText = window.DomUtils.getTrimmedText(element);
    const isIconValue = this.isIcon(elementText, accessibleName, element);

    if (accessibleName === undefined) {
      test.verdict = Verdict.FAILED;
      test.resultCode = 'F1';
    } else if (elementText === undefined || elementText === '') {
      test.verdict = Verdict.INAPPLICABLE;
      test.resultCode = 'I1';
    } else if (!!elementText && (isIconValue || this.includesText(accessibleName, elementText))) {
      test.verdict = Verdict.PASSED;
      test.resultCode = 'P1';
    } else {
      test.verdict = Verdict.FAILED;
      test.resultCode = 'F2';
    }
    test.addElement(element, true, false, true);
    this.addTestResult(test);
  }

  //      let isIconValue = this.isIcon(elementText,accessibleName,element);
  private isIcon(elementText: string, accessibleName: string | undefined, element: QWElement): boolean {
    const iconMap = ['i', 'x'];
    const fontStyle = element.getElementStyleProperty('font-family', null);
    return !!accessibleName && (iconMap.includes(elementText.toLowerCase()) || fontStyle.includes('Material Icons'));
  }

  private includesText(accessibleName: string, elementText: string): boolean {
    accessibleName = accessibleName
      .toLowerCase()
      .trim()
      .replace(/\r?\n|\r|[^\w\s-]+/g, '')
      .replace(/s+/g, ' ');
    elementText = elementText
      .toLowerCase()
      .trim()
      .replace(/\r?\n|\r|[^\w\s-]+/g, '')
      .replace(/s+/g, ' ');
    return accessibleName.includes(elementText);
  }
}

export { QW_ACT_R30 };
