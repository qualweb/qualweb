import { WCAGTechniqueResult } from '@qualweb/wcag-techniques';
import { AccessibilityUtils } from '@qualweb/util';
import Technique from '../lib/Technique.object';
import { QWElement } from '@qualweb/qw-element';
import { QWPage } from '@qualweb/qw-page';
import { WCAGTechnique, ElementExists } from '../lib/decorators';

@WCAGTechnique
class QW_WCAG_T14 extends Technique {

  constructor(technique?: any) {
    super(technique);
  }

  @ElementExists
  execute(element: QWElement, page: QWPage): void {

    const evaluation: WCAGTechniqueResult = {
      verdict: '',
      description: '',
      resultCode: ''
    };

    const hasIds = element.getElements('[id]');
    const hasHeaders = element.getElements('[headers]');

    if (!AccessibilityUtils.isDataTable(element, page)) {
      if (hasIds.length > 0 || hasHeaders.length > 0) {
        evaluation.verdict = 'failed';
        evaluation.description = 'This table is a layout table with id or headers attributes';
        evaluation.resultCode = 'RC1';
      } else {
        evaluation.verdict = 'inapplicable';
        evaluation.description = 'This table is a layout table';
        evaluation.resultCode = 'RC2';
      }
    } else {
      if (doesTableHaveDuplicateIds(element)) {
        evaluation.verdict = 'failed';
        evaluation.description = 'There are duplicate `id`s in this data table';
        evaluation.resultCode = 'RC3';
      } else if (hasHeaders.length <= 0) {
        evaluation.verdict = 'inapplicable';
        evaluation.description = 'No header attributes are used in this data table';
        evaluation.resultCode = 'RC4';
      } else {
        const headersElements = element.getElements('[headers]');
        let headersMatchId = true;
        for (const headerElem of headersElements || []) {
          if (headersMatchId) {
            headersMatchId = doesHeadersMatchId(element, headerElem.getElementAttribute('headers'));
          }
        }

        if (headersMatchId) {
          evaluation.verdict = 'passed';
          evaluation.description = 'id and headers attributes are correctly used';
          evaluation.resultCode = 'RC5';
        } else {
          evaluation.verdict = 'failed';
          evaluation.description = 'id and headers attributes are not correctly used';
          evaluation.resultCode = 'RC6';
        }
      }
    }
    
    super.addEvaluationResult(evaluation, element);
  }
}

function doesTableHaveDuplicateIds(table: QWElement): boolean {
  const elementsId = table.getElements('[id]');
  let duplicate = false;
  let counter: number;

  for (const elementId of elementsId || []) {
    counter = 0;
    for (const elementId2 of elementsId || []) {
      if (elementId.getElementAttribute('id') === elementId2.getElementAttribute('id')) {
        counter++;
      }
      if (counter > 1) {
        duplicate = true;
        break;
      }
    }
  }
  return duplicate;
}

function doesHeadersMatchId(table: QWElement, headers: string | null): boolean {
  let outcome = false;
  let result = 0;
  if (headers && headers.trim() !== '') {
    const splitHeaders = headers.split(' ');
    for (const header of splitHeaders || []) {
      const matchingIdElem = table.getElement('[id="' + header + '"]');
      if (matchingIdElem !== null) {
        const matchingIdElemHeaders = matchingIdElem.getElementAttribute('headers');
        if (splitHeaders.length === 1 && !matchingIdElemHeaders) {
          outcome = true;
        } else if (matchingIdElemHeaders !== null) {
          for (const headerIdElem of matchingIdElemHeaders.split(' ') || []) {
            if (splitHeaders.indexOf(headerIdElem) >= 0 && headerIdElem !== header) {
              result++;
            }
          }
          if (result === matchingIdElemHeaders.split(' ').length) {
            outcome = true;
            break;
          }
        }
      }
    }
  } else {
    outcome = true;
  }
  return outcome;
}

export = QW_WCAG_T14;
