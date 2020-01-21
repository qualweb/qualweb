'use strict';

import { Page, ElementHandle } from 'puppeteer';
import elementHasAttributes from './elementHasAttributes';
import getElementAttribute from './getElementAttribute';
import getElementById from './getElementById';
import getElementByAttributeName from './getElementByAttributeName';

async function getElementReferencedByHREF(page: Page, element: ElementHandle): Promise<ElementHandle | null> {  
  if (!element) {
    throw Error('Element is not defined');
  }
  
  if (!(await elementHasAttributes(element))) {
    return null;
  }

  let href = await getElementAttribute(element, 'href');
  if (!href) {
    return null;
  }

  if (href.charAt(0) === '#' && href.length > 1) {
    href = decodeURIComponent(href.substring(1));
  } else if (href.substr(0, 2) === '/#' && href.length > 2) {
    href = decodeURIComponent(href.substring(2));
  } else {
    return null;
  }
  
  let result = await getElementById(page,element,href);
  if (result) {
    return result;
  }

  result = await getElementByAttributeName(page, href);
  if (result) {
    return result;
  }

  return null;
}

export = getElementReferencedByHREF;