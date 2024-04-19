import { WCAGTechnique } from '@qualweb/wcag-techniques';
import Technique from '../lib/Technique.object';
import { WCAGTechniqueClass, ElementExists } from '../lib/applicability';
import Test from '../lib/Test.object';
import { Translate } from '@qualweb/locale';

@WCAGTechniqueClass
class QW_WCAG_T35 extends Technique {
  private readonly idMap: Map<string, boolean>;

  constructor(technique: WCAGTechnique, locale: Translate) {
    super(technique, locale);
    this.idMap = new Map<string, boolean>();
  }

  @ElementExists
  execute(element: typeof window.qwElement): void {
    const test = new Test();

    const id = element.getElementAttribute('id');
    //console.log('id ', id);

    if (id && !this.idMap.get(id)) {
      //console.log('no if');
      try {
        const elementsWithSameId = window.qwPage.getElements(`[id="${id}"]`, element);

        if (elementsWithSameId.length > 1) {
          test.verdict = 'failed';
          test.resultCode = 'F1';
        } else {
          test.verdict = 'passed';
          test.resultCode = 'P1';
        }

        test.addElements(elementsWithSameId);
        //console.log('test ', test);
        super.addTestResult(test);
      } catch {}
      this.idMap.set(id, true);
    }
  }
}

export = QW_WCAG_T35;
