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
