import type { DomUtils } from '@qualweb/util';
import type { QWPage } from '@qualweb/qw-page';
import { ModuleTranslator } from '@qualweb/core/locale';
import { EvaluationModuleDefinition, ExecutableModuleContext, ModuleOptions, ModuleReport, ModuleType } from '@qualweb/core/evaluation';
import { BestPracticesTester } from './lib/BestPracticesTester.object';
import { QualwebPage } from '@qualweb/core/lib';
import { BestPracticesModule } from './BestPracticesModule';
import { TranslationOptions } from '@qualweb/locale';

// TODO: these definitions should be pulled from the packages that define them.
declare global {
  interface Window {
    qwPage: QWPage;
    DomUtils: typeof DomUtils;
    ModuleTranslator: typeof ModuleTranslator;
  }
}

export class BestPractices extends EvaluationModuleDefinition<BestPracticesTester> {
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

  getInstance(page: QualwebPage): ExecutableModuleContext {
    return new BestPracticesModule(page, {});
  }
}
