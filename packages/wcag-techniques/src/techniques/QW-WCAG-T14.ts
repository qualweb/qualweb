import type { QWElement } from '@qualweb/qw-element';
import { ElementExists } from '@qualweb/util/applicability';
import { Test, Verdict } from '@qualweb/core/evaluation';
import { Technique } from '../lib/Technique.object';
import { AccessibilityUtils } from '@qualweb/util';
class QW_WCAG_T14 extends Technique {
  @ElementExists
  execute(element: QWElement): void {
    const test = new Test();

    const hasIds = element.getElements('[id]');
    const hasHeaders = element.getElements('[headers]');

    if (!window.AccessibilityUtils.isDataTable(element)) {
      if (hasIds.length > 0 || hasHeaders.length > 0) {
        test.verdict = Verdict.FAILED;
        test.resultCode = 'F1';
      } else {
        test.verdict = Verdict.INAPPLICABLE;
        test.resultCode = 'I2';
      }
    } else {
      if (doesTableHaveDuplicateIds(element)) {
        test.verdict = Verdict.FAILED;
        test.resultCode = 'F2';
      } else if (hasHeaders.length <= 0) {
        test.verdict = Verdict.INAPPLICABLE;
        test.resultCode = 'I3';
      } else {
        const headersElements = element.getElements('[headers]');
        let headersMatchId = true;
        for (const headerElem of headersElements || []) {
          if (headersMatchId) {
            headersMatchId = doesHeadersMatchId(element, headerElem.getElementAttribute('headers'));
          }
        }

        if (headersMatchId) {
          test.verdict = Verdict.PASSED;
          test.resultCode = 'P1';
        } else {
          test.verdict = Verdict.FAILED;
          test.resultCode = 'F3';
        }
      }
    }

    test.addElement(element);
    this.addTestResult(test);
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
        const role = AccessibilityUtils.getElementRole(matchingIdElem);
        if (role === "columnheader" || role === "rowheader") {
          result++;
        }
      }
    }
    if (splitHeaders.length === result) {
      outcome = true;
    }
  } else {
    outcome = true;
  }
  return outcome;
}

export { QW_WCAG_T14 };
