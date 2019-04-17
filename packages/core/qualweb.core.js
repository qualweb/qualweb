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

// requires
require('module-alias/register');
require('colors');

const _ = require('lodash');

const system = require('@system');

// error interfaces
const QualwebError = require('@errors/qualweb.error');

// internal sub modules
const init_startup_manager = require('@managers/startup.manager');

const evaluate = async commands => {
  try {
    if (!commands || !(commands instanceof Object) || _.isEqual(commands, {})) {
      throw new QualwebError(100, 'Invalid arguments');
    }

    system.setPhaseInitTime('startup');
    await init_startup_manager(commands);
    system.setPhaseFinitTime('startup');


  } catch (err) {
    await system.logError(err);
  }
}

module.exports.evaluate = evaluate;