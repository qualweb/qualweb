import { CommandLineOptions } from 'command-line-args';
import setValue from 'set-value';
import type { QualwebOptions } from '@qualweb/core';
import { validateBP, printError } from './parserUtils';
import { BPJsonFile, readJsonFile, fileExists } from './fileUtils';

async function parseBP(mainOptions: CommandLineOptions, options: QualwebOptions): Promise<void> {
  // TODO: revisit the type. It should not be necessary to specify options for
  // all modules if you're only running one.
  if (!options.modules) {
    options.modules = {
      'act-rules': {},
      'best-practices': {},
      'wcag-techniques': {},
      counter: {},
    };
  } else {
    options.modules['best-practices'] = {};
  }

  await validateBestPractices(mainOptions, options);
  validateBPExclusions(mainOptions, options);
}

function validateModule(mainOptions: CommandLineOptions, options: QualwebOptions): void {
  if (mainOptions.module && options?.modulesToExecute?.['act-rules'] === undefined) {
    printError('The "--best-practices" option doesn\'t match any of the modules selected.');
  } else {
    console.warn('Warning: Module bp has options but is not select. Will be select automatically.');
    setValue(options, 'execute.bp', true);
  }
}

async function validateBestPractices(mainOptions: CommandLineOptions, options: QualwebOptions): Promise<void> {
  if (mainOptions['best-practices'] && options.modules?.['best-practices']) {
    validateModule(mainOptions, options);

    if (mainOptions['best-practices'].length === 1) {
      if (await fileExists(mainOptions['best-practices'][0])) {
        const bps = <BPJsonFile>await readJsonFile(mainOptions['best-practices'][0]);
        options.modules['best-practices'].include = [...(bps['best-practices'].include ?? [])];
      } else {
        options.modules['best-practices'].include = [...mainOptions['best-practices']];
      }
    } else {
      options.modules['best-practices'].include = [...mainOptions['best-practices']];
    }

    validateBP(options.modules['best-practices'].include);
  }
}

function validateBPExclusions(mainOptions: CommandLineOptions, options: QualwebOptions): void {
  if (mainOptions['exclude-bp'] && options.modules?.['best-practices']) {
    validateModule(mainOptions, options);
    options.modules['best-practices'].exclude = [...mainOptions['exclude-bp']];
    validateBP(options.modules['best-practices'].exclude);
  }
}

export = parseBP;
