'use strict';

import { DomElement } from 'htmlparser2';
import html from 'htmlparser-to-html';
import clone from 'lodash/clone';

function getSourceElementHtmlCode(element: DomElement, withText: boolean=true, fullElement: boolean=false): string {

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

  return html(codeElement);
}

export default getSourceElementHtmlCode;