import { validateWCAG, validatePrinciples, validateLevels, printError } from './parserUtils';
import { readJsonFile, fileExists } from './fileUtils';
import { CommandLineOptions } from 'command-line-args';
import { QualwebOptions } from '@qualweb/core';
import clone from 'lodash.clone';

async function parseWCAG(mainOptions: CommandLineOptions, options: QualwebOptions): Promise<void> {
  options['wcag-techniques'] = {};

  if (mainOptions['wcag-techniques']) {
    if (mainOptions.module && options?.execute?.wcag === undefined) {
      printError('The "--html-techniques" option doesn\'t match any of the modules selected.');
    } else {
      console.log('Warning: Module html has options but is not select. Will be select automatically');
      if (!options.execute) {
        options.execute = {};
      }
      options.execute.wcag = true;
    }

    if (mainOptions['wcag-techniques'].length === 1) {
      if (await fileExists(mainOptions['wcag-techniques'][0])) {
        const techniques = await readJsonFile(mainOptions['wcag-techniques'][0]);
        options['wcag-techniques'].techniques = clone(techniques['wcag-techniques'].techniques);
      } else {
        options['wcag-techniques'].techniques = clone(mainOptions['wcah-techniques']);
      }
    } else {
      options['wcag-techniques'].techniques = clone(mainOptions['wcag-techniques']);
    }

    validateWCAG(options['wcag-techniques'].techniques);
  }

  if (mainOptions['wcag-levels']) {
    if (mainOptions.module && options?.execute?.wcag === undefined) {
      printError('The "--wcag-levels" option doesn\'t match any of the modules selected.');
    } else {
      console.log('Warning: Module wcag has options but is not select. Will be select automatically');
      if (!options.execute) {
        options.execute = {};
      }
      options.execute.wcag = true;
    }

    options['wcag-techniques']['levels'] = clone(mainOptions['wcag-levels']);
    validateLevels(options['wcag-techniques'].levels);
  }

  if (mainOptions['wcag-principles']) {
    if (mainOptions.module && options?.execute?.wcag === undefined) {
      printError('The "--wcag-principles" option doesn\'t match any of the modules selected.');
    } else if (!mainOptions.module) {
      console.log('Warning: Module html has options but is not select. Will be select automatically');
      if (!options.execute) {
        options.execute = {};
      }
      options.execute.wcag = true;
    }

    options['wcag-techniques'].principles = clone(mainOptions['wcag-principles']);
    validatePrinciples(options['wcag-techniques'].principles);
  }

  if (Object.keys(options['wcag-techniques']).length === 0) {
    delete options['wcag-techniques'];
  }
}

export = parseWCAG;
