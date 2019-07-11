'use strict';

import { EvaluationReport } from '@qualweb/core';
import { EarlReport } from '@qualweb/earl-reporter';

async function generateSingleReport(report: EvaluationReport): Promise<EarlReport> {
  const earlReport: EarlReport = {
    context: 'https://act-rules.github.io/earl-context.json', // change context
    graph: []
  };

  const assertor: any = {
    '@id': report.system.name,
    '@type': 'Software',
    title: report.system.name,
    description: report.system.description,
    hasVersion: report.system.version,
    homepage: report.system.homepage
  };

  const testSubject: any = {
    '@type': 'TestSubject',
    source: report.system.name,
    assertor,
    assertions: []
  };

  for (const ruleName in report.modules['act-rules'] || {}) {
    if (report.modules['act-rules']) {
      const rule = report.modules['act-rules'][ruleName];
      if (rule) {
        const sources = [];

        for (const result of rule.results || []) {
          const source: any = {
            pointer: result.pointer,
            outcome: result.verdict
          };

          sources.push(source);
        }

        const result: any = {
          '@type': 'TestResult',
          outcome: rule.metadata.outcome,
          source: sources,
          description: rule.metadata.description,
          date: report.system.date
        }

        const assertion: any = {
          '@type': 'Assertion',
          test: {
            title: rule.name,
            description: rule.description
          },
          mode: 'earl:automatic',
          result
        };

        testSubject.assertions.push(assertion);
      }
    }
  }

  earlReport.graph.push(testSubject);

  return earlReport;
}

async function generateAggregatedReport(reports: EvaluationReport[]): Promise<EarlReport> {
  const earlReport: EarlReport = {
    context: 'https://act-rules.github.io/earl-context.json',
    graph: []
  };

  for (const report of reports || []) {
    const assertor: any = {
      '@id': report.system.name,
      '@type': 'Software',
      title: report.system.name,
      description: report.system.description,
      hasVersion: report.system.version,
      homepage: report.system.homepage
    };

    const testSubject: any = {
      '@type': 'TestSubject',
      source: report.system.name,
      assertor,
      assertions: []
    };

    for (const ruleName in report.modules['act-rules'] || {}) {
      if (report.modules['act-rules']) {
        const rule = report.modules['act-rules'][ruleName];
        if (rule) {
          const sources = [];

          for (const result of rule.results || []) {
            const source: any = {
              pointer: result.pointer,
              outcome: result.verdict
            };

            sources.push(source);
          }

          const result: any = {
            '@type': 'TestResult',
            outcome: rule.metadata.outcome,
            source: sources,
            description: rule.metadata.description,
            date: report.system.date
          }

          const assertion: any = {
            '@type': 'Assertion',
            test: {
              title: rule.name,
              description: rule.description
            },
            mode: 'earl:automatic',
            result
          };

          testSubject.assertions.push(assertion);
        }
      }
    }

    earlReport.graph.push(testSubject);
  }

  return earlReport;
}

export {
  generateSingleReport,
  generateAggregatedReport
};