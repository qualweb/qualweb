import { ModuleTranslator } from '@qualweb/core/locale';
import { EvaluationModuleDefinition, ModuleOptions, ModuleReport, ModuleType } from '@qualweb/core/evaluation';
import { CUIChecksTester } from './lib/CUIChecksTester.object';
import { TranslationOptions } from '@qualweb/locale';
import { setBrowserFilePath } from './lib/readability';
import { QWCUI_Selectors } from './lib/selectors';
import { RuleTest } from './lib/types';

export class CUIChecksRunner extends EvaluationModuleDefinition<CUIChecksTester> {
  protected readonly translator = new ModuleTranslator(this.type, this.translate);

  public constructor(moduleOptions: ModuleOptions, translationOptions: TranslationOptions, filePath?: string,rules?:RuleTest[]) {
    if (filePath) setBrowserFilePath(filePath);
    const moduleType = ModuleType.CUI_CHECKS;
    const report = new ModuleReport(moduleType);
    const settings = Object.fromEntries(Object.entries(moduleOptions.settings || {}));
    const tester = new CUIChecksTester(report);

    super(
      moduleType,
      moduleOptions,
      translationOptions,
      report,
      tester,
    );

    this.translator = new ModuleTranslator(this.type, this.translate);
    if (moduleOptions.selectors) {

    let selectors:QWCUI_Selectors ={
      QW_CC_WINDOW: moduleOptions.selectors.QW_CC_WINDOW,
      QW_CC_DIALOG: moduleOptions.selectors.QW_CC_DIALOG,
      QW_CC_MESSAGES: moduleOptions.selectors.QW_CC_MESSAGES,
      QW_CC_MIC: moduleOptions.selectors.QW_CC_MIC,
      QW_CC_INPUT: moduleOptions.selectors.QW_CC_INPUT,
    }
   
    this.tester.configure(settings, selectors, rules);

    }
    this.tester.init(this.translator);
  }

  public async executeTests(): Promise<this> {
    await (this.tester as CUIChecksTester).execute();
    return this;
  }
  
}
