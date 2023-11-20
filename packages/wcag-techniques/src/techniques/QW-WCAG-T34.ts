import { WCAGTechnique } from '@qualweb/wcag-techniques';
import Technique from '../lib/Technique.object';
import { WCAGTechniqueClass, ElementExists } from '../lib/applicability';
import Test from '../lib/Test.object';
import { Translate } from '@qualweb/locale';

@WCAGTechniqueClass
class QW_WCAG_T34 extends Technique {
  constructor(technique: WCAGTechnique, locale: Translate) {
    super(technique, locale);
  }

  @ElementExists
  execute(element: typeof window.qwElement): void {
    const test = new Test();
    const correctElemments = this.onlyCorrectElementTypes(element);
    const dtToDDOrder = this.checkDtToDDOrder(element);

    if (!correctElemments) {
      test.verdict = 'failed';
      test.resultCode = 'F1';
    } else if (!dtToDDOrder) {
      test.verdict = 'failed';
      test.resultCode = 'F2';
    } else {
      test.verdict = 'passed';
      test.resultCode = 'P1';
    }
    test.addElement(element);
    super.addTestResult(test);
  }
  onlyCorrectElementTypes(element: typeof window.qwElement) {
    const children = element.getElementChildren();
    return children.reduce((acc, element) => {
      const name = element.getElementTagName();
      return acc && ['dt', 'dd', 'script', 'template', 'div'].includes(name);
    }, true);
  }
  checkDtToDDOrder(element: typeof window.qwElement) {
    const dList = element.getElements('dt,dd');
    return dList.reduce((acc, element) => {
      const tagName = element.getElementTagName();
      let result;
      if (tagName === 'dt') {
        result = this.hasDD(element);
      } else {
        result = this.hasDT(element);
      }
      return acc && result;
    }, true);
  }
  hasDD(element: typeof window.qwElement): boolean {
    const nextSibling = element.getElementNextSibling();
    let result;
    if (!nextSibling) {
      result = false;
    } else if (nextSibling.getElementTagName() === 'dd') {
      result = true;
    } else {
      result = this.hasDD(nextSibling);
    }
    return result;
  }

  hasDT(element: typeof window.qwElement): boolean {
    const previousSibling = element.getElementPreviousSibling();
    let result;
    if (!previousSibling) {
      result = false;
    } else if (previousSibling.getElementTagName() === 'dt') {
      result = true;
    } else {
      result = this.hasDT(previousSibling);
    }
    return result;
  }
}

export = QW_WCAG_T34;
