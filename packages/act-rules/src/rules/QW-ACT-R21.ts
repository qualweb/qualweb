import { ACTRule } from '@qualweb/act-rules';
import AtomicRule from '../lib/AtomicRule.object';
import { ACTRuleDecorator, ElementExists } from '../lib/decorator';
import Test from '../lib/Test.object';

@ACTRuleDecorator
class QW_ACT_R21 extends AtomicRule {
  constructor(rule: ACTRule) {
    super(rule);
  }

  @ElementExists
  execute(element: typeof window.qwElement): void {
    const roleList = ['img', 'graphics-document', 'graphics-symbol'];

    const elementsToEvaluate = element.getElements('svg *');
    elementsToEvaluate.push(element);

    for (const elem of elementsToEvaluate ?? []) {
      const test = new Test();

      const role = elem.getElementAttribute('role');
      const isHidden = window.DomUtils.isElementHidden(elem);
      const accessibleName = window.AccessibilityUtils.getAccessibleNameSVG(elem);

      if (role && (role && roleList.indexOf(role) >= 0) && !isHidden && accessibleName?.trim()) {
        test.verdict = 'passed';
        test.description = `The test target has an accessible name.`;
        test.resultCode = 'RC2';
      } else {
        test.verdict = 'failed';
        test.description = `The test target doesn't have an accessible name.`;
        test.resultCode = 'RC3';
      } 

      test.addElement(elem, true, false, true);
      super.addTestResult(test);
    }
  }
}

export = QW_ACT_R21;
