/**
 * Author: João Afonso Vicente
 * 
 * Description: 
 *
 * Notes:
 *
 * Last modified: 22/02/2019
 */
'use strict';

const QualwebError = require('./qualweb.error');

class ManagerError extends QualwebError {

  constructor(code, ...params) {
    super(code, ...params);
  }
}

module.exports = ManagerError;