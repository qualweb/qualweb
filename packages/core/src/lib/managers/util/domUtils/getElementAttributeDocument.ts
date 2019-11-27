'use strict';

 function getElementAttributeDocument(element: Element, attribute: string): string|null {
  if (!element) {
    throw Error('Element is not defined');
  }
  return element.getAttribute(attribute);
}

export = getElementAttributeDocument;