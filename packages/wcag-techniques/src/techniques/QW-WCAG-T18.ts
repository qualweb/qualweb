import { WCAGTechnique } from '@qualweb/wcag-techniques';
import Technique from '../lib/Technique.object';
import { WCAGTechniqueClass, ElementExists } from '../lib/applicability';
import Test from '../lib/Test.object';

@WCAGTechniqueClass
class QW_WCAG_T18 extends Technique {
  constructor(technique: WCAGTechnique) {
    super(technique);
  }

  @ElementExists
  execute(element: typeof window.qwElement): void {
    const test = new Test();

    // verificar se existe pelo menos um th
    const has_th = element.getElements('th').length > 0;
    // verificar se existe pelo menos um tr
    const has_tr = element.getElements('tr').length > 0;
    // verificar se existe pelo menos um td
    const has_td = element.getElements('td').length > 0;

    // verificar pelo menos uma ocorrencia de cada elemento
    if (has_td && has_tr && has_th) {
      test.verdict = 'passed';
      test.description = 'There is at least one occurrence of table, tr, td and th';
      test.resultCode = 'RC1';
    }
    // elementos em falta
    else {
      test.verdict = 'failed';
      test.description = 'There are missing table child elements';
      test.resultCode = 'RC2';
    }

    test.addElement(element);
    super.addTestResult(test);
  }
}

export = QW_WCAG_T18;
