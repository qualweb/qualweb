import type { Assertion, Module } from '@qualweb/lib';
import type { Translate } from '@qualweb/locale';
import { Translator } from './translator';

export class AssertionTranslator {
  private readonly module: Module;
  private readonly translator: Translator;

  constructor(module: Module, locale: Translate) {
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

window.AssertionTranslator = AssertionTranslator;
