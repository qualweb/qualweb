'use strict';

import {Page} from "puppeteer";

function isElementReferencedByAriaLabel(id: string, page:Page): boolean {
  let referencedByAriaLabel = page.$$(`[aria-labelledby="${id}"]`);
  return referencedByAriaLabel!== null;
}

export = isElementReferencedByAriaLabel;
