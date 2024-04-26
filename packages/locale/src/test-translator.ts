import type { Module } from '@shared/types';
import type { Translate, TranslationValues } from '@qualweb/locale';
import { Translator } from './translator';

export class TestTranslator {
  private readonly module: Module;
  private readonly translator: Translator;

  constructor(module: Module, translator: Translator);
  constructor(module: Module, locale: Translate);
  constructor(module: Module, translator: Translate | Translator) {
    this.module = module;
    this.translator = translator instanceof Translator ? translator : new Translator(translator);
  }

  public translate(assertionCode: string, resultCode: string, values?: TranslationValues): string {
    let description = this.translator.get([this.module, assertionCode, 'results', resultCode]);

    if (description && values) {
      for (const key of Object.keys(values) || []) {
        description = description.replace(new RegExp(`{${key}}`, 'g'), values[key].toString());
      }
    }

    return description ?? '';
  }
}

window.TestTranslator = TestTranslator;
