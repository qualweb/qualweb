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

export const ARGUMENT_VALUE_SEPARATOR = ',';
export const FILE_URL_SEPARATOR = '\n';

/**
 * Modules type
 */
export enum MODULE {
	SYSTEM,
	PRE_PROCESSING,
	EVALUATION
};

/**
 * Output type
 */
export enum OUTPUT {
	FILE,
	MODULE,
  SCREEN
};

/**
 * PAGE USER AGENT
 */
export const DEFAULT_DESKTOP_USER_AGENT = 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10.8; rv:22.0) Gecko/20100101 Firefox/22.0';
export const DEFAULT_MOBILE_USER_AGENT = 'Mozilla/5.0 (Linux; U; Android 2.2; en-us; DROID2 GLOBAL Build/S273) AppleWebKit/533.1 (KHTML, like Gecko) Version/4.0 Mobile Safari/533.1';

/**
 * Page VIEWPORT size
 */
export const DEFAULT_DESKTOP_PAGE_VIEWPORT_WIDTH = 1920;
export const DEFAULT_DESKTOP_PAGE_VIEWPORT_HEIGHT = 1080;

export const DEFAULT_MOBILE_PAGE_VIEWPORT_WIDTH = 1920;
export const DEFAULT_MOBILE_PAGE_VIEWPORT_HEIGHT = 1080;