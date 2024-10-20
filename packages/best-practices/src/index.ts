import type { DomUtils } from '@qualweb/util';
import type { QWPage } from '@qualweb/qw-page';
import { ModuleTranslator } from '@qualweb/core/locale';
import { EvaluationModuleDefinition, ExecutableModuleContext, ModuleReport, ModuleType } from '@qualweb/core/evaluation';
import { BestPracticesTester } from './lib/BestPracticesTester.object';
import { QualwebPage } from '@qualweb/core/lib';
import { BestPracticesModule } from './BestPracticesModule';

// TODO: these definitions should be pulled from the packages that define them.
declare global {
  interface Window {
    qwPage: QWPage;
    DomUtils: typeof DomUtils;
    ModuleTranslator: typeof ModuleTranslator;
  }
}

export class BestPractices extends EvaluationModuleDefinition {
  protected readonly type = ModuleType.BEST_PRACTICES;
  protected readonly report = new ModuleReport(this.type);
  protected readonly translator = new ModuleTranslator(this.type, this.translate);
  protected readonly tester = new BestPracticesTester(this.report).init(this.translator);

  getInstance(page: QualwebPage): ExecutableModuleContext {
    return new BestPracticesModule(page, {});
  }
}
