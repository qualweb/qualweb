import { ACTRule } from '@qualweb/act-rules';
import AtomicRule from '../lib/AtomicRule.object';
import {
  ACTRuleDecorator,
  ElementAllowsNameFromContent,
  ElementExists,
  ElementIsVisible,
  ElementIsWidget
} from '../lib/decorator';
import Test from '../lib/Test.object';

@ACTRuleDecorator
class QW_ACT_R30 extends AtomicRule {
  constructor(rule: ACTRule) {
    super(rule);
  }

  @ElementExists
  @ElementIsVisible
  @ElementIsWidget
  @ElementAllowsNameFromContent
  execute(element: typeof window.qwElement): void {
    const test = new Test();

    const accessibleName = window.AccessibilityUtils.getAccessibleName(element);
    const elementText = window.DomUtils.getTrimmedText(element);
    const hasTextNode = element.elementHasTextNode();
    const isIconValue = this.isIcon(elementText, accessibleName, element);

    if (accessibleName === undefined) {
      test.verdict = 'failed';
      test.description = `The test target doesn't have an accessible name.`;
      test.resultCode = 'RC2';
    } else if (
      !hasTextNode ||
      elementText === undefined ||
      elementText === '' ||
      (elementText && !this.isHumanLanguage(elementText) && !isIconValue)
    ) {
      // CHANGE: remove return and refactor code
      return;
    } else if (
      !!elementText &&
      (isIconValue || accessibleName.toLowerCase().trim().includes(elementText.toLowerCase()))
    ) {
      test.verdict = 'passed';
      test.description = `The complete visible text content of the test target either matches or is contained within its accessible name.`;
      test.resultCode = 'RC1';
    } else {
      test.verdict = 'failed';
      test.description = `The complete visible text content of the test target neither matches or is contained within its accessible name.`;
      test.resultCode = 'RC3';
    }

    test.addElement(element, true, false, true)
    super.addTestResult(test);
  }

  //      let isIconValue = this.isIcon(elementText,accessibleName,element);
  private isIcon(elementText: string, accessibleName: string | undefined, element: typeof window.qwElement): boolean {
    const iconMap = ['i', 'x'];
    const fontStyle = element.getElementStyleProperty('font-family', null);
    return !!accessibleName && (iconMap.includes(elementText.toLowerCase()) || fontStyle.includes('Material Icons'));
  }

  private isHumanLanguage(text: string): boolean {
    return window.DomUtils.isHumanLanguage(text);
  }
}

export = QW_ACT_R30;
