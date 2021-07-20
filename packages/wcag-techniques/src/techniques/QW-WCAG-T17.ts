//@ts-nocheck

import { WCAGTechnique } from '@qualweb/wcag-techniques';
import Technique from '../lib/Technique.object';
import { WCAGTechniqueClass, ElementExists, ElementIsVisible } from '../lib/applicability';
import Test from '../lib/Test.object';

@WCAGTechniqueClass
class QW_WCAG_T17 extends Technique {
  constructor(technique: WCAGTechnique) {
    super(technique);
  }

  @ElementExists
  @ElementIsVisible
  execute(element: typeof window.qwElement): void {
    const test = new Test();

    const insideLabel = this.isInsideLabelElement(element);
    const type = element.getElementAttribute('type');

    if (insideLabel) {
      if (type && (type === 'radio' || type === 'checkbox')) {
        const hasTextAfter = this.hasTextAfter(element);
        if (hasTextAfter) {
          test.verdict = 'passed';
          test.description = 'The form field has well positioned label.';
          test.resultCode = 'RC1';
        } else {
          test.verdict = 'failed';
          test.description = 'The form field has incorrect positioned label.';
          test.resultCode = 'RC4';
        }
      } else {
        const hasTextBefore = this.hasTextBefore(element);
        if (hasTextBefore) {
          test.verdict = 'passed';
          test.description = 'The form field has well positioned label.';
          test.resultCode = 'RC1';
        } else {
          test.verdict = 'failed';
          test.description = 'The form field has incorrect positioned label.';
          test.resultCode = 'RC4';
        }
      }
    } else {
      const id = element.getElementAttribute('id');
      if (id) {
        const label = window.qwPage.getElement(`label[for="${id.trim()}"]`);
        if (label) {
          if (window.DomUtils.isElementVisible(label)) {
            const text = label.getElementText();
            if (text && text.trim() !== '') {
              const ancestor = this.findFirstCommonAncestor(element, label);
              if (type && (type === 'radio' || type === 'checkbox')) {
                const isLabelAfter = this.isLabelAfter(element, label, ancestor);
                if (isLabelAfter) {
                  test.verdict = 'passed';
                  test.description = 'The form field has well positioned label.';
                  test.resultCode = 'RC1';
                } else {
                  test.verdict = 'failed';
                  test.description = 'The form field has incorrect positioned label.';
                  test.resultCode = 'RC3';
                }
              } else {
                const isLabelBefore = !this.isLabelAfter(element, label, ancestor);
                if (isLabelBefore) {
                  test.verdict = 'passed';
                  test.description = 'The form field has well positioned label.';
                  test.resultCode = 'RC1';
                } else {
                  test.verdict = 'failed';
                  test.description = 'The form field has incorrect positioned label.';
                  test.resultCode = 'RC3';
                }
              }
            } else {
              test.verdict = 'failed';
              test.description = 'The form field label is empty.';
              test.resultCode = 'RC5';
            }
          } else {
            test.verdict = 'failed';
            test.description = 'The form field label is not visible.';
            test.resultCode = 'RC6';
          }
        } else {
          test.verdict = 'failed';
          test.description = 'The form field does not have a label.';
          test.resultCode = 'RC2';
        }
      } else {
        test.verdict = 'failed';
        test.description = 'The form field does not have a label.';
        test.resultCode = 'RC2';
      }
    }

    test.addElement(element);
    super.addTestResult(test);
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

    let parent = element;
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
          if (qwElement.getElementProperty('textContent').trim() !== '') {
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

    let parent = element;
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
          if (qwElement.getElementProperty('textContent').trim() !== '') {
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
  ): typeof window.qwElement {
    let ancestor: typeof window.qwElement;

    let inputParent = input.getElementParent();
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

  private isLabelAfter(
    input: typeof window.qwElement,
    label: typeof window.qwElement,
    ancestor: typeof window.qwElement
  ): boolean {
    let labelAfter = false;

    for (const child of ancestor.getElementChildren()) {
      if (child.getElementSelector() === input.getElementSelector()) {
        labelAfter = true;
        break;
      }

      if (child.getElementSelector() === label.getElementSelector()) {
        break;
      }

      labelAfter = this.isLabelAfter(input, label, child);
      if (labelAfter) {
        break;
      }
    }

    return labelAfter;
  }

  /*@ElementExists
  @ElementIsVisible
  execute(element: typeof window.qwElement): void {
    const test = new Test();

    const result = this.verifyInputLabelPosition(element);

    if (result === 'checkbox') {
      test.verdict = 'failed';
      test.description = 'The checkbox label is not immediately after the field';
      test.resultCode = 'RC1';
    } else if (result === 'radio') {
      test.verdict = 'failed';
      test.description = 'The radio label is not immediately after the field';
      test.resultCode = 'RC2';
    } else if (result === 'other') {
      test.verdict = 'failed';
      test.description = 'The form field label is not immediately before the field';
      test.resultCode = 'RC3';
    } else if (result === 'noLabel') {
      test.verdict = 'failed';
      test.description = 'The form field does not have a label';
      test.resultCode = 'RC4';
    } else if (result === 'pass') {
      test.verdict = 'passed';
      test.description = 'The form field has well positioned label';
      test.resultCode = 'RC5';
    }

    test.addElement(element);
    super.addTestResult(test);
  }

  private verifyInputLabelPosition(element: typeof window.qwElement): string | undefined {
    if (element.elementHasAttributes()) {
      const type = element.getElementAttribute('type');

      const prevElement = element.getElementPreviousSibling();
      let prevElementTagName;
      let prevElementHasAttributes;
      let prevElementAttributeFor;

      if (prevElement) {
        prevElementTagName = prevElement.getElementTagName();
        prevElementHasAttributes = prevElement.elementHasAttributes();
        prevElementAttributeFor = prevElement.getElementAttribute('for');
      }

      const nextElement = element.getElementNextSibling();
      let nextElementTagName: string | undefined;
      let nextElementHasAttributes: boolean | undefined;
      let nextElementAttributeFor!: string | null;

      if (nextElement) {
        nextElementTagName = nextElement.getElementTagName();
        nextElementHasAttributes = nextElement.elementHasAttributes();
        nextElementAttributeFor = nextElement.getElementAttribute('for');
      }

      const elementId = element.getElementAttribute('id');

      if (type && (type === 'radio' || type === 'checkbox')) {
        if (nextElement) {
          if (nextElementTagName === 'label' && nextElementHasAttributes && nextElementAttributeFor === elementId) {
            return 'pass';
          }
        } else if (prevElement) {
          if (prevElementTagName === 'label' && prevElementHasAttributes && prevElementAttributeFor === elementId) {
            return type;
          }
        } else {
          return 'noLabel';
        }
      }
      if (type && type !== 'checkbox' && type !== 'radio') {
        if (prevElement) {
          if (prevElementTagName === 'label' && prevElementHasAttributes && prevElementAttributeFor === elementId) {
            return 'pass';
          }
        } else if (nextElement) {
          if (nextElementTagName === 'label' && nextElementHasAttributes && nextElementAttributeFor === elementId) {
            return 'other';
          }
        } else {
          return 'noLabel';
        }
      }
    }

    return undefined;
  }*/
}

export = QW_WCAG_T17;
