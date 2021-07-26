import { ACTRule } from '@qualweb/act-rules';
import { Translate } from '@qualweb/locale';
import AtomicRule from '../lib/AtomicRule.object';
import { ACTRuleDecorator, ElementExists, ElementHasAttribute, ElementHasAttributeValue } from '../lib/decorator';
import Test from '../lib/Test.object';

@ACTRuleDecorator
class QW_ACT_R14 extends AtomicRule {
  constructor(rule: ACTRule, locale: Translate) {
    super(rule, locale);
  }

  @ElementExists
  @ElementHasAttribute('content')
  @ElementHasAttributeValue('name', 'viewport')
  execute(element: typeof window.qwElement): void {
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

    if ((!maximumScale || parseInt(maximumScale) < 0) && !userScalable) {
      test.verdict = 'passed';
      test.resultCode = 'P1';
    } else if (userScalable === 'no' || maximumScale == 'yes' || parseFloat(maximumScale) < 2) {
      test.verdict = 'failed';
      test.resultCode = 'F1';
    } else {
      test.verdict = 'passed';
      test.resultCode = 'P2';
    }

    test.addElement(element);
    super.addTestResult(test);
  }
}

export = QW_ACT_R14;
