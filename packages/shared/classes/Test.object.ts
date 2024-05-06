import type { QWElement } from '@packages/qw-element/src';
import type { EvaluationElement, TestResult, Verdict } from '../types';

class Test implements TestResult {
  verdict: Verdict;
  description: string;
  resultCode: string;
  elements: EvaluationElement[];
  attributes: string[];

  constructor(verdict?: Verdict, description?: string, resultCode?: string) {
    this.verdict = verdict ?? 'inapplicable';
    this.description = description ?? '';
    this.resultCode = resultCode ?? 'I1';
    this.elements = [];
    this.attributes = [];
  }

  public addElement(element: QWElement, withText = true, fullElement = false, aName?: boolean): this {
    const htmlCode = element.getElementHtmlCode(withText, fullElement);
    const pointer = element.getElementSelector();
    let accessibleName: string | undefined;
    if (aName) {
      accessibleName = window.AccessibilityUtils.getAccessibleName(element);
    }
    this.elements.push({ htmlCode, pointer, accessibleName });
    return this;
  }

  public addElements(elements: QWElement[], withText = true, fullElement = false, aName?: boolean): this {
    for (const element of elements ?? []) {
      this.addElement(element, withText, fullElement, aName);
    }
    return this;
  }
}

export { Test };
