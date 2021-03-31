import { QualWeb, generateEARLReport, EvaluationReport, QualwebOptions } from '@qualweb/core';
import { EarlOptions } from '@qualweb/earl-reporter';
import parse from './lib/parser';
import { saveReport } from './lib/fileUtils';
import { printHelp } from './lib/parserUtils';

async function cli(): Promise<void> {
  try {
    const options = await parse();

    const qualweb = new QualWeb();

    await qualweb.start();
    const reports = await qualweb.evaluate(options);
    await qualweb.stop();

    await handleReporting(reports, options);
  } catch (err) {
    if (err?.message === 'Invalid input method') {
      printHelp();
    } else {
      console.error(err);
    }
  }

  process.exit(0);
}

async function handleReporting(reports: { [url: string]: EvaluationReport }, options: QualwebOptions): Promise<void> {
  const reportType = options.report;
  const saveName = options['save-name'];
  delete options.report;
  delete options['save-name'];

  if (reportType) {
    if (reportType === 'earl') {
      const earlReports = generateEARLReport(reports);
      for (const url in earlReports || {}) {
        await saveReport(url, earlReports[url]);
      }
    } else if (reportType === 'earl-a') {
      const earlOptions = checkEarlOptions(options, saveName);
      const earlReport = generateEARLReport(reports, earlOptions);
      const name = Object.keys(earlReport)[0];
      await saveReport(name, earlReport[name], !!saveName);
    } else {
      throw new Error('Invalid reporter format');
    }
  } else {
    for (const url in reports ?? {}) {
      const report = <EvaluationReport>reports[url];
      await saveReport(url, report);
    }
  }
}

function checkEarlOptions(options: QualwebOptions, saveName?: string): EarlOptions {
  const earlOptions: EarlOptions = { aggregated: true, aggregatedName: saveName };
  if (options.execute) {
    earlOptions.modules = {};
    earlOptions.modules.act = !!options?.execute?.act;
    earlOptions.modules.wcag = !!options?.execute?.wcag;
    earlOptions.modules['best-practices'] = !!options?.execute?.bp;
  }

  return earlOptions;
}

export = cli;
