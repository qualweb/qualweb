import { WCAGTechnique } from '@qualweb/wcag-techniques';
import Technique from '../lib/Technique.object';
//import { QWElement } from '@qualweb/qw-element';
import { WCAGTechniqueClass, ElementExists, ElementHasAttribute } from '../lib/decorators';
import Test from '../lib/Test.object';

@WCAGTechniqueClass
class QW_WCAG_T20 extends Technique {
  constructor(technique: WCAGTechnique) {
    super(technique);
  }

  @ElementExists
  @ElementHasAttribute('title')
  execute(element: typeof window.qwElement): void {
    const test = new Test();

    const title = (<string>element.getElementAttribute('title')).trim();
    const text = element.getElementText().trim();

    if (!title) {
      test.verdict = 'failed';
      test.description = `The element's title attribute is empty`;
      test.resultCode = 'RC1';
    } else if (title === text) {
      test.verdict = 'failed';
      test.description = `The element contains a title attribute equal to the text in the link`;
      test.resultCode = 'RC2';
    } else {
      test.verdict = 'warning';
      test.description = `Please verify that the element's title attribute describes correctly the link`;
      test.resultCode = 'RC3';
    }

    super.addTestResult(test);
  }
}

export = QW_WCAG_T20;
