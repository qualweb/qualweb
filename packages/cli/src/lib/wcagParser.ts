import { CommandLineOptions } from 'command-line-args';
import setValue from 'set-value';
import type { ModulesOptions, QualwebOptions } from '@shared/types';
import { validateWCAG, validatePrinciples, validateLevels, printError } from './parserUtils';
import { readJsonFile, fileExists, WCAGTJsonFile } from './fileUtils';

async function parseWCAG(mainOptions: CommandLineOptions, options: QualwebOptions): Promise<void> {
  options.modules ??= {} as ModulesOptions;
  options.modules['wcag-techniques'] = {};

  await validateWCAGTechniques(mainOptions, options);
  validateWCAGExclusions(mainOptions, options);
  validateWCAGLevels(mainOptions, options);
  validateWCAGPrinciples(mainOptions, options);
}

function validateModule(mainOptions: CommandLineOptions, options: QualwebOptions): void {
  if (mainOptions.module && options?.modulesToExecute?.['wcag-techniques'] === undefined) {
    printError('The "--wcag-techniques" option doesn\'t match any of the modules selected.');
  } else {
    console.warn('Warning: Module wcag has options but is not select. Will be select automatically.');
    setValue(options, 'execute.wcag', true);
  }
}

async function validateWCAGTechniques(mainOptions: CommandLineOptions, options: QualwebOptions): Promise<void> {
  if (mainOptions['wcag-techniques'] && options.modules?.['wcag-techniques']) {
    validateModule(mainOptions, options);

    if (mainOptions['wcag-techniques'].length === 1) {
      if (await fileExists(mainOptions['wcag-techniques'][0])) {
        const techniques = <WCAGTJsonFile>await readJsonFile(mainOptions['wcag-techniques'][0]);
        options.modules['wcag-techniques'].include = [...(techniques['wcag-techniques'].include ?? [])];
      } else {
        options.modules['wcag-techniques'].include = [...mainOptions['wcag-techniques']];
      }
    } else {
      options.modules['wcag-techniques'].include = [...mainOptions['wcag-techniques']];
    }

    validateWCAG(options.modules['wcag-techniques'].include);
  }
}

function validateWCAGExclusions(mainOptions: CommandLineOptions, options: QualwebOptions): void {
  if (mainOptions['exclude-wcag'] && options.modules?.['wcag-techniques']) {
    validateModule(mainOptions, options);
    options.modules['wcag-techniques'].exclude = [...mainOptions['exclude-wcag']];
    validateWCAG(options.modules['wcag-techniques'].exclude);
  }
}

function validateWCAGLevels(mainOptions: CommandLineOptions, options: QualwebOptions): void {
  if (mainOptions['wcag-levels'] && options.modules?.['wcag-techniques']) {
    validateModule(mainOptions, options);
    options.modules['wcag-techniques']['levels'] = [...mainOptions['wcag-levels']];
    validateLevels(options.modules['wcag-techniques'].levels);
  }
}

function validateWCAGPrinciples(mainOptions: CommandLineOptions, options: QualwebOptions): void {
  if (mainOptions['wcag-principles'] && options.modules?.['wcag-techniques']) {
    validateModule(mainOptions, options);
    options.modules['wcag-techniques'].principles = [...mainOptions['wcag-principles']];
    validatePrinciples(options.modules['wcag-techniques'].principles);
  }
}

export = parseWCAG;
