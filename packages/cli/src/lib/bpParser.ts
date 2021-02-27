import { validateBP, printError } from './parserUtils';
import { readJsonFile, fileExists } from './fileUtils';
import { CommandLineOptions } from 'command-line-args';
import { QualwebOptions } from '@qualweb/core';
import clone from 'lodash.clone';

async function parseBP(mainOptions: CommandLineOptions, options: QualwebOptions): Promise<void> {
  options['best-practices'] = {};

  if (mainOptions['best-practices']) {
    if (mainOptions.module && options?.execute?.bp === undefined) {
      printError('The "--best-practices" option doesn\'t match any of the modules selected.');
    } else if (!mainOptions.module) {
      console.log('Warning: Module bp has options but is not select. Will be select automatically');
      if (!options.execute) {
        options.execute = {};
      }
      options.execute.bp = true;
    }

    if (mainOptions['best-practices'].length === 1) {
      if (await fileExists(mainOptions['best-practices'][0])) {
        const bps = await readJsonFile(mainOptions['best-practices'][0]);
        options['best-practices'].bestPractices = clone(bps['best-practices']['bestPractices']);
      } else {
        options['best-practices'].bestPractices = clone(mainOptions['best-practices']);
      }
    } else {
      options['best-practices'].bestPractices = clone(mainOptions['best-practices']);
    }

    validateBP(options['best-practices'].bestPractices);
  }

  if (mainOptions['exclude-bp']) {
    if (mainOptions.module && options?.execute?.bp === undefined) {
      printError('The "--best-practices" option doesn\'t match any of the modules selected.');
    } else if (!mainOptions.module) {
      console.log('Warning: Module bp has options but is not select. Will be select automatically');
      if (!options.execute) {
        options.execute = {};
      }
      options.execute.bp = true;
    }

    if (mainOptions['exclude-bp'].length === 1) {
      if (await fileExists(mainOptions['exclude-bp'][0])) {
        const bps = await readJsonFile(mainOptions['exclude-bp'][0]);
        options['best-practices'].exclude = clone(bps['best-practices'].exclude);
      } else {
        options['best-practices'].exclude = clone(mainOptions['exclude-bp']);
      }
    } else {
      options['best-practices'].exclude = clone(mainOptions['exclude-bp']);
    }

    validateBP(options['best-practices'].exclude);
  }

  if (Object.keys(options['best-practices']).length === 0) {
    delete options['best-practices'];
  }
}

export = parseBP;
