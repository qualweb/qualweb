import type { Module, QualwebReport } from '@qualweb/lib';
import type { Translate, TranslationOptions } from '@qualweb/locale';
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
    this.translateModule(report, 'act-rules');
    this.translateModule(report, 'wcag-techniques');
    this.translateModule(report, 'best-practices');
    return reportToTranslate;
  }

  private translateModule(report: QualwebReport, module: Module): void {
    new ModuleTranslator(module, this.locale).translate(report);
  }
}
