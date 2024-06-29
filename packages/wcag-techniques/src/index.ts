import type { ModuleTranslator } from '@qualweb/locale';
import type { DomUtils, AccessibilityUtils } from '@qualweb/util';
import type { QWPage } from '@qualweb/qw-page';
import { EvaluationModule, ModuleReport, ModuleType } from '@qualweb/common';
import { WCAGTechniquesTester } from './lib/WCAGTechniquesTester.object';

declare global {
  interface Window {
    qwPage: QWPage;
    ModuleTranslator: typeof ModuleTranslator;
    DomUtils: typeof DomUtils;
    AccessibilityUtils: typeof AccessibilityUtils;
  }
}

export class WCAGTechniques extends EvaluationModule {
  protected readonly report = new ModuleReport(ModuleType.WCAG_TECHNIQUES);
  protected readonly tester = new WCAGTechniquesTester(this.report).init(this.translator);
}
