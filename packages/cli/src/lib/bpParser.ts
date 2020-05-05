'use strict';
import { validateBP, printError } from './parserUtils';
import { readJsonFile, fileExists } from './fileUtils';
import clone from 'lodash.clone';

async function parseBP(mainOptions, options) {
  options['best-practices'] = {};

  if(mainOptions['best-practices']) {
    if(mainOptions.module && !options['execute']['bp']) {
      printError("Wrong module selected.");
    }else{
      console.log("Warning: Module bp has options but is not select. Will be select automatically");
      options['execute']["bp"] = true;
    }

    if(mainOptions['best-practices'].length === 1){
      if(await fileExists(mainOptions['best-practices'][0])){
        let rules = await readJsonFile(mainOptions['best-practices'][0]);
        options['best-practices']['bestPractices'] = clone(rules['best-practices']['bestPractices']);
      }else{
        options['best-practices']['bestPractices'] = clone(mainOptions['best-practices']);
      }
    }else{
      options['best-practices']['bestPractices'] = clone(mainOptions['best-practices']);
    }

    validateBP(options['best-practices']['bestPractices']);
  }

  if(Object.keys(options['best-practices']).length === 0){
    delete options['best-practices'];
  }

  return options;
}

export {
  parseBP
}