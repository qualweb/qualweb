const baseOptions = require('../../.mocharc.base.js');

module.exports = {
    ...baseOptions,
  require: 'ts-node/register', 
  extension: ['ts'],
  spec: ['test/**/*.spec.ts'],
};
