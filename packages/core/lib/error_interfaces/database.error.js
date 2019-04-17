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

const QualwebError = require('./qualweb.error');

class DatabaseError extends QualwebError {

  constructor(code, ...params) {
    super(...params);
  }
}

module.exports = DatabaseError;