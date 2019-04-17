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

// requires
const _ = require('lodash');
const dset = require('dset');

const ModuleError = require('@errors/module.error');

const Metadata = require('./metadata.object');
const Time = require('./time.object');

/**
 * Module object
 */
class Module {

  constructor(type, name, version, api, path) {
    this.type = type;
    this.name = name;
    this.version = version;
    this.api = api;
    this.path = path;

    this.run = false;
    this.success = false;

    this.time = null;
    this.metadata = new Metadata();
    this.data = {};
  }

  async _run(args) {
    if (this.time === null) {
      this.run = true;
      this.time = new Time(_.now());
      this.success = await require(this.path).init(args);
      this.time._setEnd(_.now());
    } else {
      throw new ModuleError(20, `Module ${this.name} is already running`);
    }
  }

  _didSucceed() {
    return this.success;
  }

  _didRun() {
    return this.run;
  }

  _addMetadata(key, value) {
    this.metadata._add(key, value);
  }

  _getMetadata(key) {
    return this.metadata._get(key);
  }

  _getAllMetadata() {
    return this.metadata.toJson();
  }

  _addData(key, value) {
    dset(this.data, key, value);
  }

  _getData(key) {
    return _.get(this.data, key);
  }

  _getAllData() {
    return _.clone(this.data);
  }

  _hasApi() {
    return this.api !== undefined;
  }

  _getApi() {
    return this.api;
  }

  _reset() {
    this.run = false;
    this.success = false;

    this.time = null;
    this.metadata = new Metadata();
    this.data = {};
  }

  toJson() {
    return _.clone({
      name: this.name,
      version: this.version,
      run: this.run,
      success: this.success,
      time: this.time.toJson(),
      metadata: this.metadata.toJson(),
      data: this.data
    });
  }
}

module.exports = Module;