'use strict';

import { ElementHandle } from 'puppeteer';

function isElementChildOfDetails(element: ElementHandle): boolean {
  return !!element.parent && element.parent.name === "details";
}

export = isElementChildOfDetails;
