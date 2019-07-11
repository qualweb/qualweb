'use strict';

import _ from 'lodash';

//import parse_arguments from './lib/parser.js';

async function init(args: any): Promise<void> {
  //await parse_arguments(args);
  
  const cwd = process.cwd();

  if (_.includes(cwd, '@qualweb\\core')) {
    if (_.includes(args, '-g')) {
      
    }
    console.log('yey');
  } else {
    console.error('ERROR: Wrong directory');
  }
  console.log(cwd);
}

export = init;