import { WCAGTechnique } from '@qualweb/wcag-techniques';
import Technique from '../lib/Technique.object';
import { WCAGTechniqueClass, ElementExists } from '../lib/applicability';
import Test from '../lib/Test.object';

@WCAGTechniqueClass
class QW_WCAG_T23 extends Technique {
  constructor(technique: WCAGTechnique) {
    super(technique);
  }

  @ElementExists
  execute(element: typeof window.qwElement): void {
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
                  test.description = 'The first focusable control is a visible link to a <main> element.';
                  test.resultCode = 'RC1';
                } else {
                  test.verdict = 'warning';
                  test.description =
                    'The first focusable control is a visible link to some content in the Web Page. Verify if it links to the main content.';
                  test.resultCode = 'RC2';
                }
              } else {
                test.verdict = 'failed';
                test.description = 'The first focusable control on the Web page links to an inexistent element';
                test.resultCode = 'RC3';
              }
            } else {
              //todo failed ou inapplicable?
              test.verdict = 'failed';
              test.description = 'The first focusable control on the Web page links to the top of the page';
              test.resultCode = 'RC4';
            }
          } else {
            test.verdict = 'failed';
            test.description = 'The first focusable control on the Web page does not links to local content';
            test.resultCode = 'RC5';
          }
        } else {
          test.verdict = 'failed';
          test.description = 'The first focusable control on the Web page is not a link';
          test.resultCode = 'RC6';
        }
      } else {
        test.verdict = 'failed';
        test.description = 'This Web page does not have focusable controls';
        test.resultCode = 'RC7';
      }

      if (firstFocusableElem) {
        test.addElement(firstFocusableElem);
      }

      super.addTestResult(test);
    }
  }
}

function findFirstFocusableElement(element: typeof window.qwElement): typeof window.qwElement | undefined {
  let foundFirstFocusableElem = false;
  let firstFocusableElem: typeof window.qwElement | undefined;
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

function hasMainElementAsParent(element: typeof window.qwElement | undefined): boolean {
  if (element) {
    const pointer = element.getElementSelector();
    return pointer.indexOf('main:') > 0;
  }

  return false;
}
export = QW_WCAG_T23;
