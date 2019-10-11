'use strict';

import {DomElement} from "htmlparser2";
import getAccessibleName = require("./getAccessibleName");

function getAccessibleNameFromChildren(element: DomElement, processedHTML: DomElement[], accumulatedText: string): string {

  if (element.children) {
    for (let child of element.children) {
      accumulatedText += getAccessibleName(child, processedHTML, false);
    }
  }
  return accumulatedText;
}

export = getAccessibleNameFromChildren;
