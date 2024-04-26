import type { BestPractice } from '@qualweb/best-practices';
import { EvaluationModule, ModuleReport } from '@shared/classes';
import { BestPracticesTester } from './lib/BestPracticesTester.object';

class BestPractices extends EvaluationModule<BestPractice> {
  private readonly moduleTranslator = new window.ModuleTranslator('best-practices', this.locale);
  protected readonly report = new ModuleReport('wcag-techniques');
  protected readonly tester = new BestPracticesTester(this.report).init(this.moduleTranslator);
}

export { BestPractices };
