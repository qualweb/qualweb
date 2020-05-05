'use strict';
import { validateCSS, validatePrinciples, validateLevels, printError } from './parserUtils';
import { readJsonFile, fileExists } from './fileUtils';
import clone from 'lodash.clone';

async function parseCSS(mainOptions, options) {
  options['css-techniques'] = {};

  if(mainOptions['css-techniques']){
    if(mainOptions.module && !options['execute']['css']) {
      printError("Wrong module selected.");
    }else{
      console.log("Warning: Module css has options but is not select. Will be select automatically");
      options['execute']["css"] = true;
    }

    if(mainOptions['html-techniques'].length === 1){
      if(await fileExists(mainOptions['css-techniques'][0])){
        let rules = await readJsonFile(mainOptions['css-techniques'][0]);
        options['css-techniques']['techniques'] = clone(rules['css-techniques']['rules']);
      }else{
        options['css-techniques']['techniques'] = clone(mainOptions['css-techniques']);
      }
    }else{
      options['css-techniques']['techniques'] = clone(mainOptions['css-techniques']);
    }

    validateCSS(options['css-techniques']['techniques']);
  }

  if(mainOptions['css-levels']){
    if(mainOptions.module && !options['execute']['css']) {
      printError("Wrong module selected.");
    }else{
      console.log("Warning: Module css has options but is not select. Will be select automatically");
      options['execute']["css"] = true;
    }

    options['css-techniques']['levels'] = clone(mainOptions['css-levels']);
    validateLevels(options['css-techniques']['levels']);
  }

  if(mainOptions['css-principles']){
    if(mainOptions.module && !options['execute']['css']) {
      printError("Wrong module selected.");
    }else{
      console.log("Warning: Module css has options but is not select. Will be select automatically");
      options['execute']["css"] = true;
    }

    options['css-techniques']['principles'] = clone(mainOptions['css-principles']);
    validatePrinciples(options['css-techniques']['principles']);
  }

  if(Object.keys(options['css-techniques']).length === 0){
    delete options['css-techniques'];
  }

  return options;
}

export {
  parseCSS
}