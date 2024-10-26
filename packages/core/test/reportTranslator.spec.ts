import { expect } from 'chai';
import type { QualwebReport } from '../src';
import { ReportTranslator } from '../src';
import { LocaleFetcher } from '@qualweb/locale';

import reportJson from './fixtures/reportTranslator.report.json';

const report = reportJson as unknown as QualwebReport;

describe('Testing translation', function () {
  it('Should translate to fi: using locales.fi', function () {
    const translatedReport = new ReportTranslator(LocaleFetcher.get('fi')).translate(report);

    expect(report.modules['act-rules']!.assertions['QW-ACT-R1'].name).to.be.not.equal(
      translatedReport.modules['act-rules']!.assertions['QW-ACT-R1'].name
    );
  });

  it('Should translate to fi: using "fi"', function () {
    const translatedReport = new ReportTranslator('fi').translate(report);
    expect(report.modules['act-rules']!.assertions['QW-ACT-R1'].name).to.be.not.equal(
      translatedReport.modules['act-rules']!.assertions['QW-ACT-R1'].name
    );
  });

  it('Should translate to fi: using ownLocalObject', function () {
    const fiLocale = {
      'act-rules': {
        'QW-ACT-R1': {
          name: 'HTML-sivulla on sivuotsikko',
          description: "Tämä sääntö tarkastaa, että HTML-sivulla on 'title'-elementti.",
          results: {
            P1: '`Title`-elementti löytyy eikä se ole tyhjä.'
          }
        }
      }
    };

    const translatedReport = new ReportTranslator(fiLocale).translate(report);

    expect(report.modules['act-rules']!.assertions['QW-ACT-R1'].name).to.be.not.equal(
      translatedReport.modules['act-rules']!.assertions['QW-ACT-R1'].name
    );
  });

  it('Should fallback to "en": using "es" which is not supported', function () {
    const translatedReport = new ReportTranslator('es' as any).translate(report);
    expect(report.modules['act-rules']!.assertions['QW-ACT-R1'].name).to.be.equal(
      translatedReport.modules['act-rules']!.assertions['QW-ACT-R1'].name
    );
  });

  it('Name should fallback to "en": using ownLocaleObject with partial translation', function () {
    const ptLocale = {
      'act-rules': {
        'QW-ACT-R1': {
          description: 'Esta regra verifica que uma página HTML tem um título.',
          results: {
            P1: "O elemento `title` existe e não está vazio ('')."
          }
        }
      }
    };

    const translatedReport = new ReportTranslator(ptLocale).translate(report);
    expect(report.modules['act-rules']!.assertions['QW-ACT-R1'].name).to.be.equal(
      translatedReport.modules['act-rules']!.assertions['QW-ACT-R1'].name
    );
  });
});
