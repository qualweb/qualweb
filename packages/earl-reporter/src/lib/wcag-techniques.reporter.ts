import { Assertion, TestResult, ResultSource } from '@qualweb/earl-reporter';
import { WCAGTechnique, WCAGTechniquesReport } from '@qualweb/wcag-techniques';

async function WCAGTechniquesReportToEARL(report: WCAGTechniquesReport, date?: string): Promise<Assertion[]> {
  const assertions = new Array<Assertion>();

  for (const techniqueName in report.assertions || {}) {
    if (report.assertions[techniqueName]) {
      const technique = report.assertions[techniqueName];
      if (technique) {
        const sources = generateSources(technique);

        const result: TestResult = {
          '@type': 'TestResult',
          outcome: 'earl:' + (technique.metadata.outcome !== 'warning' ? technique.metadata.outcome : 'cantTell'),
          source: sources,
          description: technique.metadata.description,
          date: date ? date : new Date().toISOString().replace(/T/, ' ').replace(/\..+/, '')
        };

        const assertion: Assertion = {
          '@type': 'Assertion',
          test: {
            '@id': technique.metadata.url,
            '@type': 'TestCase',
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

function generateSources(technique: WCAGTechnique): Array<ResultSource> {
  const sources = new Array<ResultSource>();

  for (const result of technique.results || []) {
    const source: ResultSource = {
      result: {
        pointer: result.elements?.map((e) => e.pointer).join(', '),
        outcome: 'earl:' + (result.verdict !== 'warning' ? result.verdict : 'cantTell')
      }
    };

    sources.push(source);
  }

  return sources;
}

export = WCAGTechniquesReportToEARL;
