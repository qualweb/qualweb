import { ModuleTranslator } from '@qualweb/core/locale';
import { EvaluationModuleDefinition, ModuleOptions, ModuleReport, ModuleType } from '@qualweb/core/evaluation';
import { BestPracticesTester } from './lib/BestPracticesTester.object';
import { TranslationOptions } from '@qualweb/locale';

export class BestPracticesRunner extends EvaluationModuleDefinition<BestPracticesTester> {
  protected readonly translator: ModuleTranslator;

  public constructor(moduleOptions: ModuleOptions, translationOptions: TranslationOptions) {
    const moduleType = ModuleType.BEST_PRACTICES;
    const report = new ModuleReport(moduleType);
    const tester = new BestPracticesTester(report);

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
