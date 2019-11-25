'use strict';

import { ElementHandle } from 'puppeteer';
const stew = new (require('stew-select')).Stew();

function getLabel(id: string, element: ElementHandle, processedHTML: ElementHandle[]): ElementHandle {

  let referencedByLabel = stew.select(processedHTML, `label[for="${id}"]`);
  let parent = element.parent;
  let result;

  if (referencedByLabel.length !== 0) {
    result = referencedByLabel[0];
  } else if (parent && parent.name === "label") {
    result = parent;
  }

  return result;
}

export = getLabel;
