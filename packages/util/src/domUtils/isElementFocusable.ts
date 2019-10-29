'use strict';

import { DomElement } from 'htmlparser2';
import isElementFocusableByDefault from './isElementFocusableByDefault';
import isElementHiddenByCSSRecursive from './isElementHiddenByCSSRecursive';

function isElementFocusable(element: DomElement): boolean {
  let disabled = false;
  let hidden = false;
  let focusableByDefault = false;
  let tabIndexLessThanZero = false;
  let tabIndexExists = false;

  if(element.attribs){
    tabIndexExists = element.attribs['tabindex'] !== undefined;
  }

  if (element.attribs) {
    disabled = element.attribs['disabled'] !== undefined;
    hidden = isElementHiddenByCSSRecursive(element);
    focusableByDefault = isElementFocusableByDefault(element);
    let tabindex = element.attribs['tabindex'];
    if (tabindex && !isNaN(parseInt(tabindex, 10))) {
      tabIndexLessThanZero = parseInt(tabindex, 10) < 0;
    }
  }
  if (focusableByDefault)
    return !(disabled || hidden || tabIndexLessThanZero);
  else
    return tabIndexExists ? !tabIndexLessThanZero : false;
}

export = isElementFocusable;
