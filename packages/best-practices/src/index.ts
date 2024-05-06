import { EvaluationModule, ModuleReport } from '@shared/classes';
import type { ModuleTranslator } from '@packages/locale/src';
import type { DomUtils, AccessibilityUtils } from '@packages/util/src';
import { QWPage } from '@packages/qw-page/src';
import type { BestPractice } from './lib/BestPractice.object';
import { BestPracticesTester } from './lib/BestPracticesTester.object';

declare global {
  interface Window {
    qwPage: QWPage;
    ModuleTranslator: typeof ModuleTranslator;
    DomUtils: typeof DomUtils;
    AccessibilityUtils: typeof AccessibilityUtils;
  }
}

class BestPractices extends EvaluationModule<BestPractice> {
  private readonly moduleTranslator = new window.ModuleTranslator('best-practices', this.locale);
  protected readonly report = new ModuleReport('wcag-techniques');
  protected readonly tester = new BestPracticesTester(this.report).init(this.moduleTranslator);
}

export { BestPractices };
