import { WCAGTechnique } from '@qualweb/wcag-techniques';
import Technique from '../lib/Technique.object';
import { WCAGTechniqueClass, ElementExists } from '../lib/applicability';
import Test from '../lib/Test.object';
import { Translate } from '@qualweb/locale';

@WCAGTechniqueClass
class QW_WCAG_T33 extends Technique {
  constructor(technique: WCAGTechnique, locale: Translate) {
    super(technique, locale);
  }

  @ElementExists
  execute(element: typeof window.qwElement): void {
    const test = new Test();
    const parent = this.getCorrectParent(element);
    let isValidParent = false;
    if (parent) {
      const parentRole = window.AccessibilityUtils.getElementRole(parent);
      const parentName = parent.getElementTagName();

      if (
        parentName === 'dl' &&
        ((parentRole && ['presentation', 'none', 'list'].includes(parentRole)) || !parentRole)
      ) {
        isValidParent = true;
      }
    }
    if (isValidParent) {
      test.verdict = 'passed';
      test.resultCode = 'P1';
    } else {
      test.verdict = 'failed';
      test.resultCode = 'F1';
    }
    test.addElement(element);
    super.addTestResult(test);
  }
  getCorrectParent(element: typeof window.qwElement) {
    let parent = element.getElementParent();
    if (parent) {
      const parentRole = window.AccessibilityUtils.getElementRole(parent);
      const parentName = parent.getElementTagName();
      if (parentName === 'div' && ['presentation', 'none', null].includes(parentRole))
        parent = parent.getElementParent();
    }
    return parent;
  }
}

export = QW_WCAG_T33;
