import { HTMLTechniqueResult } from '@qualweb/html-techniques';
import { DomUtils } from '@qualweb/util';
import Technique from '../lib/Technique.object';
import { QWElement } from '@qualweb/qw-element';
import { QWPage } from '@qualweb/qw-page';
import { WCAGTechnique, ElementExists } from '../lib/decorators';

@WCAGTechnique
class QW_WCAG_T23 extends Technique {

  constructor(technique?: any) {
    super(technique);
  }

  @ElementExists
  execute(element: QWElement, page: QWPage): void {

    const evaluation: HTMLTechniqueResult = {
      verdict: '',
      description: '',
      resultCode: ''
    };

    const children = element.getElementChildren();

    if (children !== null && children.length > 0) {
      const firstFocusableElem = findFirstFocusableElement(element, page);
      if (!!firstFocusableElem) {
        const firstFocusableElemName = firstFocusableElem.getElementTagName();
        //const firstFocusableElemAttribs = await DomUtils.getElementAttributes(firstFocusableElem);
        const firstFocusableElemHREF = firstFocusableElem.getElementAttribute('href');
        if (firstFocusableElemName === 'a' && firstFocusableElemHREF && firstFocusableElemHREF.trim()) {
          const url = page.getURL();
          const urlConcatWithId = url + '#';
          const lastSlash = url.lastIndexOf('/');
          const filename = url.substring(lastSlash + 1);
          if (firstFocusableElemHREF.startsWith('#') || firstFocusableElemHREF.startsWith(urlConcatWithId) ||
            firstFocusableElemHREF.startsWith(filename)) {
            const idSymbol = firstFocusableElemHREF.indexOf('#');
            const idReferenced = firstFocusableElemHREF.substring(idSymbol + 1);
            if (idReferenced.length > 0) {
              const idElementReferenced = element.getElement('[id="' + idReferenced + '"]')
              if (idElementReferenced !== null) {
                if (hasMainElementAsParent(idElementReferenced)) {
                  evaluation.verdict = 'warning';
                  evaluation.description = 'The first focusable control is a visible link to a <main> element.';
                  evaluation.resultCode = 'RC1';
                } else {
                  evaluation.verdict = 'warning';
                  evaluation.description = 'The first focusable control is a visible link to some content in the Web Page. Verify if it links to the main content.';
                  evaluation.resultCode = 'RC2';
                }
              } else {
                evaluation.verdict = 'failed';
                evaluation.description = 'The first focusable control on the Web page links to an inexistent element';
                evaluation.resultCode = 'RC3';
              }
            } else {
              //todo failed ou inapplicable?
              evaluation.verdict = 'failed';
              evaluation.description = 'The first focusable control on the Web page links to the top of the page';
              evaluation.resultCode = 'RC4';
            }
          } else {
            evaluation.verdict = 'failed';
            evaluation.description = 'The first focusable control on the Web page does not links to local content';
            evaluation.resultCode = 'RC5';
          }
        } else {
          evaluation.verdict = 'failed';
          evaluation.description = 'The first focusable control on the Web page is not a link';
          evaluation.resultCode = 'RC6';
        }
      } else {
        evaluation.verdict = 'failed';
        evaluation.description = 'This Web page does not have focusable controls';
        evaluation.resultCode = 'RC7';
      }

      super.addEvaluationResult(evaluation, firstFocusableElem);
    }
  }
}

function findFirstFocusableElement(element: QWElement, page: QWPage): QWElement | undefined {
  let foundFirstFocusableElem = false;
  let firstFocusableElem: QWElement | undefined;
  const children = element.getElementChildren();

  if (children && children.length > 0) {
    let i = 0;
    while (!foundFirstFocusableElem && i < children.length) {
      if (children[i] !== undefined) {
        if (DomUtils.isElementFocusable(children[i], page)) {
          firstFocusableElem = children[i];
          foundFirstFocusableElem = true;
        } else {
          firstFocusableElem = findFirstFocusableElement(children[i], page);
          foundFirstFocusableElem = true;
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

export = QW_WCAG_T23;
