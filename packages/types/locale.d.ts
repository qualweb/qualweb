declare module '@qualweb/locale' {
  import { QualwebReport, Module } from '@qualweb/core';
  import { Assertion } from '@qualweb/evaluation';

  export type TranslationValues = {
    [key: string]: string | number | boolean;
  };

  export type ModuleTranslation = {
    [test: string]: {
      name?: string;
      description?: string;
      results?: {
        [rc: string]: string;
      };
    };
  };

  export type Locale = {
    'act-rules'?: ModuleTranslation;
    'wcag-techniques'?: ModuleTranslation;
    'best-practices'?: ModuleTranslation;
  };

  export type TranslationObject = {
    translate: Locale | string;
    fallback: Locale | string;
  };

  export type Translate = {
    translate: Locale;
    fallback: Locale;
  };

  export type Langs = {
    en: Locale;
    fi: Locale;
    sv: Locale;
    nb: Locale;
    nn: Locale;
  };

  export type Lang = keyof Langs;

  export type TranslationOptions = Locale | Lang | TranslationObject | undefined;
  export class Translator {
    constructor(locale: Translate);
    public get(path: string | string[]): string | undefined;
  }

  export class TestTranslator {
    constructor(module: Module, locale: Translate);
    translate(assertionCode: string, resultCode: string, values?: TranslationValues): string;
  }

  export class AssertionTranslator {
    constructor(module: Module, locale: Translate);
    public translate(rule: Assertion): void;
  }

  export class ModuleTranslator {
    constructor(module: Module, locale: Translate);
    public translate(report: QualwebReport): void;
    public translateAssertion(assertion: Assertion): void;
    public translateTest(assertionCode: string, resultCode: string, values?: TranslationValues): string;
  }

  export class ReportTranslator {
    constructor(locale: Lang | Locale);
    translate(report: QualwebReport): QualwebReport;
  }

  export class LocaleFetcher {
    static get(lang: Lang): Locale;
    static transform(options: TranslationOptions): Translate;
  }
}
