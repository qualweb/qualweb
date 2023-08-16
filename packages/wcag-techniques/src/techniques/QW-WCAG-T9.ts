import { WCAGTechnique } from '@qualweb/wcag-techniques';
import Technique from '../lib/Technique.object';
import { WCAGTechniqueClass, ElementExists } from '../lib/applicability';
import Test from '../lib/Test.object';
import { Translate } from '@qualweb/locale';
import { QWElement } from '@qualweb/qw-element';

@WCAGTechniqueClass
class QW_WCAG_T9 extends Technique {
  constructor(technique: WCAGTechnique, locale: Translate) {
    super(technique, locale);
  }

  @ElementExists
  execute(element: typeof window.qwElement): void {
    const headingList = window.qwPage.getElements('h1, h2, h3, h4, h5, h6, [role="heading"]');
    if (headingList.length === 0) {
      return;
    }
    console.log(headingList);
    const headingObjectList = [];
    for (const heading of headingList) {
      const tagName = heading.getElementTagName();
      let level;
      if (tagName.includes('h')) {
        level = +tagName.replace('h', '');
      } else {
        const ariaLevel = heading.getElementAttribute('aria-level');
        level = ariaLevel ? +ariaLevel : 1;
      }
      const selector = heading.getElementSelector();
      headingObjectList.push({ level, selector, heading });
    }
    const orderderByPage = this.orderByPage(headingObjectList);
    console.log(orderderByPage);
    const orderErrors = [];
    for (const [i, element] of orderderByPage.entries()) {
      const nextIndex = i + 1;
      if (nextIndex < orderderByPage.length) {
        const level = element.level;
        const nextElement = orderderByPage[nextIndex];
        const nextLevel = nextElement.level;
        const levelDif = Math.abs(level - nextLevel);
        if (levelDif > 1) orderErrors.push(element.heading);
      }
    }
    const test = new Test();

    if (orderErrors.length === 0) {
      // the heading elements are correctly used
      test.verdict = 'warning';
      test.resultCode = 'W1';
      test.addElement(element);
      super.addTestResult(test);
    } else {
      for (const error of orderErrors) {
        test.verdict = 'failed';
        test.resultCode = 'F1';
        test.addElement(error);
        super.addTestResult(test);
      }
    }
  }

  private orderByPage(headingObjectList: { level: number; selector: string; heading: QWElement }[]) {
    return [...headingObjectList].sort((a: any, b: any) => {
      const selectorElementsA = a.selector.split('>');
      const selectorElementsB = b.selector.split('>');
      console.log(selectorElementsA);
      let i = 0;
      let found = false;
      while (i < selectorElementsA.length && i < selectorElementsB.length && !found) {
        i++;
        found = selectorElementsA[i] !== selectorElementsB[i];
      }
      const compareElementA = selectorElementsA[i];
      const compareElementB = selectorElementsB[i];

      const compareNumberA = +compareElementA.replace(/[a-z]\d|\D/g, '');
      const compareNumberB = +compareElementB.replace(/[a-z]\d|\D/g, '');
      return compareNumberB - compareNumberA;
    });
  }
}

export = QW_WCAG_T9;
