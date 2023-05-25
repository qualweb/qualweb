import { WCAGTechnique } from '@qualweb/wcag-techniques';
import Technique from '../lib/Technique.object';
import { WCAGTechniqueClass, ElementExists, ElementIsVisible } from '../lib/applicability';
import Test from '../lib/Test.object';
import { Translate } from '@qualweb/locale';

@WCAGTechniqueClass
class QW_WCAG_T17 extends Technique {
  constructor(technique: WCAGTechnique, locale: Translate) {
    super(technique, locale);
  }

  @ElementExists
  @ElementIsVisible
  execute(element: typeof window.qwElement): void {
    const test = new Test();
    const insideLabel = this.isInsideLabelElement(element);
    const type = element.getElementAttribute('type');
    const isRadioOrCheckBox = type && (type === 'radio' || type === 'checkbox');

    if (insideLabel) {
      const hasText = isRadioOrCheckBox ? this.hasTextAfter(element) : this.hasTextBefore(element);
      if (hasText) {
        test.verdict = 'passed';
        test.resultCode = 'P1';
      } else {
        test.verdict = 'failed';
        test.resultCode = 'F1';
      }
      test.addElement(element);
      super.addTestResult(test);
    } else {
      const id = element.getElementAttribute('id');
      if (id) {
        const label = window.qwPage.getElement(`label[for="${id.trim()}"]`);
        if (label) {
          const text = label.getElementText();
          const visible = window.DomUtils.isElementVisible(label);
          if (visible && text && text.trim() !== '') {
            const isOnTop = this.isElementOnTop(element, label);
            if (isRadioOrCheckBox || isOnTop) {
              test.verdict = 'passed';
              test.resultCode = 'P1';
            } else {
              test.verdict = 'failed';
              test.resultCode = 'F1';
            }
          } else {
            test.verdict = 'failed';
            test.resultCode = 'F2';
          }
        } else {
          test.verdict = 'failed';
          test.resultCode = 'F3';
        }

        test.addElement(element);
        super.addTestResult(test);
      }
    }
  }

  private isInsideLabelElement(element: typeof window.qwElement): boolean {
    let labelFound = false;

    let parent = element.getElementParent();
    while (parent !== null) {
      if (parent.getElementTagName() === 'label') {
        labelFound = true;
        break;
      }

      parent = parent.getElementParent();
    }

    return labelFound;
  }

  private hasTextAfter(element: typeof window.qwElement): boolean {
    let hasText = false;

    let parent: typeof window.qwElement | null = element;
    while (parent !== null) {
      if (parent.getElementTagName() === 'label') {
        break;
      }

      const siblings = parent.getAllNextSiblings();
      for (const sibling of siblings ?? []) {
        if (typeof sibling === 'string') {
          const text = <string>sibling;
          if (text.trim() !== '') {
            hasText = true;
          }
        } else {
          const qwElement = <typeof window.qwElement>sibling;
          if (qwElement.getElementText().trim() !== '') {
            hasText = true;
          }
        }
      }

      parent = parent.getElementParent();
    }

    return hasText;
  }

  private hasTextBefore(element: typeof window.qwElement): boolean {
    let hasText = false;

    let parent: typeof window.qwElement | null = element;
    while (parent !== null) {
      if (parent.getElementTagName() === 'label') {
        break;
      }

      const siblings = parent.getAllPreviousSiblings();
      for (const sibling of siblings ?? []) {
        if (typeof sibling === 'string') {
          const text = <string>sibling;
          if (text.trim() !== '') {
            hasText = true;
          }
        } else {
          const qwElement = <typeof window.qwElement>sibling;
          if (qwElement.getElementText().trim() !== '') {
            hasText = true;
          }
        }
      }

      parent = parent.getElementParent();
    }

    return hasText;
  }

  private findFirstCommonAncestor(
    input: typeof window.qwElement,
    label: typeof window.qwElement
  ): typeof window.qwElement | null {
    let inputParent = input.getElementParent();
    let ancestor = null;

    while (inputParent !== null) {
      let labelParent = label.getElementParent();
      while (labelParent !== null) {
        if (inputParent.getElementSelector() === labelParent.getElementSelector()) {
          ancestor = inputParent;
          break;
        }

        labelParent = labelParent.getElementParent();
      }

      if (ancestor) {
        break;
      }

      inputParent = inputParent.getElementParent();
    }

    return ancestor;
  }

  private findFirstInDepth(
    ancestor: typeof window.qwElement,
    elements: Array<typeof window.qwElement>
  ): typeof window.qwElement | null {
    let elementFound: typeof window.qwElement | null = null;

    for (const child of ancestor.getElementChildren()) {
      for (const element of elements) {
        if (child.getElementSelector() === element.getElementSelector()) {
          elementFound = element;
          break;
        }
      }

      if (elementFound) {
        break;
      } else {
        elementFound = this.findFirstInDepth(child, elements);
      }
    }

    return elementFound;
  }
  private isElementOnTop(a: typeof window.qwElement, b: typeof window.qwElement) {
    const selectorElementsA = a.getElementSelector().split('>');
    const selectorElementsB = b.getElementSelector().split('>');
    const selectorElementsNA = selectorElementsA.length;
    const selectorElementsNB = selectorElementsB.length;
    let compareElementA, compareElementB;
    if (selectorElementsNA > selectorElementsNB) {
      compareElementA = selectorElementsA[selectorElementsNB - 1];
      compareElementB = selectorElementsB[selectorElementsNB - 1];
    } else {
      compareElementA = selectorElementsA[selectorElementsNA - 1];
      compareElementB = selectorElementsB[selectorElementsNA - 1];
    }

    const compareNumberA = +compareElementA.replace(/[a-z]\d|\D/g, '');
    const compareNumberB = +compareElementB.replace(/[a-z]\d|\D/g, '');
    return compareNumberB - compareNumberA;
  }
}

export = QW_WCAG_T17;
