import { Assertion, TestResult, ResultSource } from '@qualweb/earl-reporter';
import { BestPractice, BestPracticesReport } from '@qualweb/best-practices';

async function BestPracticesReportToEARL(report: BestPracticesReport, date?: string): Promise<Assertion[]> {
  const assertions = new Array<Assertion>();

  for (const bpName in report.assertions || {}) {
    if (report.assertions[bpName]) {
      const bestPractice = report.assertions[bpName];
      if (bestPractice) {
        const sources = generateSources(bestPractice);

        const result: TestResult = {
          '@type': 'TestResult',
          outcome: 'earl:' + (bestPractice.metadata.outcome !== 'warning' ? bestPractice.metadata.outcome : 'cantTell'),
          source: sources,
          description: bestPractice.metadata.description,
          date: date || new Date().toISOString().replace(/T/, ' ').replace(/\..+/, '')
        };

        const assertion: Assertion = {
          '@type': 'Assertion',
          test: {
            '@id': bestPractice.metadata.url || bestPractice.name,
            '@type': 'TestCase',
            title: bestPractice.name,
            description: bestPractice.description
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

function generateSources(bestPractice: BestPractice): Array<ResultSource> {
  const sources = new Array<ResultSource>();

  for (const result of bestPractice.results || []) {
    const source: ResultSource = {
      result: {
        pointer: result.pointer,
        outcome: 'earl:' + (result.verdict !== 'warning' ? result.verdict : 'cantTell')
      }
    };

    sources.push(source);
  }

  return sources;
}

export = BestPracticesReportToEARL;
