import { ACTRuleResult, ACTElement } from '@qualweb/act-rules';

class Test implements ACTRuleResult {
  verdict: 'passed' | 'failed' | 'warning' | 'inapplicable';
  description: string;
  resultCode: string;
  elements: ACTElement[];
  attributes?: string | string[] | undefined;

  constructor(verdict?: 'passed' | 'failed' | 'warning', description?: string, resultCode?: string) {
    this.verdict = verdict ?? 'inapplicable';
    this.description = description ?? 'No test target found.';
    this.resultCode = resultCode ?? 'RC0';
    this.elements = new Array<ACTRuleResult>();
  }

  public addElement(element: typeof window.qwElement, withText = true, fullElement = false, aName?: boolean): void {
    const htmlCode = element.getElementHtmlCode(withText, fullElement);
    const pointer = element.getElementSelector();
    let accessibleName: string | undefined;
    if (aName) {
      accessibleName = window.AccessibilityUtils.getAccessibleName(element);
    }
    this.elements.push({ htmlCode, pointer, accessibleName });
  }

  public addElements(
    elements: Array<typeof window.qwElement>,
    withText = true,
    fullElement = false,
    aName?: boolean
  ): void {
    for (const element of elements ?? []) {
      this.addElement(element, withText, fullElement, aName);
    }
  }
}

export = Test;
