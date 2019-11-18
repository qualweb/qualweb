'use strict';

import { evaluate, generateEarlReport } from '@qualweb/core';
import { EarlOptions } from '@qualweb/earl-reporter';

import { parseArguments, createModuleOptions } from './lib/parser';
import { saveReport } from './lib/save';

async function cli(args: string[]): Promise<void> {
  try {
    const options = await parseArguments(args);


    createModuleOptions('act-rules', options);
    createModuleOptions('html-techniques', options);
    createModuleOptions('css-techniques', options);

    if (Object.keys(options).length >= 1) {
      if (options.u) {
        options.url = options.u;
        delete options.u;
      } else if (options.f) {
        options.file = options.f;
        delete options.f;
      } else if (options.c) {
        options.crawl = options.c;
        delete options.c;
      }
    }

    if (options.m) {
      options.execute=[];
      if (options.m.includes(',')) {
        const modules = options.m.split(',');
        for (const mod of modules || []) {
          options.execute[mod] = true;
        }
      } else {
        options.execute[options.m] = true;
      }
    }

    const reports = await evaluate(options);

    if (options.r) {
      if (options.r === 'earl') {
        const earlReports = await generateEarlReport();
        for (const earlReport of earlReports || []) {
          await saveReport(earlReport.graph[0].source, earlReport);
        }
      } else if (options.r === 'earl-a') {
        const earlOptions: EarlOptions = { aggregated: true };
        if (options.m) {
          earlOptions.modules = {};
          earlOptions.modules.act = !!options.execute.act;
          earlOptions.modules.html = !!options.execute.html;
          earlOptions.modules.css = !!options.execute.css;
          earlOptions.modules['best-practices'] = !!options.execute.bp;
        }

        const earlReports = await generateEarlReport(earlOptions);
        await saveReport('aggregated_' + options.crawl ? options.crawl : earlReports[0].graph[0].source, earlReports[0]);
      } else {
        throw new Error('Invalid reporter format');
      }
    } else {
      for (const report of reports || []) {
        await saveReport(report.system.url.completeUrl, report);
      }
    }
  } catch (err) {
    console.error(err);
  }
}

export = cli;
