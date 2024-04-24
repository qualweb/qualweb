import { validateBP, printError } from './parserUtils';
import { BPJsonFile, readJsonFile, fileExists } from './fileUtils';
import { CommandLineOptions } from 'command-line-args';
import type { QualwebOptions } from '@qualweb/lib';
import setValue from 'set-value';

async function parseBP(mainOptions: CommandLineOptions, options: QualwebOptions): Promise<void> {
  options['best-practices'] = {};

  await validateBestPractices(mainOptions, options);
  validateBPExclusions(mainOptions, options);

  if (Object.keys(options['best-practices']).length === 0) {
    delete options['best-practices'];
  }
}

function validateModule(mainOptions: CommandLineOptions, options: QualwebOptions): void {
  if (mainOptions.module && options?.execute?.act === undefined) {
    printError('The "--best-practices" option doesn\'t match any of the modules selected.');
  } else {
    console.warn('Warning: Module bp has options but is not select. Will be select automatically.');
    setValue(options, 'execute.bp', true);
  }
}

async function validateBestPractices(mainOptions: CommandLineOptions, options: QualwebOptions): Promise<void> {
  if (mainOptions['best-practices'] && options['best-practices']) {
    validateModule(mainOptions, options);

    if (mainOptions['best-practices'].length === 1) {
      if (await fileExists(mainOptions['best-practices'][0])) {
        const bps = <BPJsonFile>await readJsonFile(mainOptions['best-practices'][0]);
        options['best-practices'].include = [...(bps['best-practices'].include ?? [])];
      } else {
        options['best-practices'].include = [...mainOptions['best-practices']];
      }
    } else {
      options['best-practices'].include = [...mainOptions['best-practices']];
    }

    validateBP(options['best-practices'].include);
  }
}

function validateBPExclusions(mainOptions: CommandLineOptions, options: QualwebOptions): void {
  if (mainOptions['exclude-bp'] && options['best-practices']) {
    validateModule(mainOptions, options);
    options['best-practices'].exclude = [...mainOptions['exclude-bp']];
    validateBP(options['best-practices'].exclude);
  }
}

export = parseBP;
