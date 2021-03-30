import { ACTRule } from '@qualweb/act-rules';
import AtomicRule from '../lib/AtomicRule.object';
import { ACTRuleDecorator, ElementExists } from '../lib/decorator';
import Test from '../lib/Test.object';

@ACTRuleDecorator
class QW_ACT_R62 extends AtomicRule {
  constructor(rule: ACTRule) {
    super(rule);
  }

  @ElementExists
  execute(element: typeof window.qwElement): void {
    const elementList = element.getElements('*');
    const inSequentialFocusList = elementList.filter((element) => {
      return window.AccessibilityUtils.isPartOfSequentialFocusNavigation(element);
    });

    if (inSequentialFocusList.length > 1) {
      for (const inSequentialFocusElement of inSequentialFocusList ?? []) {
        const test = new Test();

        test.verdict = 'warning';
        test.description = ' Check if the element has some visible focus indication';
        test.resultCode = 'RC1';

        test.addElement(inSequentialFocusElement);
        super.addTestResult(test);
      }
    }
  }
}

export = QW_ACT_R62;
