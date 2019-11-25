'use strict';

import { DomElement } from 'htmlparser2';
const stew = new (require('stew-select')).Stew();

function getElementReferencedByHREF(processedHTML: DomElement[], element: DomElement): DomElement | null {
  if (processedHTML === undefined) {
    throw Error('ProcessedHTML is not defined');
  }
  
  if (!element) {
    throw Error('Element is not defined');
  }
  
  if (!element.attribs) {
    return null;
  }

  let href = element.attribs['href'];
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
  
  let result = stew.select_first(processedHTML, '#' + href);
  if (result) {
    return result;
  }
  result = stew.select_first(processedHTML, '[name="' + href + '"]');
  if (result) {
    return result;
  }
  return null;
}

export = getElementReferencedByHREF;