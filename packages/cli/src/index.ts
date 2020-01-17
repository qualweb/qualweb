'use strict';

import { evaluate, generateEarlReport } from '@qualweb/core';
import { EarlOptions } from '@qualweb/earl-reporter';

import { parseArguments, createModuleOptions } from './lib/parser';
import { saveReport } from './lib/save';

async function cli(args: string[]): Promise<void> {
  try {
    const options = parseArguments(args);

    createModuleOptions('act-rules', options);
    createModuleOptions('html-techniques', options);
    createModuleOptions('css-techniques', options);
    createModuleOptions('best-practices', options);

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

    if (options.m) {
      options.execute = {};
      if (options.m.includes(',')) {
        const modules = options.m.split(',');
        for (const mod of modules || []) {
          options.execute[mod] = true;
        }
      } else {
        options.execute[options.m] = true;
      }
      
      delete options.m;
    }

    const reports = await evaluate(options);

    if (options.r) {
      if (options.r === 'earl') {
        const earlReports = await generateEarlReport();
        for (const url in earlReports || {}) {
          saveReport(url, earlReports[url]);
        }
      } else if (options.r === 'earl-a') {
        const earlOptions: EarlOptions = { aggregated: true, aggregatedName: options['save-name'] };
        if (options.m) {
          earlOptions.modules = {};
          earlOptions.modules.act = !!options.execute.act;
          earlOptions.modules.html = !!options.execute.html;
          earlOptions.modules.css = !!options.execute.css;
          earlOptions.modules['best-practices'] = !!options.execute.bp;
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
    console.error(err);
  }
}

export = cli;