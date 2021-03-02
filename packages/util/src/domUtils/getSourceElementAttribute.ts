'use strict';

import { Node } from 'domhandler';

function getSourceElementAttribute(element: Node, attribute: string): string | null {
  if (!element) {
    throw Error('Element is not defined');
  }

  return element['attribs'] ? (element['attribs'][attribute] ? element['attribs'][attribute] : null) : null;
}

export default getSourceElementAttribute;
