'use strict';
import { QWPage } from '@qualweb/qw-page';
import { QWElement } from '@qualweb/qw-element';

function getElementReferencedByHREF(pageQW: QWPage, elementQW: QWElement): QWElement | null {
  if (!elementQW && pageQW) {
    throw Error('Element is not defined');
  }

  if (!(elementQW.elementHasAttributes())) {
    return null;
  }

  let href = elementQW.getElementAttribute( 'href');
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

  let result = pageQW.getElementByID(href, elementQW);
  if (result) {
    return result;
  }

  result = pageQW.getElementByAttributeName(href);
  if (result) {
    return result;
  }

  return null;
}

export default getElementReferencedByHREF;
