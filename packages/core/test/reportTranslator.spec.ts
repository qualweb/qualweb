import { expect } from 'chai';
import type { QualwebReport } from '../src';
import { ReportTranslator } from '../src';
import { LocaleFetcher } from '@qualweb/locale';
import { readFileSync } from 'node:fs';
import path from 'node:path';
import clone from 'lodash.clonedeep';

describe('Testing translation', function () {
  let report: QualwebReport;

  this.beforeEach(() => {
    report = JSON.parse(readFileSync(path.resolve(__dirname, 'fixtures/reportTranslator.report.json'), 'utf-8'));
  })

  it('Should translate to fi: using locales.fi', function () {
    const originalReport = clone(report);
    const translatedReport = new ReportTranslator(LocaleFetcher.get('fi')).translate(report);

    // Ensure ReportTranslator did not modify the input vaule.
    expect(report.modules['act-rules']!.assertions['QW-ACT-R1'].name).to.equal(originalReport.modules['act-rules']!.assertions['QW-ACT-R1'].name);

    // Ensure ReportTranslator correctly translated the output value.
    expect(report.modules['act-rules']!.assertions['QW-ACT-R1'].name).to.be.not.equal(
      translatedReport.modules['act-rules']!.assertions['QW-ACT-R1'].name
    );
  });

  it('Should translate to fi: using "fi"', function () {
    const originalReport = clone(report);
    const translatedReport = new ReportTranslator('fi').translate(report);

    // Ensure ReportTranslator did not modify the input vaule.
    expect(report.modules['act-rules']!.assertions['QW-ACT-R1'].name).to.equal(originalReport.modules['act-rules']!.assertions['QW-ACT-R1'].name);

    expect(report.modules['act-rules']!.assertions['QW-ACT-R1'].name).to.be.not.equal(
      translatedReport.modules['act-rules']!.assertions['QW-ACT-R1'].name
    );
  });

  it('Should translate to fi: using ownLocalObject', function () {
    const originalReport = clone(report);

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

    // Ensure ReportTranslator did not modify the input vaule.
    expect(report.modules['act-rules']!.assertions['QW-ACT-R1'].name).to.equal(originalReport.modules['act-rules']!.assertions['QW-ACT-R1'].name);

    expect(report.modules['act-rules']!.assertions['QW-ACT-R1'].name).to.be.not.equal(
      translatedReport.modules['act-rules']!.assertions['QW-ACT-R1'].name
    );
  });

  it('Should throw Error when using unsupported locale', function () {
    expect(() => {
      new ReportTranslator('es' as any).translate(report);
    }).to.throw();
  });

  it('Name should fallback to "en": using ownLocaleObject with partial translation', function () {
    const originalReport = clone(report);

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

    // Ensure ReportTranslator did not modify the input vaule.
    expect(report.modules['act-rules']!.assertions['QW-ACT-R1'].name).to.equal(originalReport.modules['act-rules']!.assertions['QW-ACT-R1'].name);

    expect(report.modules['act-rules']!.assertions['QW-ACT-R1'].name).to.be.equal(
      translatedReport.modules['act-rules']!.assertions['QW-ACT-R1'].name
    );
  });
});
