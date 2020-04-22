'use strict';

import { evaluate, generateEarlReport } from '@qualweb/core';
import { EarlOptions } from '@qualweb/earl-reporter';

import { parse, printHelp } from './lib/parser';
import { saveReport } from './lib/save';

async function cli(): Promise<void> {
  try {

    const options = parse();

    const reports = await evaluate(options);

    if (options['r']) {
      if (options['r'] === 'earl') {
        const earlReports = await generateEarlReport();
        for (const url in earlReports || {}) {
          saveReport(url, earlReports[url]);
        }
      } else if (options['r'] === 'earl-a') {
        const earlOptions: EarlOptions = { aggregated: true, aggregatedName: options['save-name'] };
        if (options['m']) {
          earlOptions.modules = {};
          earlOptions.modules.act = !!options['execute'].act;
          earlOptions.modules.html = !!options['execute'].html;
          earlOptions.modules.css = !!options['execute'].css;
          earlOptions.modules['best-practices'] = !!options['execute'].bp;
        }
        const earlReport = await generateEarlReport(earlOptions);
        const name = Object.keys(earlReport)[0];
        saveReport(name, earlReport[name], !!options['save-name']);
      } else {
        throw new Error('Invalid reporter format');
      }
    } else {
      for (const url in reports || {}) {
        delete reports[url].system.page.dom.source.html.parsed;
        delete reports[url].system.page.dom.stylesheets;
        saveReport(url, reports[url]);
      }
    }
  } catch (err) {
    if(err.message === "Invalid input method"){
      printHelp();
    }else{
      console.error(err);
    }
  }
}

export = cli;