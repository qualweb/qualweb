'use strict';

import {
  ElementHandle
} from 'puppeteer';
import {keys} from 'lodash';
import ariaJSON from './ariaAttributesRoles.json';
import getElementAttributesName from './getElementAttributesName';


async function elementHasGlobalARIAPropertyOrAttribute(element: ElementHandle): Promise<boolean> {
  if (!element) {
    throw Error('Element is not defined');
  }
  let elemAttribs = await getElementAttributesName(element);
  let keyArray = keys(ariaJSON);
  let result = false;
  let i =0;
  while(!result && i< elemAttribs.length){
    result = keyArray.includes(elemAttribs[i])&& ariaJSON[elemAttribs[i]].global;
    i++;
  }
  return result;}

export = elementHasGlobalARIAPropertyOrAttribute;
