import type { DomUtils, AccessibilityUtils } from '@qualweb/util';
import type { QWPage } from '@qualweb/qw-page';
import { EvaluationModule, ModuleReport, ModuleType } from '@qualweb/common';
import { BestPracticesTester } from './lib/BestPracticesTester.object';

declare global {
  interface Window {
    qwPage: QWPage;
    DomUtils: typeof DomUtils;
    AccessibilityUtils: typeof AccessibilityUtils;
  }
}

export class BestPractices extends EvaluationModule {
  protected readonly report = new ModuleReport(ModuleType.BEST_PRACTICES);
  protected readonly tester = new BestPracticesTester(this.report).init(this.translator);
}
