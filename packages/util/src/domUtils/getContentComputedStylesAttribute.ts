'use strict';

import { DomElement } from 'htmlparser2';

function getContentComputedStylesAttribute(element: DomElement, computedStyle: string, attribute: string): string {
  if (!element.attribs || !element.attribs[computedStyle]) {
      return "";
  }
  let computedStyleContent = element.attribs[computedStyle]
  let attribs = computedStyleContent.split(";");
  let isAttr = new RegExp(attribute);
  let attributeContent = "";
  let count = 0;
  for (let attr of attribs) {
      if (isAttr.test(attr)) {
          attributeContent = attribs[count+1];
      }
      count++;
  }
  return attributeContent.replace("&quot", "");
}

export = getContentComputedStylesAttribute;