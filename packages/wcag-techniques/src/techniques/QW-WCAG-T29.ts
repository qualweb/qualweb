import type { QWElement } from '@qualweb/qw-element';
import { ElementExists, Test } from '@qualweb/lib';
import { Technique } from '../lib/Technique.object';

class QW_WCAG_T29 extends Technique {
  @ElementExists
  execute(element: QWElement): void {
    if (element.getElementTagName() === 'style') {
      const sheet = <any>element.getElementProperty('sheet');
      for (const rule of sheet.cssRules || []) {
        const style = rule?.style?.cssText;
        if (style) {
          this.checkCssProperty(style, element);
        }
      }
    } else {
      const style = <string>element.getElementAttribute('style');
      this.checkCssProperty(style, element);
    }
  }

  private checkCssProperty(style: string, element: QWElement): void {
    const properties = style.split(';').filter((p) => p.trim() !== '') || [style];

    for (const property of properties) {
      if (property.includes('text-align')) {
        const textAlign = property.split(':')[1];
        const isJustified = textAlign.includes('justify');

        const test = new Test();

        if (!isJustified) {
          test.verdict = 'passed';
          test.resultCode = 'P1';
        } else {
          test.verdict = 'failed';
          test.resultCode = 'F1';
        }

        test.addElement(element);
        test.attributes.push(property);

        this.addTestResult(test);
      }
    }
  }
}

export { QW_WCAG_T29 };
