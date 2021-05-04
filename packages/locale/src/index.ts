import { EvaluationReport } from '@qualweb/core';
import { Report } from '@qualweb/earl-reporter';
import { ACTRule, ACTRuleResult } from '@qualweb/act-rules';
import { WCAGTechnique, WCAGTechniqueResult } from '@qualweb/wcag-techniques';
import { BestPractice, BestPracticeResult } from '@qualweb/best-practices';
import { Langs, Lang, Locale } from '@qualweb/locale';
import clone from 'lodash.clonedeep';
import en from './locales/en.json';
import pt from './locales/pt.json';

const locales: Langs = {
  en,
  pt
};

function translateName(type: 'act-rules' | 'wcag-techniques' | 'best-practices', code: string, locale: Locale): string {
  
  if (locale[type]?.[code]?.name) {
    return <string>locale[type]?.[code]?.name;
  }

  return <string>(<Locale>en)[type]?.[code]?.name;
}

function translateDescription(type: 'act-rules' | 'wcag-techniques' | 'best-practices', code: string, locale: Locale): string {
  
  if (locale[type]?.[code]?.name) {
    return <string>locale[type]?.[code]?.description;
  }

  return <string>(<Locale>en)[type]?.[code]?.description;
}

function translateTest(test: ACTRuleResult | WCAGTechniqueResult | BestPracticeResult , type: 'act-rules' | 'wcag-techniques' | 'best-practices', code: string, locale: Locale): void {
  if (locale[type]?.[code]?.results?.[<string>test.resultCode]) {
    test.description = <string>locale[type]?.[code]?.results?.[<string>test.resultCode];
  } else {
    test.description = <string>(<Locale>en)[type]?.[code]?.results?.[<string>test.resultCode];
  }
}

function translateAssertion(type: 'act-rules' | 'wcag-techniques' | 'best-practices', assertion: ACTRule | WCAGTechnique | BestPractice, locale: Locale): void {
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

function translateModule(module: Report | undefined, locale: Locale): void {
  if (module) {
    for (const code in module.assertions ?? {}) {
      const assertion = module.assertions[code];
      if (assertion) {
        translateAssertion(module.type, assertion, locale);
      }
    }
  }
}

function translateReport(report: EvaluationReport, locale: Locale): void {
  translateModule(report.modules['act-rules'], locale);
  translateModule(report.modules['wcag-techniques'], locale);
  translateModule(report.modules['best-practices'], locale);
}

function translate(report: EvaluationReport, locale: Lang | Locale): EvaluationReport {

  let localeToUse: Locale = locales.en;

  if (typeof locale === 'string') {
    if (Object.keys(locales).includes(locale)) {
      localeToUse = locales[locale];
    }
  } else {
    localeToUse = locale;
  }

  const reportToTranslate = clone(report);

  translateReport(reportToTranslate, localeToUse);
  
  return reportToTranslate;
}

export { translate };

export default locales;