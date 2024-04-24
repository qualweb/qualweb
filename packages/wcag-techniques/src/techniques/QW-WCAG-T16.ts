import { Test, type HTMLValidationReport } from '@qualweb/lib';
import { Technique } from '../lib/Technique.object';

class QW_WCAG_T16 extends Technique {
  execute(): void {
    throw new Error('Method not implemented.');
  }

  validate(validation?: HTMLValidationReport): void {
    if (validation) {
      for (const result of validation.messages ?? []) {
        const test = new Test();

        if (result.type === 'error') {
          test.verdict = 'failed';
          test.resultCode = 'F1';
        } else {
          test.verdict = 'warning';
          test.resultCode = 'W1';
        }

        test.description = result.message;

        this.addTestResult(test);
      }

      if (this.technique.metadata.failed + this.technique.metadata.warning === 0) {
        this.addTestResult(new Test('passed', undefined, 'P1'));
      }
    }
  }
}

export { QW_WCAG_T16 };
