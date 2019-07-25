'use strict';

import _ from 'lodash';
import { parse_arguments } from './lib/parser';
/*import { validate_options } from './lib/validator';
import { print_version } from './lib/version';
import { print_help } from './lib/help';*/
import { save_report } from './lib/save';

import { evaluate, generateEarlReport, EvaluationReport } from '@qualweb/core';
import { EarlReport } from '@qualweb/earl-reporter';

async function cli(args: string[]): Promise<void> {
  try {
    const options = await parse_arguments(args);
    /*await validate_options(options);

    if (args.includes('-v') || args.includes('--version')) {
      await print_version();
    } else if (args.includes('-h') || args.includes('--help')) {
      await print_help();
    } else {
      const report = await evaluate(options);
      await save_report(report);
    }*/

    //TODO: implementar aceitar ficheiro de urls como input

    if (options['act-rules'] || options['act-principles'] || options['act-levels']) {
      const rules = _.clone(options['act-rules']);
      const principles = _.clone(options['act-principles']);
      const levels = _.clone(options['act-levels']);

      options['act-rules'] = {
        rules: rules ? rules.split(',') : undefined,
        principles: principles ? principles.split(',') : undefined,
        levels: levels ? levels.split(','): undefined
      };
    }

    if (options['u']) {
      const report = await evaluate({ url: options['u'] , 'act-rules': options['act-rules'] });

      if (options['r']) {
        if (options['r'] === 'earl') {
          const earlReport = await generateEarlReport();
          await save_report(options['u'], <EarlReport> earlReport);
        } else {
          throw new Error('Invalid reporter format');
        } 
      } else {
        await save_report(options['u'], <EvaluationReport> report);
      }
    } else if (options['f']) {
      const reports = <EvaluationReport[]> await evaluate({ file: options['f'], 'act-rules': options['act-rules'] });
      
      if (options['r']) {
        if (options['r'] === 'earl') {
          const earlReports = <EarlReport[]> await generateEarlReport();
          for (const earlReport of earlReports || []) {
            await save_report(earlReport.graph[0].source, earlReport);
          }
        } else if (options['r'] === 'earl-a') {
          const earlReport = <EarlReport> await generateEarlReport({ aggregated: true });
          await save_report('aggregated_' + earlReport.graph[0].source, earlReport);
        } else {
          throw new Error('Invalid reporter format');
        }
      } else {
        for (const report of reports || []) {
          await save_report(report.system.url.completeUrl, report);
        }
      }
    }
  } catch (err) {
    //console.error(err);
  }
}

export = cli;