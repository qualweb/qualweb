'use strict';

import { ElementHandle } from 'puppeteer';

function hasRolePresentationOrNone(element: ElementHandle): boolean {
  return !!element.attribs && (element.attribs["role"] === "none" || element.attribs["role"] === "presentation");
}

export = hasRolePresentationOrNone;
