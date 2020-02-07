'use strict';

import { Node } from 'domhandler';
import * as DomUtils from 'domutils';
import clone from 'lodash.clone';

function getSourceElementHtmlCode(element: Node, withText: boolean=true, fullElement: boolean=false): string {

  if (!element) {
    throw new Error('Invalid element');
  }

  const codeElement = clone(element);

  if (!fullElement) {
    if (withText) {
      const children = clone(codeElement.children);
      codeElement.children = [];

      for (const child of children || []) {
        if (child.type === 'text') {
          codeElement.children.push(clone(child));
        }
      }
    } else {
      codeElement.children = [];
    }
  }

  return DomUtils.getOuterHTML(codeElement);
}

export default getSourceElementHtmlCode;