'use strict';

const fs = require('fs');
const _ = require('lodash');

const parse_arguments = require('./lib/parser.js');

module.exports.init = async args => {
  await parse_arguments(args);
  
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