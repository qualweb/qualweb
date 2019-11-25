'use strict';

import { ElementHandle } from 'puppeteer';
const stew = new (require('stew-select')).Stew();

function isElementReferencedByAriaLabel(id: string, processedHTML: ElementHandle[], element: ElementHandle): boolean {

  let refrencedByAriaLabel = stew.select(processedHTML, `[aria-labelledby="${id}"]`);

  return refrencedByAriaLabel.length !== 0;

}

export = isElementReferencedByAriaLabel;
