import { QualwebReport, TranslationOptions, Translate, ModuleType } from '@shared/types';
import clone from 'lodash.clonedeep';
import { ModuleTranslator, LocaleFetcher } from '.';

export class ReportTranslator {
  private readonly locale: Translate;

  constructor(locale: TranslationOptions) {
    this.locale = LocaleFetcher.transform(locale);
  }

  public translate(report: QualwebReport): QualwebReport {
    const reportToTranslate = clone(report);
    this.translateModule(report, ModuleType.ACT_RULES);
    this.translateModule(report, ModuleType.WCAG_TECHNIQUES);
    this.translateModule(report, ModuleType.BEST_PRACTICES);
    return reportToTranslate;
  }

  private translateModule(report: QualwebReport, module: ModuleType): void {
    new ModuleTranslator(module, this.locale).translate(report);
  }
}
