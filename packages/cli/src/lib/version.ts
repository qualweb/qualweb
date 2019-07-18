'use strict';

import _ from 'lodash';

async function print_version(): Promise<void> {
  const cliPackage = require('../package.json');
  console.log(`QualWeb cli installed version: ${cliPackage.version}`);

  const cwd = process.cwd();

  if (_.includes(cwd, '@qualweb\\core')) {
    let corePath = _.split(cwd, '\\');
    const corePackage = require(`${_.join(_.slice(corePath, 0, _.indexOf(corePath, '@qualweb') + 2), '\\')}\\package.json`);
    console.log(`QualWeb core installed version: ${corePackage.version}`);
  }
}

export {
  print_version
};