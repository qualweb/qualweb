import { ACTRule, ACTRulesReport } from '@qualweb/act-rules';
import { Assertion, TestResult, ResultSource } from '@qualweb/earl-reporter';

async function ACTRulesReportToEARL(report: ACTRulesReport, date?: string): Promise<Assertion[]> {
  const assertions = new Array<Assertion>();

  for (const ruleName in report.assertions || {}) {
    if (report.assertions[ruleName]) {
      const rule = report.assertions[ruleName];
      if (rule) {
        const sources = generateSources(rule);

        const result: TestResult = {
          '@type': 'TestResult',
          outcome: 'earl:' + (rule.metadata.outcome !== 'warning' ? rule.metadata.outcome : 'cantTell'),
          source: sources,
          description: rule.metadata.description,
          date: date ? date : new Date().toISOString().replace(/T/, ' ').replace(/\..+/, '')
        };

        const assertion: Assertion = {
          '@type': 'Assertion',
          test: {
            '@id': rule.metadata.url,
            '@type': 'TestCase',
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

function generateSources(rule: ACTRule): Array<ResultSource> {
  const sources = new Array<ResultSource>();

  for (const result of rule.results || []) {
    const source: ResultSource = {
      result: {
        pointer: result.elements
          ?.filter((e) => e.pointer !== undefined)
          .map((e) => e.pointer)
          .join(', '),
        outcome: 'earl:' + (result.verdict !== 'warning' ? result.verdict : 'cantTell')
      }
    };

    sources.push(source);
  }

  return sources;
}

export = ACTRulesReportToEARL;
