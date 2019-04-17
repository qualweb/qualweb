/**
 * Author: João Afonso Vicente
 * 
 * Description: 
 *
 * Notes:
 *
 * Last modified: 24/06/2017
 */
'use strict';

const EvaluationError = require('./evaluation.error');

class ModuleError extends EvaluationError {

  constructor(code, ...params) {
    super(code, ...params);
  }
}

module.exports = ModuleError;