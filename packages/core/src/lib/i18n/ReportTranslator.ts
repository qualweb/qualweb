import clone from 'lodash.clonedeep';
import type { Translate, TranslationOptions } from '@qualweb/locale';
import { LocaleFetcher } from '@qualweb/locale';
import { QualwebReport, ModuleType } from '../evaluation';
import { ModuleTranslator } from './ModuleTranslator';

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
