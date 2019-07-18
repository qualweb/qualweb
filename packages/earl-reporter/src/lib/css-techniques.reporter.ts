'use strict';

import { 
  Assertion,
  TestResult,
  ResultSource 
} from '@qualweb/earl-reporter';
import { CSSTechniquesReport } from '@qualweb/css-techniques';

async function CSSTechniquesReportToEARL(report: CSSTechniquesReport, date?: string): Promise<Assertion[]> {
  const assertions = new Array<Assertion>();

  for (const techniqueName in report.techniques || {}) {
    if (report.techniques[techniqueName]) {
      const technique = report.techniques[techniqueName];
      if (technique) {
        const sources = new Array<ResultSource>();

        for (const result of technique.results || []) {
          const source: ResultSource = {
            result: {
              pointer: result.pointer,
              outcome: result.verdict
            }
          };

          sources.push(source);
        }

        const result: TestResult = {
          '@type': 'TestResult',
          outcome: 'earl:' + (technique.metadata.outcome !== 'warning' ? technique.metadata.outcome : 'cantTell'),
          source: sources,
          description: technique.metadata.description,
          date: date ? date : new Date().toISOString()
        }

        const assertion: Assertion = {
          '@type': 'Assertion',
          test: {
            title: technique.name,
            description: technique.description
          },
          mode: 'earl:automatic',
          result
        };

        assertions.push(assertion);
      }
    }
  }

  return assertions;
}

export = CSSTechniquesReportToEARL;