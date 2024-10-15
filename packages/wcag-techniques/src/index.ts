import type { DomUtils, AccessibilityUtils } from '@qualweb/util';
import type { QWPage } from '@qualweb/qw-page';
import type { ModuleTranslator } from '@qualweb/locale';
import { EvaluationModuleDefinition, ModuleReport, ModuleType } from '@qualweb/core';
import { WCAGTechniquesTester } from './lib/WCAGTechniquesTester.object';

declare global {
  interface Window {
    qwPage: QWPage;
    DomUtils: typeof DomUtils;
    AccessibilityUtils: typeof AccessibilityUtils;
    ModuleTranslator: typeof ModuleTranslator;
  }
}

export class WCAGTechniques extends EvaluationModuleDefinition {
  protected readonly type = ModuleType.WCAG_TECHNIQUES;
  protected readonly report = new ModuleReport(this.type);
  protected readonly translator = new window.ModuleTranslator(this.type, this.translate);
  protected readonly tester = new WCAGTechniquesTester(this.report).init(this.translator);
}
