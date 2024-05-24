import { EvaluationModule, ModuleReport } from '@shared/classes';
import type { DomUtils, AccessibilityUtils } from '@packages/util/src';
import type { QWPage } from '@packages/qw-page/src';
import { BestPracticesTester } from './lib/BestPracticesTester.object';
import { ModuleType } from '@shared/types';

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
