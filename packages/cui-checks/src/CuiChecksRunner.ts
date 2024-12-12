import { ModuleTranslator } from '@qualweb/core/locale';
import { EvaluationModuleDefinition, ModuleOptions, ModuleReport, ModuleType } from '@qualweb/core/evaluation';
import { CUIChecksTester } from './lib/CUIChecksTester.object';
import { TranslationOptions } from '@qualweb/locale';

export class CUIChecksRunner extends EvaluationModuleDefinition<CUIChecksTester> {
  protected readonly translator = new ModuleTranslator(this.type, this.translate);

  public constructor(moduleOptions: ModuleOptions, translationOptions: TranslationOptions) {
    const moduleType = ModuleType.CUI_CHECKS;
    const report = new ModuleReport(moduleType);
    const tester = new CUIChecksTester(report);

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
