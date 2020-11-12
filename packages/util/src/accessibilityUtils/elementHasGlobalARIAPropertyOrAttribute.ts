'use strict';

import ariaJSON from './ariaAttributesRoles.json';
import { QWElement } from '@qualweb/qw-element';

function elementHasGlobalARIAPropertyOrAttribute(elementQW: QWElement): boolean {
  if (!elementQW) {
    throw Error('Element is not defined');
  }
  let elemAttribs = elementQW.getElementAttributesName();
  elemAttribs = elemAttribs.filter((elem) => elem.startsWith('ar'));
  let result = false;
  let i = 0;
  while (!result && i < elemAttribs.length) {
    result = elemAttribs[i] in ariaJSON && ariaJSON[elemAttribs[i]].global;
    i++;
  }
  return result;
}

export default elementHasGlobalARIAPropertyOrAttribute;
