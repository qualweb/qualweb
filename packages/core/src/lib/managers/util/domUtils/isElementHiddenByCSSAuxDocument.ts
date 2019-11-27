'use strict';
import {trim} from 'lodash';
import getElementStylePropertyDocument from './getElementStylePropertyDocument';
 function isElementHiddenByCSSAuxDocument(element: Element): boolean {
  if (!element) {
    throw Error('Element is not defined');
  }

  let visibility = false;
  let displayNone = false;
  const display = getElementStylePropertyDocument(element, 'computed-style', 'display');
  displayNone = display ? trim(display) === 'none' : false;
  const visibilityATT = getElementStylePropertyDocument(element, 'computed-style', 'visibility');
  visibility = visibilityATT ? trim(visibilityATT) === 'collapse' || visibilityATT.trim() === 'hidden' : false;

return visibility || displayNone;
}

export = isElementHiddenByCSSAuxDocument;
