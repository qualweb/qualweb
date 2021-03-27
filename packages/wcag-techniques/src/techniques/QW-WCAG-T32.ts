import { WCAGTechnique } from '@qualweb/wcag-techniques';
import Technique from '../lib/Technique.object';
//import { QWElement } from '@qualweb/qw-element';
import { WCAGTechniqueClass, ElementExists } from '../lib/decorators';
import Test from '../lib/Test.object';

@WCAGTechniqueClass
class QW_WCAG_T32 extends Technique {
  constructor(technique: WCAGTechnique) {
    super(technique);
  }

  @ElementExists
  execute(element: typeof window.qwElement): void {
    const test = new Test();

    const hasLi = element.getElements('li').length !== 0;
    const hasDd = element.getElements('dd').length !== 0;
    const hasDt = element.getElements('dt').length !== 0;

    const name = element.getElementTagName();

    if (hasLi && name === 'ul') {
      // fails if the element doesn't contain an alt attribute
      test.verdict = 'warning';
      test.description =
        'Check that content that has the visual appearance of a list (with or without bullets) is marked as an unordered list';
      test.resultCode = 'RC1';
    } else if (hasLi && name === 'ol') {
      test.verdict = 'warning';
      test.description =
        'Check that content that has the visual appearance of a numbered list is marked as an ordered list.';
      test.resultCode = 'RC2';
    } else if (name === 'dl' && (hasDt || hasDd)) {
      test.verdict = 'warning';
      test.description =
        'Check that content is marked as a definition list when terms and their definitions are presented in the form of a list.';
      test.resultCode = 'RC3';
    } else {
      test.verdict = 'failed';
      test.description = `A list item is not contained in a correct list element`;
      test.resultCode = 'RC4';
    }

    test.addElement(element, true, true);
    super.addTestResult(test);
  }
}

export = QW_WCAG_T32;
