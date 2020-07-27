import * as core from '@qualweb/core';
import { EarlOptions } from '@qualweb/earl-reporter';

import parse from './lib/parser';
import { saveReport } from './lib/fileUtils';
import { printHelp } from './lib/parserUtils';

async function cli(): Promise<void> {
  try {
    const options = await parse();

    const reportType = options['r'];
    const saveName = options['save-name'];
    delete options['r'];
    delete options['save-name'];

    await core.start();
    const reports = await core.evaluate(options);
    await core.stop();

    if (reportType) {
      if (reportType === 'earl') {
        const earlReports = await core.generateEarlReport();
        for (const url in earlReports || {}) {
          saveReport(url, earlReports[url]);
        }
      } else if (reportType === 'earl-a') {
        const earlOptions: EarlOptions = { aggregated: true, aggregatedName: saveName };
        if (options.execute) {
          earlOptions.modules = {};
          earlOptions.modules.act = !!options?.execute?.act;
          earlOptions.modules.html = !!options?.execute?.html;
          earlOptions.modules.css = !!options?.execute?.css;
          earlOptions.modules['best-practices'] = !!options?.execute?.bp;
        }

        const earlReport = await core.generateEarlReport(earlOptions);
        const name = Object.keys(earlReport)[0];
        saveReport(name, earlReport[name], !!saveName);
      } else {
        throw new Error('Invalid reporter format');
      }
    } else {
      for (const url in reports || {}) {
        delete reports[url].system.page.dom.source.html.parsed;
        saveReport(url, reports[url]);
      }
    }
  } catch (err) {
    if(err?.message === 'Invalid input method'){
      printHelp();
    } else {
      console.error(err);
    }
  }

  process.exit(0);
}

export = cli;
