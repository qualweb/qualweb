import { ModuleTranslator } from '@qualweb/core/locale';
import { EvaluationModuleDefinition, ModuleOptions, ModuleReport, ModuleType } from '@qualweb/core/evaluation';
import { CUIChecksTester } from './lib/CUIChecksTester.object';
import { TranslationOptions } from '@qualweb/locale';
import { QWCUI_Selectors } from './lib/selectors';

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
    if (moduleOptions.selectors) {
    let selectors:QWCUI_Selectors ={
      QW_CC_WINDOW: moduleOptions.selectors.QW_CC_WINDOW,
      QW_CC_DIALOG: moduleOptions.selectors.QW_CC_DIALOG,
      QW_CC_MESSAGES: moduleOptions.selectors.QW_CC_MESSAGES,
      QW_CC_MIC: moduleOptions.selectors.QW_CC_MIC,
      QW_CC_INPUT: moduleOptions.selectors.QW_CC_INPUT
    }    
    this.tester.configureSelectors(selectors);
    }
  }
}
