import { ACTRule } from '@qualweb/act-rules';
import { Translate } from '@qualweb/locale';
import AtomicRule from '../lib/AtomicRule.object';
import { ACTRuleDecorator, ElementExists, ElementHasAttribute, ElementHasNonEmptyAttribute } from '../lib/decorator';
import Test from '../lib/Test.object';

@ACTRuleDecorator
class QW_ACT_R4 extends AtomicRule {
  constructor(rule: ACTRule, locale: Translate) {
    super(rule, locale);
  }

  @ElementExists
  @ElementHasAttribute('content')
  @ElementHasNonEmptyAttribute('content')
  @ElementHasAttribute('http-equiv')
  @ElementHasNonEmptyAttribute('http-equiv')
  execute(element: typeof window.qwElement): void {
    const content = <string>element.getElementAttribute('content');

    if (super.getNumberOfPassedResults() + super.getNumberOfFailedResults() > 0) {
      // only one meta needs to pass or fail, others will be discarded
      return;
    }

    let n = -1;

    const indexOf = content.indexOf(';');
    if (indexOf === -1) {
      // If it's a refresh
      if (this.checkIfIsNumber(content) && Number.isInteger(parseInt(content, 0))) {
        n = Number(content);
      }
    } else {
      // If it's a redirect
      const split = content.split(';');

      if (
        split.length === 2 &&
        split[0].trim() !== '' &&
        split[1].trim() !== '' &&
        this.checkIfIsNumber(split[0]) &&
        Number.isInteger(parseInt(split[0], 0))
      ) {
        n = Number(split[0]);
      }
    }

    if (n >= 0) {
      const test = new Test();

      if (n === 0) {
        // passes because the time is 0
        test.verdict = 'passed';
        test.resultCode = 'P1';
      } else if (n > 72000) {
        // passes because the time is bigger than 72000
        test.verdict = 'passed';
        test.resultCode = 'P2';
      } else {
        // fails because the time is in between 0 and 72000
        test.verdict = 'failed';

        if (indexOf === -1) {
          test.description = super.getTranslation('F1', { seconds: n });
          test.resultCode = 'F1';
        } else {
          test.description = super.getTranslation('F2', { seconds: n });
          test.resultCode = 'F2';
        }
      }

      test.addElement(element);
      super.addTestResult(test);
    }
  }

  private checkIfIsNumber(num: string): boolean {
    let success = true;
    for (const n of num || []) {
      if (isNaN(parseInt(n, 0))) {
        success = false;
        break;
      }
    }

    return success;
  }
}

export = QW_ACT_R4;
