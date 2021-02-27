import { validateACT, validatePrinciples, validateLevels, printError } from './parserUtils';
import { readJsonFile, fileExists } from './fileUtils';
import { CommandLineOptions } from 'command-line-args';
import { QualwebOptions } from '@qualweb/core';
import clone from 'lodash.clone';
import setValue from 'set-value';

const WARNING_MESSAGE = 'Warning: Module act has options but is not select. Will be select automatically';

async function parseACT(mainOptions: CommandLineOptions, options: QualwebOptions): Promise<void> {
  options['act-rules'] = {};

  await validateACTRules(mainOptions, options);
  await validateACTExclusions(mainOptions, options);
  await validateACTLevels(mainOptions, options);
  await validateACTPrinciples(mainOptions, options);

  if (Object.keys(options['act-rules']).length === 0) {
    delete options['act-rules'];
  }
}

async function validateACTRules(mainOptions: CommandLineOptions, options: QualwebOptions): Promise<void> {
  if (mainOptions['act-rules'] && options['act-rules']) {
    if (mainOptions.module && options?.execute?.act === undefined) {
      printError('The "--act-rules" option doesn\'t match any of the modules selected.');
    } else if (!mainOptions.module) {
      console.warn(WARNING_MESSAGE);
      setValue(options, 'execute.act', true);
    }

    if (mainOptions['act-rules'].length === 1) {
      if (await fileExists(mainOptions['act-rules'][0])) {
        const rules = await readJsonFile(mainOptions['act-rules'][0]);
        options['act-rules'].rules = clone(rules['act-rules'].rules);
      } else {
        options['act-rules'].rules = clone(mainOptions['act-rules']);
      }
    } else {
      options['act-rules'].rules = clone(mainOptions['act-rules']);
    }

    validateACT(options['act-rules'].rules);
  }
}

async function validateACTExclusions(mainOptions: CommandLineOptions, options: QualwebOptions): Promise<void> {
  if (mainOptions['exclude-act'] && options['act-rules']) {
    if (mainOptions.module && options?.execute?.act === undefined) {
      printError('The "--act-rules" option doesn\'t match any of the modules selected.');
    } else if (!mainOptions.module) {
      console.warn(WARNING_MESSAGE);
      setValue(options, 'execute.act', true);
    }

    if (mainOptions['exclude-act'].length === 1) {
      if (await fileExists(mainOptions['exclude-act'][0])) {
        const rules = await readJsonFile(mainOptions['exclude-act'][0]);
        options['act-rules'].exclude = clone(rules['act-rules'].exclude);
      } else {
        options['act-rules'].exclude = clone(mainOptions['exclude-act']);
      }
    } else {
      options['act-rules'].exclude = clone(mainOptions['exclude-act']);
    }

    validateACT(options['act-rules'].exclude);
  }
}

async function validateACTLevels(mainOptions: CommandLineOptions, options: QualwebOptions): Promise<void> {
  if (mainOptions['act-levels'] && options['act-rules']) {
    if (mainOptions.module && options?.execute?.act === undefined) {
      printError('The "--act-levels" option doesn\'t match any of the modules selected.');
    } else if (!mainOptions.module) {
      console.warn(WARNING_MESSAGE);
      if (!options.execute) {
        options.execute = {};
      }
      options.execute.act = true;
    }

    options['act-rules'].levels = clone(mainOptions['act-levels']);

    if (options['act-rules'].levels) {
      validateLevels(options['act-rules'].levels);
    }
  }
}

async function validateACTPrinciples(mainOptions: CommandLineOptions, options: QualwebOptions): Promise<void> {
  if (mainOptions['act-principles'] && options['act-rules']) {
    if (mainOptions.module && options?.execute?.act === undefined) {
      printError('The "--act-principles" option doesn\'t match any of the modules selected.');
    } else if (!mainOptions.module) {
      console.warn(WARNING_MESSAGE);
      if (!options.execute) {
        options.execute = {};
      }
      options.execute.act = true;
    }

    options['act-rules'].principles = clone(mainOptions['act-principles']);

    if (options['act-rules'].principles) {
      validatePrinciples(options['act-rules'].principles);
    }
  }
}

export = parseACT;
