import locales, { translateReport } from '../dist/index';
import { expect } from 'chai';
import report from './report.json';

describe('Testing translation', function() {
  it('Should translate to pt: using locales.pt', function() {
    const translatedReport = translateReport(report, locales.pt);
    expect(report.modules['act-rules'].assertions['QW-ACT-R1'].name).to.be.not.equal(translatedReport.modules['act-rules'].assertions['QW-ACT-R1'].name);
  });

  it('Should translate to pt: using "pt"', function() {
    const translatedReport = translateReport(report, 'pt');
    expect(report.modules['act-rules'].assertions['QW-ACT-R1'].name).to.be.not.equal(translatedReport.modules['act-rules'].assertions['QW-ACT-R1'].name);
  });

  it('Should translate to pt: using ownLocalObject', function() {
    const ptLocale = {
      "act-rules": {
        "QW-ACT-R1": {
          "name": "Página HTML tem um título",
          "description": "Esta regra verifica que uma página HTML tem um título.",
          "results": {
            "RC1": "O elemento `title` existe e não está vazio ('')."
          } 
        }
      }
    };

    const translatedReport = translateReport(report, ptLocale);
    expect(report.modules['act-rules'].assertions['QW-ACT-R1'].name).to.be.not.equal(translatedReport.modules['act-rules'].assertions['QW-ACT-R1'].name);
  });

  it('Should fallback to "en": using "es" which is not supported', function() {
    const translatedReport = translateReport(report, 'es');
    expect(report.modules['act-rules'].assertions['QW-ACT-R1'].name).to.be.equal(translatedReport.modules['act-rules'].assertions['QW-ACT-R1'].name);
  });

  it('Name should fallback to "en": using ownLocaleObject with partial translation', function() {
    const ptLocale = {
      "act-rules": {
        "QW-ACT-R1": {
          "description": "Esta regra verifica que uma página HTML tem um título.",
          "results": {
            "RC1": "O elemento `title` existe e não está vazio ('')."
          } 
        }
      }
    };

    const translatedReport = translateReport(report,  ptLocale);
    expect(report.modules['act-rules'].assertions['QW-ACT-R1'].name).to.be.equal(translatedReport.modules['act-rules'].assertions['QW-ACT-R1'].name);
  });
});