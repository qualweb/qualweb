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
const {
  MODULE_TYPE
} = require('@constants');

const ModuleError = require('@errors/module.error');

const Url = require('./url.object');
const Page = require('./page.object');
const Metadata = require('./metadata.object');
const Module = require('./module.object');

/**
 * Evaluation object
 */
class Evaluation {

  constructor() {
    this.url = null;
    this.page = null;
    this.metadata = new Metadata();
    this.preProcessingModules = {};
    this.evaluationModules = {};
  }

  _createModule(type, module, version, api, path) {
    switch (type) {
      case MODULE_TYPE.PRE_PROCESSING:
        this.preProcessingModules[module] = new Module(type, module, version, api, path);
        break;

      case MODULE_TYPE.EVALUATION:
        this.evaluationModules[module] = new Module(type, module, version, api, path);
        break;

      default:
        throw new ModuleError(20, `Invalid module type: ${module} -> ${type}`);
    }
  }

  _getExecModule(type, module) {
    switch (type) {
      case MODULE_TYPE.PRE_PROCESSING:
        return this.preProcessingModules[module];

      case MODULE_TYPE.EVALUATION:
        return this.evaluationModules[module];

      default:
        throw new ModuleError(20, `Invalid module type: ${module} -> ${type}`);
    }
  }

  _getPreProcessingModules() {
    return this.preProcessingModules;
  }

  _getEvaluationModules() {
    return this.evaluationModules;
  }

  _setUrl(inputUrl, protocol, domainName, domain, uri, completeUrl, finalUrl, redirected) {
    this.url = new Url(inputUrl, protocol, domainName, domain, uri, completeUrl, finalUrl, redirected);
  }

  _getUrl() {
    return this.url;
  }

  _setPage(context, userAgent, sourceHTML, postProcessingHTML) {
    this.page = new Page(context, userAgent, sourceHTML, postProcessingHTML);
  }

  _getPage() {
    return this.page;
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

  _addModuleMetadata(type, module, key, value) {
    switch (type) {
      case MODULE_TYPE.PRE_PROCESSING:
        this.preProcessingModules[module]._addMetadata(key, value);
        break;

      case MODULE_TYPE.EVALUATION:
        this.evaluationModules[module]._addMetadata(key, value);
        break;

      default:
        throw new ModuleError(20, `Invalid module type: ${module} -> ${type}`);
    }
  }

  _getModuleMetadata(type, module, key) {
    switch (type) {
      case MODULE_TYPE.PRE_PROCESSING:
        return this.preProcessingModules[module]._getMetadata(key);
      case MODULE_TYPE.EVALUATION:
        return this.evaluationModules[module]._getMetadata(key);

      default:
        throw new ModuleError(20, `Invalid module type: ${module} -> ${type}`);
    }
  }

  _getAllModuleMetadata(type, module) {
    switch (type) {
      case MODULE_TYPE.PRE_PROCESSING:
        return this.preProcessingModules[module]._getAllMetadata();
      case MODULE_TYPE.EVALUATION:
        return this.evaluationModules[module]._getAllMetadata();

      default:
        throw new ModuleError(20, `Invalid module type: ${module} -> ${type}`);
    }
  }

  _addModuleData(type, module, key, value) {
    switch (type) {
      case MODULE_TYPE.PRE_PROCESSING:
        this.preProcessingModules[module]._addData(key, value);
        break;

      case MODULE_TYPE.EVALUATION:
        this.evaluationModules[module]._addData(key, value);
        break;

      default:
        throw new ModuleError(20, `Invalid module type: ${module} -> ${type}`);
    }
  }

  _getModuleData(type, module, key) {
    switch (type) {
      case MODULE_TYPE.PRE_PROCESSING:
        return this.preProcessingModules[module]._getData(key);

      case MODULE_TYPE.EVALUATION:
        return this.evaluationModules[module]._getData(key);

      default:
        throw new ModuleError(20, `Invalid module type: ${module} -> ${type}`);
    }
  }

  _getAllModuleData(type, module) {
    switch (type) {
      case MODULE_TYPE.PRE_PROCESSING:
        return this.preProcessingModules[module]._getALlData();

      case MODULE_TYPE.EVALUATION:
        return this.evaluationModules[module]._getAllData();

      default:
        throw new ModuleError(20, `Invalid module type: ${module} -> ${type}`);
    }
  }

  _reset() {
    this.url = null;
    this.page = null;
    this.metadata = new Metadata();

    for (let mod in this.preProcessingModules) {
      if (mod) {
        this.preProcessingModules[mod]._reset();
      }
    }

    for (let mod in this.evaluationModules) {
      if (mod) {
        this.evaluationModules[mod]._reset();
      }
    }
  }
}

module.exports = Evaluation;