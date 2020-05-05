'use strict';
import elementHasAttributes from './elementHasAttributes';
import getElementAttribute from './getElementAttribute';
import getElementById from './getElementById';
import getElementByAttributeName from './getElementByAttributeName';
import { QWPage } from '../qwPage';
import { QWElement } from '../qwElement';

async function getElementReferencedByHREF(pageQW: QWPage, elementQW: QWElement, ): Promise<QWElement | null> {
  if (!elementQW.elementHtml && pageQW.document) {
    throw Error('Element is not defined');
  }

  if (!(await elementHasAttributes(elementQW))) {
    return null;
  }

  let href =await getElementAttribute(elementQW, 'href');
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

  let result = getElementById(pageQW, elementQW, href);
  if (result) {
    return result;
  }

  result = getElementByAttributeName(pageQW, href);
  if (result) {
    return result;
  }

  return null;
}

export default getElementReferencedByHREF;