import { validateCSS, validatePrinciples, validateLevels, printError } from './parserUtils';
import { readJsonFile, fileExists } from './fileUtils';
import { CommandLineOptions } from 'command-line-args';
import { QualwebOptions } from '@qualweb/core';
import clone from 'lodash.clone';

async function parseCSS(mainOptions: CommandLineOptions, options: QualwebOptions): Promise<void> {
  options['css-techniques'] = {};

  if(mainOptions['css-techniques']) {
    if(mainOptions.module && options?.execute?.css === undefined) {
      printError('The "--css-techniques" option doesn\'t match any of the modules selected.');
    } else if (!mainOptions.module) {
      console.log('Warning: Module css has options but is not select. Will be select automatically');
      if (!options.execute){
        options.execute = {};
      }
      options.execute.css = true;
    }

    if(mainOptions['css-techniques'].length === 1) {
      if(await fileExists(mainOptions['css-techniques'][0])){
        const techniques = await readJsonFile(mainOptions['css-techniques'][0]);
        options['css-techniques'].techniques = clone(techniques['css-techniques'].techniques);
      } else {
        options['css-techniques'].techniques = clone(mainOptions['css-techniques']);
      }
    } else {
      options['css-techniques'].techniques = clone(mainOptions['css-techniques']);
    }

    validateCSS(options['css-techniques'].techniques!);
  }

  if(mainOptions['css-levels']) {
    if(mainOptions.module && options?.execute?.css === undefined) {
      printError('The "--css-levels" option doesn\'t match any of the modules selected.');
    } else if (!mainOptions.module) {
      console.log('Warning: Module css has options but is not select. Will be select automatically');
      if (!options.execute){
        options.execute = {};
      }
      options.execute.css = true;
    }

    options['css-techniques'].levels = clone(mainOptions['css-levels']);
    validateLevels(options['css-techniques'].levels!);
  }

  if(mainOptions['css-principles']) {
    if(mainOptions.module && options?.execute?.css === undefined) {
      printError('The "--css-techniques" option doesn\'t match any of the modules selected.');
    } else if (!mainOptions.module) {
      console.log('Warning: Module css has options but is not select. Will be select automatically');
      if (!options.execute){
        options.execute = {};
      }
      options.execute.css = true;
    }

    options['css-techniques'].principles = clone(mainOptions['css-principles']);
    validatePrinciples(options['css-techniques'].principles!);
  }

  if(Object.keys(options['css-techniques']).length === 0){
    delete options['css-techniques'];
  }
}

export = parseCSS;