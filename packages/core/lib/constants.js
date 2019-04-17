/**
 * Author: João Afonso Vicente
 * 
 * Description: 
 *
 * Notes:
 *
 * Last modified: 21/01/2019
 */
'use strict';

/**
 * Console separators
 */
module.exports.ARGUMENT_VALUE_SEPARATOR = ',';
module.exports.DATABASE_VALUE_SEPARATOR = ':';
module.exports.FILE_URL_SEPARATOR = '\n';

/**
 * Folders and files paths
 */
module.exports.ROOT_PATH = __dirname + '/../';

module.exports.MODULES_PATH = __dirname + '/modules/';
module.exports.SYSTEM_MODULES_PATH = this.MODULES_PATH + 'system_modules/';
module.exports.EVALUATION_MODULES_PATH = this.MODULES_PATH + 'evaluation_modules/';
module.exports.PRE_PROCESSING_MODULES_PATH = this.MODULES_PATH + 'pre_processing_modules/';

module.exports.DATABASE_SCRIPTS_PATH = __dirname + '/../database_scripts/';
module.exports.INPUT_DATABASE_SCRIPTS_PATH = this.DATABASE_SCRIPTS_PATH + 'input/';
module.exports.OUTPUT_DATABASE_SCRIPTS_PATH = this.DATABASE_SCRIPTS_PATH + 'output/';

module.exports.UTIL_PATH = __dirname + '/util';
module.exports.SYSTEM_HANDLER_PATH = __dirname + '/system';
module.exports.SYSTEM_CONFIG_PATH = __dirname + '/../config.json';

module.exports.APIS_PATH = __dirname + '/apis/';
module.exports.EVALUATION_API_PATH = this.APIS_PATH + 'evaluation.api';
module.exports.PRE_PROCESSING_API_PATH = this.APIS_PATH + 'preProcessing.api';

module.exports.MANAGERS_PATH = __dirname + '/managers/';
module.exports.STARTUP_SYSTEM_VALIDATORS = this.MANAGERS_SUPPORT_PATH + 'validators/system/';
module.exports.STARTUP_PRE_PROCESSING_VALIDATORS = this.MANAGERS_SUPPORT_PATH + 'validators/pre_processing/';
module.exports.STARTUP_EVALUATION_VALIDATORS = this.MANAGERS_SUPPORT_PATH + 'validators/evaluation/';

module.exports.OUTPUT_CONVERTERS_PATH = __dirname + '/output_converters/';

module.exports.LOGS_PATH = __dirname + '/../logs/';
module.exports.EVALUATION_LOGS_PATH = this.LOGS_PATH + 'evaluation_logs/';
module.exports.PRE_PROCESSING_LOGS_PATH = this.LOGS_PATH + 'pre_processing_logs/';
module.exports.SYSTEM_LOG_PATH = this.LOGS_PATH + 'system.log';

module.exports.DATA_PATH = __dirname + '/data/';
module.exports.EVALUATION_OBJECT_PATH = this.DATA_PATH + 'evaluation.object';

module.exports.ERROR_INTERFACES_PATH = __dirname + '/error_interfaces/';

/**
 * Modules type
 */
module.exports.MODULE_TYPE = {
	SYSTEM: 1,
	PRE_PROCESSING: 2,
	EVALUATION: 3
};

/**
 * Database type
 */
module.exports.DATABASE_TYPE = {
	INPUT: 1,
	OUTPUT: 2
};

/**
 * Output type
 */
module.exports.OUTPUT_TYPE = {
	FILE: 1,
	DATABASE: 2,
  SCREEN: 3
};

/**
 * Debug type
 */
module.exports.DEBUG_TYPE = {
  ERRORS: 1,
  WARNINGS: 2,
  EXECUTION: 3,
  ALL: 4
};

/**
 * PAGE USER AGENT
 */
module.exports.DEFAULT_DESKTOP_USER_AGENT = 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10.8; rv:22.0) Gecko/20100101 Firefox/22.0';
module.exports.DEFAULT_MOBILE_USER_AGENT = 'Mozilla/5.0 (Linux; U; Android 2.2; en-us; DROID2 GLOBAL Build/S273) AppleWebKit/533.1 (KHTML, like Gecko) Version/4.0 Mobile Safari/533.1';

/**
 * Page VIEWPORT size
 */
module.exports.DEFAULT_DESKTOP_PAGE_VIEWPORT_WIDTH = 1920;
module.exports.DEFAULT_DESKTOP_PAGE_VIEWPORT_HEIGHT = 1080;

module.exports.DEFAULT_MOBILE_PAGE_VIEWPORT_WIDTH = 1920;
module.exports.DEFAULT_MOBILE_PAGE_VIEWPORT_HEIGHT = 1080;