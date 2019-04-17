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

// requires
const _ = require('lodash');
const dset = require('dset');
const dget = require('dget');

/**
 * Metadata object
 */
class Metadata {
	
  constructor() {
    this.metadata = {};
  }

  _add(key, value) {
    dset(this.metadata, key, value);
  }

  _conditionalAdd(key, value) {
    if (dget(this.metadata, key) === undefined) {
      dset(this.metadata, key, value);
    }
  }

  _get(key) {
    return _.clone(dget(this.metadata, key));
  }

  toJson() {
    return _.clone(this.metadata);
  }
}

module.exports = Metadata;