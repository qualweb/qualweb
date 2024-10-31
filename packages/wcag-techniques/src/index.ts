import type { DomUtils, AccessibilityUtils } from '@qualweb/util';
import type { QWPage } from '@qualweb/qw-page';
import { ModuleTranslator } from '@qualweb/core/locale';
import { EvaluationModuleDefinition, ModuleOptions, ModuleReport, ModuleType } from '@qualweb/core/evaluation';
import { WCAGTechniquesTester } from './lib/WCAGTechniquesTester.object';
import { TranslationOptions } from '@qualweb/locale';

declare global {
  interface Window {
    qwPage: QWPage;
    DomUtils: typeof DomUtils;
    AccessibilityUtils: typeof AccessibilityUtils;
    ModuleTranslator: typeof ModuleTranslator;
  }
}

export class WCAGTechniques extends EvaluationModuleDefinition<WCAGTechniquesTester> {
  protected readonly translator = new ModuleTranslator(this.type, this.translate);

  public constructor(moduleOptions: ModuleOptions, translationOptions: TranslationOptions) {
    const moduleType = ModuleType.WCAG_TECHNIQUES;
    const report = new ModuleReport(moduleType);
    const tester = new WCAGTechniquesTester(report);

    super(
      moduleType,
      moduleOptions,
      translationOptions,
      report,
      tester,
    );

    this.translator = new ModuleTranslator(this.type, this.translate);
    this.tester.init(this.translator);
  }
}
