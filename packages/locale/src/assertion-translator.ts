import type { Assertion } from '@qualweb/common';
import { ModuleType } from '@qualweb/common';
import type { Translate } from './types';
import { Translator } from './translator';

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
