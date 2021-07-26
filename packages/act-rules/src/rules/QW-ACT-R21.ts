import { ACTRule } from '@qualweb/act-rules';
import { Translate } from '@qualweb/locale';
import AtomicRule from '../lib/AtomicRule.object';
import { ACTRuleDecorator, ElementExists, ElementIsNotHidden } from '../lib/decorator';
import Test from '../lib/Test.object';

@ACTRuleDecorator
class QW_ACT_R21 extends AtomicRule {
  private readonly roleList = ['img', 'graphics-document', 'graphics-symbol'];

  constructor(rule: ACTRule, locale: Translate) {
    super(rule, locale);
  }

  @ElementExists
  @ElementIsNotHidden
  execute(element: typeof window.qwElement): void {
    const elementsToEvaluate = element.getElements('svg *');
    elementsToEvaluate.push(element);

    for (const elem of elementsToEvaluate ?? []) {
      const test = new Test();

      const role = elem.getElementAttribute('role');
      if (role && this.roleList.includes(role)) {
        const accessibleName = window.AccessibilityUtils.getAccessibleNameSVG(elem);
        if (accessibleName && accessibleName.trim() !== '') {
          test.verdict = 'passed';
          test.resultCode = 'P1';
        } else {
          test.verdict = 'failed';
          test.resultCode = 'F1';
        }

        test.addElement(elem, true, false, true);
        super.addTestResult(test);
      }
    }
  }
}

export = QW_ACT_R21;
