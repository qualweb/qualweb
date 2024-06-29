import { QualwebReport, ModuleType } from '@qualweb/common';
import type { Translate, TranslationOptions } from './types';
import clone from 'lodash.clonedeep';
import { ModuleTranslator } from './module-translator';
import { LocaleFetcher } from './locale-fetcher';

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
