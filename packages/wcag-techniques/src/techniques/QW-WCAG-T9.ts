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
    if (window.qwPage.getElements('h1, h2, h3, h4, h5, h6, [role="heading"]').length === 0) {
      return;
    }

    let equal = true;
    let complete = true;
    //let errorElem = element;
    const hasH1 = window.qwPage.getElements('h1').length > 0;
    let counter = 0;
    const htmlList = window.qwPage.getElements('body, body *');

    while (equal && complete && hasH1 && counter < htmlList.length) {
      const elem = htmlList[counter];

      const regexp = new RegExp('^h[1-6]$');
      const list = new Array<number>();

      for (const child of elem.getElementChildren() || []) {
        const name = child.getElementTagName();
        if (name && regexp.test(name)) {
          const split = name.split('h');
          list.push(parseInt(split[1]));
        }
      }

      if (list.length !== 0) {
        const sortedArray = list.sort((n1, n2) => n1 - n2);

        for (let i = 0; i < list.length; i++) {
          if (list[i] !== sortedArray[i]) {
            equal = false;
            //errorElem = elem;
          }
          if (i > 0 && i - 1 < list.length && sortedArray[i] - sortedArray[i - 1] > 1) {
            complete = false;
            //errorElem = elem;
          }
        }
      }
      counter++;
    }

    const test = new Test();

    if (!equal) {
      // fails if the headings aren't in the correct order
      test.verdict = 'failed';
      test.resultCode = 'F1';
    } else if (!complete) {
      // fails if a header number is missing
      test.verdict = 'failed';
      test.resultCode = 'F2';
    } else if (!hasH1) {
      test.verdict = 'failed';
      test.resultCode = 'F3';
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
