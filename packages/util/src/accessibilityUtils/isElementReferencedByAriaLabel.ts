'use strict';

import { Page, ElementHandle } from "puppeteer";
import getElementAttribute = require("../domUtils/getElementAttribute");
import getTreeSelector = require("../shadowDomUtils/getTreeSelector");

async function isElementReferencedByAriaLabel(element: ElementHandle, page: Page): Promise<boolean> {
  let id = await getElementAttribute(element, "id");
  let treeSelector = await getTreeSelector(element);
  let result = false;
  if (id !== null) {
    let referencedByAriaLabel = await page.$$(`[aria-labelledby*="${id}"]` + treeSelector);
    let i = 0;
    while(i < referencedByAriaLabel.length){
      let ariaLabelBy = await getElementAttribute(referencedByAriaLabel[i], "aria-labelledby");
      if (ariaLabelBy !== null) {
        let ids = ariaLabelBy.split(" ");
        if (ids.includes(id)) {
          result = true;
        }
      }
      i++;
    }
  }
  return result;
}

export = isElementReferencedByAriaLabel;
