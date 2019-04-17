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

const { DATABASE_TYPE } = require('@constants');
const DatabaseError = require('@errors/database.error');

/**
 * Database object
 */
class Database {

  constructor(type, name, path, args=[]) {
    this.type = type;
    this.name = name;
    this.path = path;
    this.args = args;
    this.success = false;
  }

  _getName() {
    return this.name;
  }

  _getArgs() {
    return this.args;
  }

  _getPath() {
    return this.path;
  }

  async _saveOutput(output) {
    if (this.type === DATABASE_TYPE.OUTPUT) {
      this.success = await require(this.path).init(this.args, output);
    } else {
      throw new DatabaseError(10, 'Invalid database type');
    }
  }

  _didSucceed() {
    if (this.type === DATABASE_TYPE.OUTPUT) {
      return this.success;
    }

    return null;
  }

  toJson() {
    return _.clone({
      type: this.type,
      name: this.name,
      path: this.path,
      args: this.args
    });
  }
}

module.exports = Database;