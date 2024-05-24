import type { ModuleType, Translate, TranslationValues } from '@shared/types';
import { Translator } from '.';

export class TestTranslator {
  private readonly module: ModuleType;
  private readonly translator: Translator;

  constructor(module: ModuleType, translator: Translator);
  constructor(module: ModuleType, locale: Translate);
  constructor(module: ModuleType, translator: Translate | Translator) {
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
