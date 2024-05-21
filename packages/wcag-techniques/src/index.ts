import { EvaluationModule, ModuleReport } from '@shared/classes';
import type { ModuleTranslator } from '@packages/locale/src';
import type { DomUtils, AccessibilityUtils } from '@packages/util/src';
import type { QWPage } from '@packages/qw-page/src';
import type { Technique } from './lib/Technique.object';
import { WCAGTechniquesTester } from './lib/WCAGTechniquesTester.object';

declare global {
  interface Window {
    qwPage: QWPage;
    ModuleTranslator: typeof ModuleTranslator;
    DomUtils: typeof DomUtils;
    AccessibilityUtils: typeof AccessibilityUtils;
  }
}

export class WCAGTechniques extends EvaluationModule<Technique> {
  private readonly moduleTranslator = new window.ModuleTranslator('wcag-techniques', this.locale);
  protected readonly report = new ModuleReport<Technique>('wcag-techniques');
  protected readonly tester = new WCAGTechniquesTester(this.report).init(this.moduleTranslator);
}
