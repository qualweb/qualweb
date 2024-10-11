import type { Translate } from '@qualweb/locale';
import { Translator } from '@qualweb/locale';
import type { Assertion } from '../evaluation/Assertion';
import { ModuleType } from '../evaluation/ModuleType';

export class AssertionTranslator {
  private readonly module: ModuleType;
  private readonly translator: Translator;

  constructor(module: ModuleType, locale: Translate) {
    this.module = module;
    this.translator = new Translator(locale);
  }

  public translate(assertion: Assertion): void {
    assertion.name = this.translator.get([this.module, assertion.code, 'name']) ?? assertion.name;
    assertion.description = this.translator.get([this.module, assertion.code, 'description']) ?? assertion.description;
    assertion.metadata.description =
      this.translator.get([this.module, assertion.code, 'results', 'I1']) ?? assertion.metadata.description;
  }
}
