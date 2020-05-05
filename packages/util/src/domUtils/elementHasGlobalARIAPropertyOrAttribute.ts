'use strict';

import ariaJSON from './ariaAttributesRoles.json';
import { QWElement } from '@qualweb/qw-element';


 function elementHasGlobalARIAPropertyOrAttribute(elementQW: QWElement): boolean {
  if (!elementQW) {
    throw Error('Element is not defined');
  }
  let elemAttribs = elementQW.getElementAttributesName();
  let keyArray = Object.keys(ariaJSON);
  let result = false;
  let i = 0;
  while(!result && i< elemAttribs.length){
    result = keyArray.includes(elemAttribs[i])&& ariaJSON[elemAttribs[i]].global;
    i++;
  }
  return result;}

export default elementHasGlobalARIAPropertyOrAttribute;
