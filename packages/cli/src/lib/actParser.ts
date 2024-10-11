import { CommandLineOptions } from 'command-line-args';
import setValue from 'set-value';
import type { QualwebOptions } from '@qualweb/core';
import { validateACT, validatePrinciples, validateLevels, printError } from './parserUtils';
import { ACTRJsonFile, readJsonFile, fileExists } from './fileUtils';

async function parseACT(mainOptions: CommandLineOptions, options: QualwebOptions): Promise<void> {
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
    options.modules['act-rules'] = {};
  }

  await validateACTRules(mainOptions, options);
  validateACTExclusions(mainOptions, options);
  validateACTLevels(mainOptions, options);
  validateACTPrinciples(mainOptions, options);
}

function validateModule(mainOptions: CommandLineOptions, options: QualwebOptions): void {
  if (mainOptions.module && options?.modulesToExecute?.['act-rules'] === undefined) {
    printError('The "--act-rules" option doesn\'t match any of the modules selected.');
  } else {
    console.warn('Warning: Module act has options but is not select. Will be select automatically.');
    setValue(options, 'execute.act', true);
  }
}

async function validateACTRules(mainOptions: CommandLineOptions, options: QualwebOptions): Promise<void> {
  if (mainOptions['act-rules'] && options.modules?.['act-rules']) {
    validateModule(mainOptions, options);

    if (mainOptions['act-rules'].length === 1) {
      if (await fileExists(mainOptions['act-rules'][0])) {
        const rules = <ACTRJsonFile>await readJsonFile(mainOptions['act-rules'][0]);
        options.modules['act-rules'].include = [...(rules['act-rules'].include ?? [])];
      } else {
        options.modules['act-rules'].include = [...mainOptions['act-rules']];
      }
    } else {
      options.modules['act-rules'].include = [...mainOptions['act-rules']];
    }

    validateACT(options.modules['act-rules'].include);
  }
}

function validateACTExclusions(mainOptions: CommandLineOptions, options: QualwebOptions): void {
  if (mainOptions['exclude-act'] && options.modules?.['act-rules']) {
    validateModule(mainOptions, options);
    options.modules['act-rules'].exclude = [...mainOptions['exclude-act']];
    validateACT(options.modules['act-rules'].exclude);
  }
}

function validateACTLevels(mainOptions: CommandLineOptions, options: QualwebOptions): void {
  if (mainOptions['act-levels'] && options.modules?.['act-rules']) {
    validateModule(mainOptions, options);
    options.modules['act-rules'].levels = [...mainOptions['act-levels']];
    validateLevels(options.modules['act-rules'].levels);
  }
}

function validateACTPrinciples(mainOptions: CommandLineOptions, options: QualwebOptions): void {
  if (mainOptions['act-principles'] && options.modules?.['act-rules']) {
    validateModule(mainOptions, options);
    options.modules['act-rules'].principles = [...mainOptions['act-principles']];
    validatePrinciples(options.modules['act-rules'].principles);
  }
}

export = parseACT;
