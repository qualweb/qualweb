import { ACTRule } from '@qualweb/act-rules';
import AtomicRule from '../lib/AtomicRule.object';
import { ACTRuleDecorator, ElementExists } from '../lib/decorator';
import Test from '../lib/Test.object';

@ACTRuleDecorator
class QW_ACT_R27 extends AtomicRule {
  constructor(rule: ACTRule) {
    super(rule);
  }

  @ElementExists
  execute(element: typeof window.qwElement): void {
    const ariaJSON = window.AccessibilityUtils.ariaAttributesRoles;
    const allElements = element.getElements('*');
    for (const elem of allElements ?? []) {
      const test = new Test();

      let countAria = 0;
      let failedAria = '';
      const elemAttribs = elem.getElementAttributesName();
      for (const attrib of elemAttribs || []) {
        if (attrib.startsWith('aria-')) {
          countAria++;
          if (!Object.keys(ariaJSON).includes(attrib)) {
            failedAria = failedAria.concat(', ', attrib);
          }
        }
      }

      if (failedAria.length) {
        test.verdict = 'failed';
        test.description = 'The following aria-* attributes are not defined in ARIA 1.1: ' + failedAria;
        test.resultCode = 'RC1';
      } else if (countAria) {
        test.verdict = 'passed';
        test.description = 'All aria-* attributes in this element are defined in ARIA 1.1';
        test.resultCode = 'RC2';
      } else {
        continue;
      }

      test.addElement(elem);
      super.addTestResult(test);
    }
  }
}

export = QW_ACT_R27;
