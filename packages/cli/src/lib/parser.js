'use strict';

const _ = require('lodash');
const cursor = require('ansi')(process.stdout);

const printHelp = require('./help');

module.exports = async args => {
  if (_.size(args) === 0) {
    cursor.red();
    console.error('No input commands found!')
    cursor.reset();
    process.exit(1);
  } else if (_.includes(['-v', '--version'], args[0])) {
    printVersion();
  } else if (_.includes(['-h', '--help'], args[0])) {
    await printHelp();
    process.exit(0);
  }
}

const printVersion = () => {
  const cliPackage = require('../package.json');
  console.log(`QualWeb cli installed version: ${cliPackage.version}`);

  const cwd = process.cwd();

  if (_.includes(cwd, '@qualweb\\core')) {
    let corePath = _.split(cwd, '\\');
    const corePackage = require(`${_.join(_.slice(corePath, 0, _.indexOf(corePath, '@qualweb') + 2), '\\')}\\package.json`);
    console.log(`QualWeb core installed version: ${corePackage.version}`);
  }

  process.exit(0);
}