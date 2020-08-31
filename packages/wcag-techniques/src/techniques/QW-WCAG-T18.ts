import { WCAGTechniqueResult } from '@qualweb/wcag-techniques';
import Technique from '../lib/Technique.object';
import { QWElement } from '@qualweb/qw-element';
import { WCAGTechnique, ElementExists } from '../lib/decorators';

@WCAGTechnique
class QW_WCAG_T18 extends Technique {

  constructor(technique?: any) {
    super(technique);
  }

  @ElementExists
  execute(element: QWElement): void {

    const evaluation: WCAGTechniqueResult = {
      verdict: '',
      description: '',
      resultCode: ''
    };

    // verificar se existe pelo menos um th
    const has_th = (element.getElements('th')).length > 0;
    // verificar se existe pelo menos um tr
    const has_tr = (element.getElements('tr')).length > 0;
    // verificar se existe pelo menos um td
    const has_td = (element.getElements('td')).length > 0;

    // verificar pelo menos uma ocorrencia de cada elemento
    if (has_td && has_tr && has_th) {
      evaluation.verdict = 'passed';
      evaluation.description = 'There is at least one occurrence of table, tr, td and th';
      evaluation.resultCode = 'RC1';
    }
    // elementos em falta
    else {
      evaluation.verdict = 'failed';
      evaluation.description = 'There are missing table child elements';
      evaluation.resultCode = 'RC2';
    }

    super.addEvaluationResult(evaluation, element);
  }
}

export = QW_WCAG_T18;
