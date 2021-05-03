declare module "@qualweb/locale" {

  interface ModuleTranslation {
    name?: string;
    description?: string;
    results?: {
      [rc: string]: string;
    }
  };

  interface Locale {
    'act-rules'?: ModuleTranslation;
    'wcag-techniques'?: ModuleTranslation;
    'best-practices'?: ModuleTranslation;
  }

  export { ModuleTranslation, Locale };
}