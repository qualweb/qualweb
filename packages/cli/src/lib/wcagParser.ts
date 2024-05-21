import { validateWCAG, validatePrinciples, validateLevels, printError } from './parserUtils';
import { readJsonFile, fileExists, WCAGTJsonFile } from './fileUtils';
import { CommandLineOptions } from 'command-line-args';
import type { QualwebOptions } from '@shared/types';
import setValue from 'set-value';

async function parseWCAG(mainOptions: CommandLineOptions, options: QualwebOptions): Promise<void> {
  options['wcag-techniques'] = {};

  await validateWCAGTechniques(mainOptions, options);
  validateWCAGExclusions(mainOptions, options);
  validateWCAGLevels(mainOptions, options);
  validateWCAGPrinciples(mainOptions, options);

  if (Object.keys(options['wcag-techniques']).length === 0) {
    delete options['wcag-techniques'];
  }
}

function validateModule(mainOptions: CommandLineOptions, options: QualwebOptions): void {
  if (mainOptions.module && options?.execute?.wcag === undefined) {
    printError('The "--wcag-techniques" option doesn\'t match any of the modules selected.');
  } else {
    console.warn('Warning: Module wcag has options but is not select. Will be select automatically.');
    setValue(options, 'execute.wcag', true);
  }
}

async function validateWCAGTechniques(mainOptions: CommandLineOptions, options: QualwebOptions): Promise<void> {
  if (mainOptions['wcag-techniques'] && options['wcag-techniques']) {
    validateModule(mainOptions, options);

    if (mainOptions['wcag-techniques'].length === 1) {
      if (await fileExists(mainOptions['wcag-techniques'][0])) {
        const techniques = <WCAGTJsonFile>await readJsonFile(mainOptions['wcag-techniques'][0]);
        options['wcag-techniques'].include = [...(techniques['wcag-techniques'].include ?? [])];
      } else {
        options['wcag-techniques'].include = [...mainOptions['wcag-techniques']];
      }
    } else {
      options['wcag-techniques'].include = [...mainOptions['wcag-techniques']];
    }

    validateWCAG(options['wcag-techniques'].include);
  }
}

function validateWCAGExclusions(mainOptions: CommandLineOptions, options: QualwebOptions): void {
  if (mainOptions['exclude-wcag'] && options['wcag-techniques']) {
    validateModule(mainOptions, options);
    options['wcag-techniques'].exclude = [...mainOptions['exclude-wcag']];
    validateWCAG(options['wcag-techniques'].exclude);
  }
}

function validateWCAGLevels(mainOptions: CommandLineOptions, options: QualwebOptions): void {
  if (mainOptions['wcag-levels'] && options['wcag-techniques']) {
    validateModule(mainOptions, options);
    options['wcag-techniques']['levels'] = [...mainOptions['wcag-levels']];
    validateLevels(options['wcag-techniques'].levels);
  }
}

function validateWCAGPrinciples(mainOptions: CommandLineOptions, options: QualwebOptions): void {
  if (mainOptions['wcag-principles'] && options['wcag-techniques']) {
    validateModule(mainOptions, options);
    options['wcag-techniques'].principles = [...mainOptions['wcag-principles']];
    validatePrinciples(options['wcag-techniques'].principles);
  }
}

export = parseWCAG;
