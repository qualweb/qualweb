import type { Technique } from '@qualweb/wcag-techniques';
import { EvaluationModule, ModuleReport } from '@qualweb/lib';
import { WCAGTechniquesTester } from './lib/WCAGTechniquesTester.object';

class WCAGTechniques extends EvaluationModule<Technique> {
  private readonly moduleTranslator = new window.ModuleTranslator('wcag-techniques', this.locale);
  protected readonly report = new ModuleReport('wcag-techniques');
  protected readonly tester = new WCAGTechniquesTester(this.report).init(this.moduleTranslator);
}

export { WCAGTechniques };
