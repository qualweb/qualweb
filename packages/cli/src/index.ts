'use strict';

import { parse_arguments } from './lib/parser';
/*import { validate_options } from './lib/validator';
import { print_version } from './lib/version';
import { print_help } from './lib/help';*/
import { save_report } from './lib/save';

import { evaluate, generateEarlReport } from '@qualweb/core';

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

    const report = await evaluate({ url: options['u'] });

    if (options['r']) {
      if (options['r'] === 'earl') {
        const earlReport = await generateEarlReport();
        await save_report(earlReport);
      } else {
        throw new Error('Invalid reporter format');
      } 
    } else {
      await save_report(report);
    }
  } catch (err) {
    console.error(err);
  }
}

export = cli;