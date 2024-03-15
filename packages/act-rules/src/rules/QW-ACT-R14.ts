import type { QWElement } from '@qualweb/qw-element';
import { ElementExists, ElementHasAttribute, ElementHasAttributeValue, Test } from '@qualweb/lib';
import { AtomicRule } from '../lib/AtomicRule.object';

class QW_ACT_R14 extends AtomicRule {

  @ElementExists
  @ElementHasAttribute('content')
  @ElementHasAttributeValue('name', 'viewport')
  execute(element: QWElement): void {
    const test = new Test();

    const content = <string>element.getElementAttribute('content');
    let maximumScale = '';
    let userScalable = '';
    const contentValues = content.split(',');

    if (contentValues[0].trim().length > 0) {
      for (const valueItem of contentValues ?? []) {
        const value = valueItem.trim().split('=');
        if (value[0] === 'maximum-scale') {
          maximumScale = value[1];
        } else if (value[0] === 'user-scalable') {
          userScalable = value[1];
        }
      }
    }

    if (!maximumScale && !userScalable) {
      test.verdict = 'inapplicable';
      test.resultCode = 'I1';
    } else if (
      !maximumScale &&
      (!userScalable ||
        userScalable === 'yes' ||
        userScalable === 'device-width' ||
        userScalable === 'device-height' ||
        parseInt(userScalable) < -1 ||
        parseInt(userScalable) > 1)
    ) {
      test.verdict = 'passed';
      test.resultCode = 'P1';
    } else if (
      !userScalable &&
      (!maximumScale ||
        maximumScale === 'device-width' ||
        maximumScale === 'device-height' ||
        parseInt(maximumScale) < 0 ||
        parseInt(maximumScale) >= 2)
    ) {
      test.verdict = 'passed';
      test.resultCode = 'P2';
    } else {
      test.verdict = 'failed';
      test.resultCode = 'F1';
    }

    test.addElement(element);
    this.addTestResult(test);
  }
}

export { QW_ACT_R14 };
