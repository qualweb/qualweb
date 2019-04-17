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

const QualwebError = require('./qualweb.error');

class EvaluationError extends QualwebError {

  constructor(code, ...params) {
    super(...params);
  }
}

module.exports = EvaluationError;