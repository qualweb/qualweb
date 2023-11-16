import locales, { translateReport } from '../dist/index.js';
import { expect } from 'chai';
import path from 'path';
import { fileURLToPath } from 'url';
import { readFileSync } from 'fs';
const report = JSON.parse(readFileSync(path.resolve(path.dirname(fileURLToPath(import.meta.url)), 'report.json')));

describe('Testing translation', function () {
  it('Should translate to fi: using locales.fi', function () {
    const translatedReport = translateReport(report, locales.default.fi);
    expect(report.modules['act-rules'].assertions['QW-ACT-R1'].name).to.be.not.equal(
      translatedReport.modules['act-rules'].assertions['QW-ACT-R1'].name
    );
  });

  it('Should translate to fi: using "fi"', function () {
    const translatedReport = translateReport(report, 'fi');
    expect(report.modules['act-rules'].assertions['QW-ACT-R1'].name).to.be.not.equal(
      translatedReport.modules['act-rules'].assertions['QW-ACT-R1'].name
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

    const translatedReport = translateReport(report, fiLocale);
    expect(report.modules['act-rules'].assertions['QW-ACT-R1'].name).to.be.not.equal(
      translatedReport.modules['act-rules'].assertions['QW-ACT-R1'].name
    );
  });

  it('Should fallback to "en": using "es" which is not supported', function () {
    const translatedReport = translateReport(report, 'es');
    expect(report.modules['act-rules'].assertions['QW-ACT-R1'].name).to.be.equal(
      translatedReport.modules['act-rules'].assertions['QW-ACT-R1'].name
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

    const translatedReport = translateReport(report, ptLocale);
    expect(report.modules['act-rules'].assertions['QW-ACT-R1'].name).to.be.equal(
      translatedReport.modules['act-rules'].assertions['QW-ACT-R1'].name
    );
  });
});
