import { WCAGTechnique } from '@qualweb/wcag-techniques';
import Technique from '../lib/Technique.object';
import { WCAGTechniqueClass } from '../lib/applicability';
import Test from '../lib/Test.object';

@WCAGTechniqueClass
class QW_WCAG_T22 extends Technique {
  constructor(technique: WCAGTechnique) {
    super(technique);
  }

  execute(): void {
    throw new Error('Method not implemented.');
  }

  validate(newTabWasOpen: boolean): void {
    const test = new Test();

    if (!newTabWasOpen) {
      test.verdict = 'passed';
      test.description = `Browser didn't open new tab`;
      test.resultCode = 'RC1';
    } else {
      test.verdict = 'failed';
      test.description = `Browser opened a new tab`;
      test.resultCode = 'RC2';
    }

    super.addTestResult(test);
  }
}

export = QW_WCAG_T22;
