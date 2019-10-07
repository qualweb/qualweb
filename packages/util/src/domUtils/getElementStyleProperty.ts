'use strict';

import { DomElement } from 'htmlparser2';

function getElementStyleProperty(element: DomElement, style: string, property: string): string | undefined {
  try {
    if (element.attribs && element.attribs[style]) {
      return element.attribs[style].split(property + ':')[1].split(';')[0].trim();
    } else {
      return undefined;
    }
  } catch(err) {
    return undefined;
  }
}

export = getElementStyleProperty;