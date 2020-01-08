'use strict';

import clone from 'lodash.clone';

function parseArguments(args: string[]): any {
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
        if (options[parseOption(args[i])] === undefined) {
          // saves the option argument with it's respective value
          if (args[i+1] === undefined || args[i+1].startsWith('-')) {
            options[parseOption(args[i])] = '';
          } else {
            options[parseOption(args[i])] = args[i+1];
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

async function createModuleOptions(module: string, options: any): Promise<any> {
  if (module === 'best-practices' && options[module]) {
    options[module]['bestPractices'] = clone(options[module]);
  } else {
    const mod = module.split('-')[0];
    if (options[module] || options[`${mod}-principles`] || options[`${mod}-levels`]) {
      const rulesTechniques = clone(options[module]);
      const principles = clone(options[`${mod}-principles`]);
      const levels = clone(options[`${mod}-levels`]);

      options[module] = {
        principles: principles ? principles.split(',') : undefined,
        levels: levels ? levels.split(','): undefined
      };
      options[module.endsWith('rules') ? 'rules' : 'techniques'] = rulesTechniques ? rulesTechniques.split(',') : undefined;
    }
  }
}

function parseOption(option: string): string {
  return option.substring(1, option.length);
}

export {
  parseArguments,
  createModuleOptions
};