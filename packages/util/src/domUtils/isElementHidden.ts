'use strict';

import { DomElement } from 'htmlparser2';
import isElementHiddenByCSS from './isElementHiddenByCSS';

function isElementHidden(element: DomElement): boolean {
  if (!element) {
    throw Error('Element is not defined');
  }
  
  const ariaHidden = element.attribs ? element.attribs['aria-hidden'] === 'true' : false;
  const hidden = element.attribs ? element.attribs['hidden'] !== undefined : false;
  const cssHidden = isElementHiddenByCSS(element);
  const parent = element.parent;
  let parentHidden = false;

  if (parent) {
    parentHidden = isElementHidden(parent);
  }

  return cssHidden || hidden || ariaHidden || parentHidden;
}

export = isElementHidden;