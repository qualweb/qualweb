import { BestPracticeResult, BPElement } from '@qualweb/best-practices';

class Test implements BestPracticeResult {
  verdict: 'passed' | 'failed' | 'warning' | 'inapplicable';
  description: string;
  resultCode: string;
  elements: BPElement[];
  attributes: Array<string>;

  constructor(verdict?: 'passed' | 'failed' | 'warning', description?: string, resultCode?: string) {
    this.verdict = verdict ?? 'inapplicable';
    this.description = description ?? '';
    this.resultCode = resultCode ?? 'RC0';
    this.elements = new Array<BPElement>();
    this.attributes = new Array<string>();
  }

  public addElement(element: typeof window.qwElement, withText = true, fullElement = false): void {
    const htmlCode = element.getElementHtmlCode(withText, fullElement);
    const pointer = element.getElementSelector();
    this.elements.push({ htmlCode, pointer });
  }
}

export = Test;
