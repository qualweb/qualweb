'use strict';

function getElementParentDocument(element: Element): Element|null {
  if (!element) {
    throw Error('Element is not defined');
  }

  return document.parentElement;
}

export = getElementParentDocument;