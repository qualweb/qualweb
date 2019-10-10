'use strict';

import { DomElement } from 'htmlparser2';

function getElementStyleProperty(element: DomElement, style: string, property: string): string | undefined {
  if (!element) {
    throw Error('Element is not defined');
  }
  
  try {
    if (element.attribs && element.attribs[style]) {
      const parsedProperty = element.attribs[style].split(property + ':')[1];
      if (parsedProperty.includes('&quot;')) {
        return parsedProperty.split(';')[1].split('&')[0].trim();
      } else {
        return parsedProperty.split(';')[0].trim();
      }
    } else {
      return undefined;
    }
  } catch(err) {
    return undefined;
  }
}

export = getElementStyleProperty;