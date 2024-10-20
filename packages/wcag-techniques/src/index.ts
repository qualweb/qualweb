import type { DomUtils, AccessibilityUtils } from '@qualweb/util';
import type { QWPage } from '@qualweb/qw-page';
import { ModuleTranslator } from '@qualweb/core/locale';
import { EvaluationModuleDefinition, ExecutableModuleContext, ModuleReport, ModuleType } from '@qualweb/core/evaluation';
import { WCAGTechniquesTester } from './lib/WCAGTechniquesTester.object';
import { QualwebPage } from '@qualweb/core/lib';
import { WCAGTechniquesModule } from './WcagTechniquesModule';

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
