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

const _ = require('lodash');
const moment = require('moment');

const { write_to_file } = require('@util');

const {
  SYSTEM_LOG_PATH,
  DEBUG_TYPE 
} = require('@constants');

const Evaluation = require('@data/evaluation.object');
const Time = require('@data/time.object');

/* GLOBAL VARIABLES */
var _debug = DEBUG_TYPE.ERRORS;

/* TIMES */
var _times = {
  startup: null,
  systemModules: null,
  preProcessingModules: null,
  evaluationModules: null,
  modules: {
    system: {}
  }
};

const EVALUATION = new Evaluation();

/* TIMES FUNCTIONS START */
module.exports.setPhaseInitTime = phase => {
  _times[phase] = new Time(_.now());
}

module.exports.setPhaseFinitTime = phase => {
  _times[phase]._setEnd(_.now());
}

module.exports.setModuleInitTime = module => {
  _times.modules.system[module] = new Time(_.now());
}

module.exports.setModuleFinitTime = module => {
  _times.modules.system[module]._setEnd(_.now());
}
/* TIMES FUNCTIONS END */

module.exports.print = (message, priority, type=1) => {
  if (_debug === priority || _debug === DEBUG_TYPE.ALL || priority === DEBUG_TYPE.ERRORS) {
    if (type === 1) {
      console.log(message);
    } else {
      process.stdout.write(message);
    }
  }
}

/**
 * Logs errors from the system to the "logs" folder
 * @param  any type - error
 */
module.exports.logError = async error => {
  const date = moment(new Date(error.date)).format('DD/MM/YYYY HH:mm:ss');
  
  await write_to_file(SYSTEM_LOG_PATH, `${date} - ${error.stack}\n`);
}