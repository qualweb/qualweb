import { QWElement } from '@qualweb/qw-element';
import { WCAGTechniqueResult, WCAGElement } from '@qualweb/wcag-techniques';

class Test implements WCAGTechniqueResult {
  verdict: 'passed' | 'failed' | 'warning' | 'inapplicable';
  description: string | string[];
  resultCode: string | string[];
  elements: WCAGElement[];
  attributes?: string | string[] | undefined;

  constructor(verdict?: 'passed' | 'failed' | 'warning', description?: string, resultCode?: string) {
    this.verdict = verdict ?? 'inapplicable';
    this.description = description ?? '';
    this.resultCode = resultCode ?? 'RC0';
    this.elements = new Array<WCAGElement>();
  }

  public addElement(element: QWElement, withText = true, fullElement = false): void {
    const htmlCode = element.getElementHtmlCode(withText, fullElement);
    const pointer = element.getElementSelector();
    this.elements.push({ htmlCode, pointer });
  }
}

export = Test;
