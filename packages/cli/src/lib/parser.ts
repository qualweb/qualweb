'use strict';

import { QualwebOptions } from '@qualweb/core';

async function parse_arguments(args: string[]): Promise<QualwebOptions> {
  const options: any = {};

  if (args.length === 0) {
    throw new Error('No input commands found!')
  } else {
    if (args.length === 1) {
      options.url = args[0];
    } else {
      for (let i = 0 ; i < args.length ; i++) {
        // checks if there are two value arguments followed 
        if (!args[i].startsWith('-') || args[i].length < 2) {
          console.warn(`The argument "${args[i]}" is not a valid option`);
          continue;
        }
        // checks if the option is not duplicated
        if (options[parse_option(args[i])] === undefined) {
          // saves the option argument with it's respective value
          if (args[i+1] === undefined || args[i+1].startsWith('-')) {
            options[parse_option(args[i])] = '';
          } else {
            options[parse_option(args[i])] = args[i+1];
            i++;
          }
        } else {
          console.warn(`Duplicate option "${args[i]}"`);
          // ignores the value of the duplicated option
          if (!args[i+1].startsWith('-')) {
            i++;
          }
        }
      }
    }
  }

  return options;
}

async function create_module_options(module: string, options: QualwebOptions): Promise<any> {
  console.log(module);
  console.log(options);
}

function parse_option(option: string): string {
  return option.substring(1, option.length);
}

export {
  parse_arguments,
  create_module_options
};