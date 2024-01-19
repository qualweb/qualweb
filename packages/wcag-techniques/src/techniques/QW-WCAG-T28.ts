import { WCAGTechnique } from '@qualweb/wcag-techniques';
import Technique from '../lib/Technique.object';
import { WCAGTechniqueClass, ElementExists } from '../lib/applicability';
import Test from '../lib/Test.object';
import { Translate } from '@qualweb/locale';
import { CSSProperties } from '@qualweb/qw-element';

@WCAGTechniqueClass
class QW_WCAG_T28 extends Technique {
  constructor(technique: WCAGTechnique, locale: Translate) {
    super(technique, locale);
  }

  @ElementExists
  execute(element: typeof window.qwElement): void {
    const cssRules = element.getCSSRules();
    this.checkCssProperty(cssRules, element);
  }

  private checkCssProperty(cssRules: CSSProperties | undefined, element: typeof window.qwElement): void {
    const test = new Test();
    const fontSize = cssRules?.['font-size'];
    if (fontSize) {
      //console.log(fontSize);
      const value = fontSize.value + '';
      const hasAbsoluteUnit =
        value.includes('cm') ||
        value.includes('mm') ||
        value.includes('in') ||
        value.includes('px') ||
        value.includes('pt') ||
        value.includes('pc');

      if (!hasAbsoluteUnit) {
        test.verdict = 'passed';
        test.resultCode = 'P1';
      } else {
        test.verdict = 'failed';
        test.resultCode = 'F1';
      }

      test.addElement(element);
      test.attributes.push(value);

      super.addTestResult(test);
    }
  }
}

export = QW_WCAG_T28;
