import { EvaluationModule, ModuleReport } from '@shared/classes';
import type { ModuleTranslator } from '@packages/locale/src';
import type { DomUtils, AccessibilityUtils } from '@packages/util/src';
import type { QWPage } from '@packages/qw-page/src';
import { WCAGTechniquesTester } from './lib/WCAGTechniquesTester.object';
import { ModuleType } from '@shared/types';

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
