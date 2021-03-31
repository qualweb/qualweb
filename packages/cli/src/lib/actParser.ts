import { validateACT, validatePrinciples, validateLevels, printError } from './parserUtils';
import { ACTRJsonFile, readJsonFile, fileExists } from './fileUtils';
import { CommandLineOptions } from 'command-line-args';
import { QualwebOptions } from '@qualweb/core';
import setValue from 'set-value';

async function parseACT(mainOptions: CommandLineOptions, options: QualwebOptions): Promise<void> {
  options['act-rules'] = {};

  await validateACTRules(mainOptions, options);
  validateACTExclusions(mainOptions, options);
  validateACTLevels(mainOptions, options);
  validateACTPrinciples(mainOptions, options);

  if (Object.keys(options['act-rules']).length === 0) {
    delete options['act-rules'];
  }
}

function validateModule(mainOptions: CommandLineOptions, options: QualwebOptions): void {
  if (mainOptions.module && options?.execute?.act === undefined) {
    printError('The "--act-rules" option doesn\'t match any of the modules selected.');
  } else {
    console.warn('Warning: Module act has options but is not select. Will be select automatically.');
    setValue(options, 'execute.act', true);
  }
}

async function validateACTRules(mainOptions: CommandLineOptions, options: QualwebOptions): Promise<void> {
  if (mainOptions['act-rules'] && options['act-rules']) {
    validateModule(mainOptions, options);

    if (mainOptions['act-rules'].length === 1) {
      if (await fileExists(mainOptions['act-rules'][0])) {
        const rules = <ACTRJsonFile>await readJsonFile(mainOptions['act-rules'][0]);
        options['act-rules'].rules = [...(rules['act-rules'].rules ?? [])];
      } else {
        options['act-rules'].rules = [...mainOptions['act-rules']];
      }
    } else {
      options['act-rules'].rules = [...mainOptions['act-rules']];
    }

    validateACT(options['act-rules'].rules);
  }
}

function validateACTExclusions(mainOptions: CommandLineOptions, options: QualwebOptions): void {
  if (mainOptions['exclude-act'] && options['act-rules']) {
    validateModule(mainOptions, options);
    options['act-rules'].exclude = [...mainOptions['exclude-act']];
    validateACT(options['act-rules'].exclude);
  }
}

function validateACTLevels(mainOptions: CommandLineOptions, options: QualwebOptions): void {
  if (mainOptions['act-levels'] && options['act-rules']) {
    validateModule(mainOptions, options);
    options['act-rules'].levels = [...mainOptions['act-levels']];
    validateLevels(options['act-rules'].levels);
  }
}

function validateACTPrinciples(mainOptions: CommandLineOptions, options: QualwebOptions): void {
  if (mainOptions['act-principles'] && options['act-rules']) {
    validateModule(mainOptions, options);
    options['act-rules'].principles = [...mainOptions['act-principles']];
    validatePrinciples(options['act-rules'].principles);
  }
}

export = parseACT;
