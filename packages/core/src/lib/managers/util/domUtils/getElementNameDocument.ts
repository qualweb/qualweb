'use strict';



function getElementNameDocument(element: Element|null): string {
  if (!element) {
    throw Error('Element is not defined');
  }
  return element.tagName;
}

export = getElementNameDocument;