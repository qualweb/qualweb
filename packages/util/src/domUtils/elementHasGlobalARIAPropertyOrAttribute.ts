'use strict';

import ariaJSON from './ariaAttributesRoles.json';
import getElementAttributesName from './getElementAttributesName';
import { QWElement } from '../qwElement.js';

 async function elementHasGlobalARIAPropertyOrAttribute(elementQW: QWElement): Promise<boolean> {
  if (!elementQW.elementHtml) {
    throw Error('Element is not defined');
  }
  let elemAttribs = await getElementAttributesName(elementQW);
  let keyArray = Object.keys(ariaJSON);
  let result = false;
  let i = 0;
  while(!result && i< elemAttribs.length){
    result = keyArray.includes(elemAttribs[i])&& ariaJSON[elemAttribs[i]].global;
    i++;
  }
  return result;}

export default elementHasGlobalARIAPropertyOrAttribute;
