import { WCAGTechnique } from '@qualweb/wcag-techniques';
//import { AccessibilityUtils } from '@qualweb/util';
import Technique from '../lib/Technique.object';
//import { QWElement } from '@qualweb/qw-element';
//import { QWPage } from '@qualweb/qw-page';
import { WCAGTechniqueClass, ElementExists } from '../lib/decorators';
import Test from '../lib/Test.object';

@WCAGTechniqueClass
class QW_WCAG_T14 extends Technique {
  constructor(technique: WCAGTechnique) {
    super(technique);
  }

  @ElementExists
  execute(element: typeof window.qwElement, page: typeof window.qwPage): void {
    const test = new Test();

    const hasIds = element.getElements('[id]');
    const hasHeaders = element.getElements('[headers]');

    if (!window.AccessibilityUtils.isDataTable(element, page)) {
      if (hasIds.length > 0 || hasHeaders.length > 0) {
        test.verdict = 'failed';
        test.description = 'This table is a layout table with id or headers attributes';
        test.resultCode = 'RC1';
      } else {
        test.verdict = 'inapplicable';
        test.description = 'This table is a layout table';
        test.resultCode = 'RC2';
      }
    } else {
      if (doesTableHaveDuplicateIds(element)) {
        test.verdict = 'failed';
        test.description = 'There are duplicate `id`s in this data table';
        test.resultCode = 'RC3';
      } else if (hasHeaders.length <= 0) {
        test.verdict = 'inapplicable';
        test.description = 'No header attributes are used in this data table';
        test.resultCode = 'RC4';
      } else {
        const headersElements = element.getElements('[headers]');
        let headersMatchId = true;
        for (const headerElem of headersElements || []) {
          if (headersMatchId) {
            headersMatchId = doesHeadersMatchId(element, headerElem.getElementAttribute('headers'));
          }
        }

        if (headersMatchId) {
          test.verdict = 'passed';
          test.description = 'id and headers attributes are correctly used';
          test.resultCode = 'RC5';
        } else {
          test.verdict = 'failed';
          test.description = 'id and headers attributes are not correctly used';
          test.resultCode = 'RC6';
        }
      }
    }

    test.addElement(element);
    super.addTestResult(test);
  }
}

function doesTableHaveDuplicateIds(table: typeof window.qwElement): boolean {
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

function doesHeadersMatchId(table: typeof window.qwElement, headers: string | null): boolean {
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
