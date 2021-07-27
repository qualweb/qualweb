import { WCAGTechnique } from '@qualweb/wcag-techniques';
import Technique from '../lib/Technique.object';
import { WCAGTechniqueClass, ElementExists } from '../lib/applicability';
import Test from '../lib/Test.object';
import { Translate } from '@qualweb/locale';

@WCAGTechniqueClass
class QW_WCAG_T28 extends Technique {
  constructor(technique: WCAGTechnique, locale: Translate) {
    super(technique, locale);
  }

  @ElementExists
  execute(element: typeof window.qwElement): void {
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

  private checkCssProperty(style: string, element: typeof window.qwElement): void {
    const test = new Test();

    const properties = style.split(';').filter((p) => p.trim() !== '') || [style];

    for (const property of properties) {
      if (property.includes('font-size')) {
        const fontSize = property.split(':')[1];
        const hasImportant = fontSize.includes('!important');

        if (hasImportant) {
          const value = fontSize.replace('!important', '').trim();
          const hasAbsoluteUnit =
            value.endsWith('cm') ||
            value.endsWith('mm') ||
            value.endsWith('in') ||
            value.endsWith('px') ||
            value.endsWith('pt') ||
            value.endsWith('pc');

          if (!hasAbsoluteUnit) {
            test.verdict = 'passed';
            test.resultCode = 'P1';
          } else {
            test.verdict = 'failed';
            test.resultCode = 'F1';
          }

          test.addElement(element);
          test.attributes.push(property);

          super.addTestResult(test);
        }
      }
    }
  }
}

export = QW_WCAG_T28;
