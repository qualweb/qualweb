import { CUICheck } from '@qualweb/cui-checks';
import { Translate } from '@qualweb/locale';
import { CUICheckDecorator } from '../lib/decorator';
import Test from '../lib/Test.object';
import Check from '../lib/Check.object';

@CUICheckDecorator
class QW_CUI_C1 extends Check {
  constructor(rule: CUICheck, locale: Translate) {
    super(rule, locale);
  }

  execute(element: typeof window.qwElement | undefined): void {
    console.log(element);
    const test = new Test();
    test.verdict = 'warning';
    test.resultCode = 'W1';
    super.addTestResult(test);
  }
}

export = QW_CUI_C1;
