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
const _ = require('lodash');

const ManagerError = require('@errors/manager.error');

const { 
  STARTUP_SYSTEM_VALIDATORS,
  SYSTEM_CONFIG_PATH,
  DEBUG_TYPE
} = require('@constants');

const { file_exists } = require('@util');
const system = require('@system');

const _check_logs_directory = require(STARTUP_SYSTEM_VALIDATORS + '_check_logs_directory');

const init_startup_manager = async commands => {
  system.print('System startup', DEBUG_TYPE.EXECUTION);

  const system_config_file_exists = await file_exists(SYSTEM_CONFIG_PATH);

  if (!system_config_file_exists) {
    throw new ManagerError(201, `Global "config.json" not found`);
  }



  system.print('Done... No errors found'.green, DEBUG_TYPE.EXECUTION);
}

module.exports = init_startup_manager;