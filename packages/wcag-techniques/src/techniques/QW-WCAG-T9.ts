import { WCAGTechnique } from '@qualweb/wcag-techniques';
import Technique from '../lib/Technique.object';
import { WCAGTechniqueClass, ElementExists } from '../lib/applicability';
import Test from '../lib/Test.object';
import { Translate } from '@qualweb/locale';

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
    const headingObjectList = [];
    for (const heading of headingList) {
      const tagName = heading.getElementTagName();
      let level;
      if (tagName.includes('h')) {
        level = +tagName.replace('h', '');
      } else {
        level = 2; //TODO
      }
      const selector = heading.getElementSelector();
      headingObjectList.push({ level, selector });
    }
    const hasH1 = window.qwPage.getElements('h1').length > 0;
    const orderderByPage = [...headingObjectList].sort((a: any, b: any) => {
      const selectorElementsA = a.selector.split('>');
      const selectorElementsB = b.selector.split('>');
      const selectorElementsNA = selectorElementsA.length;
      const selectorElementsNB = selectorElementsB.length;
      let compareElementA, compareElementB;
      if (selectorElementsNA > selectorElementsNB) {
        compareElementA = selectorElementsA[selectorElementsNB - 1];
        compareElementB = selectorElementsB[selectorElementsNB - 1];
      } else {
        compareElementA = selectorElementsA[selectorElementsNA - 1];
        compareElementB = selectorElementsB[selectorElementsNA - 1];
      }

      const compareNumberA = +compareElementA.replace(/[a-z]\d|\D/g, '');
      const compareNumberB = +compareElementB.replace(/[a-z]\d|\D/g, '');
      return compareNumberB - compareNumberA;
    });
    let correctOrder = true;
    for (const [i, element] of orderderByPage.entries()) {
      const nextIndex = i + 1;
      if (nextIndex < orderderByPage.length) {
        const level = element.level;
        const nextElement = orderderByPage[nextIndex];
        const nextLevel = nextElement.level;
        const levelDif = Math.abs(level - nextLevel);
        console.log(levelDif)
        correctOrder = correctOrder && levelDif <= 1;
      }
    }
    const test = new Test();

    if (!correctOrder) {
      // fails if the headings aren't in the correct order
      test.verdict = 'failed';
      test.resultCode = 'F1';
    } else if (!hasH1) {
      test.verdict = 'failed';
      test.resultCode = 'F2';
    } else {
      // the heading elements are correctly used
      test.verdict = 'warning';
      test.resultCode = 'W1';
    }

    test.addElement(element);
    super.addTestResult(test);
  }
}

export = QW_WCAG_T9;
