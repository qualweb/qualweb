'use strict';

import { ACTRulesReport } from '@qualweb/act-rules';
import { 
  Assertion,
  TestResult,
  ResultSource 
} from '@qualweb/earl-reporter';

async function ACTRulesReportToEARL(report: ACTRulesReport, date?: string): Promise<Assertion[]> {
  const assertions = new Array<Assertion>();

  for (const ruleName in report.rules || {}) {
    if (report.rules[ruleName]) {
      const rule = report.rules[ruleName];
      if (rule) {
        const sources = new Array<ResultSource>();

        for (const result of rule.results || []) {
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
          outcome: 'earl:' + rule.metadata.outcome,
          source: sources,
          description: rule.metadata.description,
          date: date ? date : new Date().toISOString()
        }

        const assertion: Assertion = {
          '@type': 'Assertion',
          test: {
            title: rule.name,
            description: rule.description
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

export = ACTRulesReportToEARL;