//import { QWElement } from '@qualweb/qw-element';
import { WCAGTechniqueResult, WCAGElement } from '@qualweb/wcag-techniques';

class Test implements WCAGTechniqueResult {
  verdict: 'passed' | 'failed' | 'warning' | 'inapplicable';
  description: string;
  resultCode: string;
  elements: Array<WCAGElement>;
  attributes: Array<string>;

  constructor(verdict?: 'passed' | 'failed' | 'warning', description?: string, resultCode?: string) {
    this.verdict = verdict ?? 'inapplicable';
    this.description = description ?? '';
    this.resultCode = resultCode ?? 'I1';
    this.elements = new Array<WCAGElement>();
    this.attributes = new Array<string>();
  }

  public addElement(element: typeof window.qwElement, withText = true, fullElement = false): void {
    const htmlCode = element.getElementHtmlCode(withText, fullElement);
    const pointer = element.getElementSelector();
    this.elements.push({ htmlCode, pointer });
  }
}

export = Test;
