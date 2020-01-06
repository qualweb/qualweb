'use strict';

import {Page} from "puppeteer";

async function isElementReferencedByAriaLabel(id: string, page:Page): Promise<boolean> {
  let referencedByAriaLabel =await page.$(`[aria-labelledby="${id}"]`);
  return referencedByAriaLabel!== null;
}

export = isElementReferencedByAriaLabel;
