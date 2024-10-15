import type { DomUtils, AccessibilityUtils } from '@qualweb/util';
import type { QWPage } from '@qualweb/qw-page';
import type { ModuleTranslator } from '@qualweb/locale';
import { EvaluationModule, ModuleReport, ModuleType } from '@qualweb/common';
import { BestPracticesTester } from './lib/BestPracticesTester.object';

declare global {
  interface Window {
    qwPage: QWPage;
    DomUtils: typeof DomUtils;
    AccessibilityUtils: typeof AccessibilityUtils;
    ModuleTranslator: typeof ModuleTranslator;
  }
}

export class BestPractices extends EvaluationModuleDefinition {
  protected readonly type = ModuleType.BEST_PRACTICES;
  protected readonly report = new ModuleReport(this.type);
  protected readonly translator = new window.ModuleTranslator(this.type, this.translate);
  protected readonly tester = new BestPracticesTester(this.report).init(this.translator);
}
