import type { QWElement } from '@qualweb/qw-element';
import { ElementExists, ElementHasAccessibleName, ElementHasAttributes } from '@qualweb/common';
import { Test } from '@qualweb/common';
import { Verdict } from '@qualweb/common';
import { Technique } from '../lib/Technique.object';

class QW_WCAG_T8 extends Technique {
  private readonly default_title = ['spacer', 'image', 'picture', 'separador', 'imagem', 'fotografia'];

  private readonly pattern = new RegExp('.+\\.(jpg|jpeg|png|gif|tiff|bmp)');
  private readonly pattern1 = new RegExp('^picture\\s[0-9]+$');
  private readonly pattern2 = new RegExp('^[0-9]+$');
  private readonly pattern3 = new RegExp('^intro#[0-9]+$');
  private readonly pattern4 = new RegExp('^imagem\\s[0-9]+$');

  @ElementExists
  @ElementHasAttributes
  @ElementHasAccessibleName
  execute(element: QWElement): void {
    const test = new Test();

    const accessibleName = (<string>window.AccessibilityUtils.getAccessibleName(element)).toLocaleLowerCase();

    if (
      !this.pattern4.test(accessibleName) &&
      !this.pattern3.test(accessibleName) &&
      !this.pattern2.test(accessibleName) &&
      !this.pattern1.test(accessibleName) &&
      !this.pattern.test(accessibleName) &&
      !this.default_title.includes(accessibleName)
    ) {
      test.verdict = Verdict.WARNING;
      test.resultCode = 'W1';
    } else {
      test.verdict = Verdict.FAILED;
      test.resultCode = 'F1';
    }

    test.addElement(element);
    this.addTestResult(test);
  }
}

export { QW_WCAG_T8 };
