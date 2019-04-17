/**
 * Author: João Afonso Vicente
 * 
 * Description: 
 *
 * Notes:
 *
 * Last modified: 21/02/2019
 */
'use strict';

const _ = require('lodash');

class QualwebError extends Error {
  
  constructor(code, ...params) {
    super(...params);

    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, QualwebError);
    }

    this.code = code;
    this.date = _.now();
  }
}

module.exports = QualwebError;