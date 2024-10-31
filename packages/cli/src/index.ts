import {
  QualWeb,
  QualwebOptions,
} from '@qualweb/core';
import { type EarlOptions, generateEARLReport } from '@qualweb/earl-reporter';
import type { QualwebReport } from '@qualweb/core';
import { parse } from './lib/parser';
import { saveReport } from './lib/fileUtils';
import { printHelp } from './lib/parserUtils';

export async function cli(): Promise<void> {
  try {
    const options = await parse();

    const qualweb = new QualWeb({ adBlock: true, stealth: true });

    await qualweb.start(
      { maxConcurrency: options.maxParallelEvaluations, timeout: options.timeout },
      { args: ['--no-sandbox', '--ignore-certificate-errors'] }
    );

    // FIXME: why is there are hard-coded exclude here?
    // options.modules['wcag-techniques'].exclude = ['QW-WCAG-T16'];

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

async function handleReporting(reports: Record<string, QualwebReport>, options: QualwebOptions): Promise<void> {
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
      const report = <QualwebReport>reports[url];
      await saveReport(url, report);
    }
  }
}

function checkEarlOptions(options: QualwebOptions, saveName?: string): EarlOptions {
  const earlOptions: EarlOptions = { aggregated: true, aggregatedName: saveName };

  if (options.modules.length > 0) {
    earlOptions.modules = {};

    if (options.modules.find(m => m.name === 'act-rules')) {
      earlOptions.modules.act = true;
    }

    if (options.modules.find(m => m.name === 'wcag-techniques')) {
      earlOptions.modules.wcag = true;
    }

    if (options.modules.find(m => m.name === 'best-practices')) {
      earlOptions.modules['best-practices'] = true;
    }
  }

  return earlOptions;
}
