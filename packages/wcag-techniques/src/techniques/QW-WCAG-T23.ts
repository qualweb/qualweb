import type { QWElement } from '@packages/qw-element/src';
import { ElementExists, IsInMainContext } from '@shared/applicability';
import { Test } from '@shared/classes';
import { Technique } from '../lib/Technique.object';

class QW_WCAG_T23 extends Technique {

  @ElementExists
  @IsInMainContext
  execute(element: QWElement): void {
    const test = new Test();

    const children = element.getElementChildren();
    if (children !== null && children.length > 0) {
      const firstFocusableElem = findFirstFocusableElement(element);
      if (firstFocusableElem) {
        const firstFocusableElemName = firstFocusableElem.getElementTagName();
        //const firstFocusableElemAttribs = await DomUtils.getElementAttributes(firstFocusableElem);
        const firstFocusableElemHREF = firstFocusableElem.getElementAttribute('href');
        if (firstFocusableElemName === 'a' && firstFocusableElemHREF && firstFocusableElemHREF.trim()) {
          const url = window.qwPage.getURL();
          const urlConcatWithId = url + '#';
          const lastSlash = url.lastIndexOf('/');
          const filename = url.substring(lastSlash + 1);
          if (
            firstFocusableElemHREF.startsWith('#') ||
            firstFocusableElemHREF.startsWith(urlConcatWithId) ||
            firstFocusableElemHREF.startsWith(filename)
          ) {
            const idSymbol = firstFocusableElemHREF.indexOf('#');
            const idReferenced = firstFocusableElemHREF.substring(idSymbol + 1);
            if (idReferenced.length > 0) {
              const idElementReferenced = element.getElement('[id="' + idReferenced + '"]');
              if (idElementReferenced !== null) {
                if (hasMainElementAsParent(idElementReferenced)) {
                  test.verdict = 'warning';
                  test.resultCode = 'W1';
                } else {
                  test.verdict = 'warning';
                  test.resultCode = 'W2';
                }
              } else {
                test.verdict = 'failed';
                test.resultCode = 'F1';
              }
            } else {
              //todo failed ou inapplicable?
              test.verdict = 'failed';
              test.resultCode = 'F2';
            }
          } else {
            test.verdict = 'failed';
            test.resultCode = 'F3';
          }
        } else {
          test.verdict = 'failed';
          test.resultCode = 'F4';
        }
      } else {
        test.verdict = 'failed';
        test.resultCode = 'F5';
      }

      if (firstFocusableElem) {
        test.addElement(firstFocusableElem);
      }

      this.addTestResult(test);
    }
  }
}

function findFirstFocusableElement(element: QWElement): QWElement | undefined {
  let foundFirstFocusableElem = false;
  let firstFocusableElem: QWElement | undefined;
  const children = element.getElementChildren();

  if (children && children.length > 0) {
    let i = 0;
    while (!foundFirstFocusableElem && i < children.length) {
      if (children[i]) {
        if (window.AccessibilityUtils.isElementFocusable(children[i])) {
          firstFocusableElem = children[i];
          foundFirstFocusableElem = true;
        } else {
          firstFocusableElem = findFirstFocusableElement(children[i]);
          if (firstFocusableElem) {
            foundFirstFocusableElem = true;
          }
        }
        i++;
      } else {
        foundFirstFocusableElem = true;
      }
    }
  }
  return firstFocusableElem;
}

function hasMainElementAsParent(element: QWElement | undefined): boolean {
  if (element) {
    const pointer = element.getElementSelector();
    return pointer.indexOf('main:') > 0;
  }

  return false;
}
export { QW_WCAG_T23 };
