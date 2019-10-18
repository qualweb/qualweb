'use strict';

import { evaluate, generateEarlReport, EvaluationReport } from '@qualweb/core';
import { parseArguments, createModuleOptions } from './lib/parser';
import { saveReport } from './lib/save';
import { EarlReport } from '@qualweb/earl-reporter';

async function cli(args: string[]): Promise<void> {
  try {
    const options = await parseArguments(args);

    createModuleOptions('act-rules', options);
    createModuleOptions('html-techniques', options);
    createModuleOptions('css-techniques', options);

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

    const reports = await evaluate(options);

    if (options['r']) {
      if (options['r'] === 'earl') {
        const earlReports = <EarlReport[]> await generateEarlReport();
        for (const earlReport of earlReports || []) {
          await saveReport(earlReport.graph[0].source, earlReport);
        }
      } else if (options['r'] === 'earl-a') {
        const earlReport = <EarlReport> await generateEarlReport({ aggregated: true });
        await saveReport('aggregated_' + options.crawl ? options.crawl : earlReport.graph[0].source, earlReport);
      } else {
        throw new Error('Invalid reporter format');
      }
    } else {
      for (const report of (<Array<EvaluationReport>> reports || [reports])) {
        await saveReport(report.system.url.completeUrl, report);
      }
    }
  } catch (err) {
    console.error(err);
  }
}

export = cli;