import { EvaluationReport } from '@qualweb/core';
import { Report } from '@qualweb/earl-reporter';
import { ACTRule, ACTRuleResult } from '@qualweb/act-rules';
import { WCAGTechnique, WCAGTechniqueResult } from '@qualweb/wcag-techniques';
import { BestPractice, BestPracticeResult } from '@qualweb/best-practices';
import { Langs, Lang, Locale } from '@qualweb/locale';
import clone from 'lodash.clonedeep';
import en from './locales/en.json';
import fi from './locales/fi.json';
import sv from './locales/sv.json';

const locales: Langs = {
  en,
  fi,
  sv
};

function translateName(type: 'act-rules' | 'wcag-techniques' | 'best-practices', code: string, locale: Locale): string {
  if (locale[type]?.[code]?.name) {
    return <string>locale[type]?.[code]?.name;
  }

  return <string>(<Locale>en)[type]?.[code]?.name;
}

function translateDescription(
  type: 'act-rules' | 'wcag-techniques' | 'best-practices',
  code: string,
  locale: Locale
): string {
  if (locale[type]?.[code]?.name) {
    return <string>locale[type]?.[code]?.description;
  }

  return <string>(<Locale>en)[type]?.[code]?.description;
}

function translateTest(
  test: ACTRuleResult | WCAGTechniqueResult | BestPracticeResult,
  type: 'act-rules' | 'wcag-techniques' | 'best-practices',
  code: string,
  locale: Locale
): void {
  if (locale[type]?.[code]?.results?.[<string>test.resultCode]) {
    test.description = <string>locale[type]?.[code]?.results?.[<string>test.resultCode];
  } else {
    test.description = <string>(<Locale>en)[type]?.[code]?.results?.[<string>test.resultCode];
  }
}

function translateAssertion(
  type: 'act-rules' | 'wcag-techniques' | 'best-practices',
  assertion: ACTRule | WCAGTechnique | BestPractice,
  locale: Locale
): void {
  assertion.name = translateName(type, assertion.code, locale);
  assertion.description = translateDescription(type, assertion.code, locale);

  for (const test of assertion.results ?? []) {
    translateTest(test, type, assertion.code, locale);
  }

  for (const test of assertion.results ?? []) {
    if (test.verdict === assertion.metadata.outcome) {
      assertion.metadata.description = <string>test.description;
      break;
    }
  }
}

function getLocale(locale: Lang | Locale): Locale {
  let localeToUse: Locale = locales.en;

  if (typeof locale === 'string') {
    if (Object.keys(locales).includes(locale)) {
      localeToUse = locales[locale];
    }
  } else {
    localeToUse = locale;
  }

  return localeToUse;
}

function translateModule(module: Report | undefined, locale: Locale): void {
  if (module) {
    const localToUse = getLocale(locale);

    for (const code in module.assertions ?? {}) {
      const assertion = module.assertions[code];
      if (assertion) {
        translateAssertion(module.type, assertion, localToUse);
      }
    }
  }
}

function translateReport(report: EvaluationReport, locale: Lang | Locale): EvaluationReport {
  const localeToUse = getLocale(locale);
  const reportToTranslate = clone(report);

  translateModule(reportToTranslate.modules['act-rules'], localeToUse);
  translateModule(reportToTranslate.modules['wcag-techniques'], localeToUse);
  translateModule(reportToTranslate.modules['best-practices'], localeToUse);

  return reportToTranslate;
}

export { translateReport, translateModule };

export default locales;
