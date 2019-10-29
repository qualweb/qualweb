'use strict';

import { DomElement } from 'htmlparser2';
import getElementStyleProperty from './getElementStyleProperty';

function isElementHiddenByCSS(element: DomElement): boolean {
  if (!element) {
    throw Error('Element is not defined');
  }
  
  if (!element.attribs) {
    return false;
  }
  let visibility = false;
  let displayNone = false;
  
  if (element.attribs['computed-style']) {
    const display = getElementStyleProperty(element, 'computed-style', 'display');
    displayNone = display ? display.trim() === 'none' : false;
    const visibilityATT = getElementStyleProperty(element, 'computed-style', 'visibility');
    visibility = visibilityATT ? visibilityATT.trim() === 'collapse' || visibilityATT.trim() === 'hidden' : false;
  }
  return visibility || displayNone;
}

export = isElementHiddenByCSS;
