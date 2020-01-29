'use strict';

import {Page, ElementHandle} from "puppeteer";
import getElementAttribute from "../domUtils/getElementAttribute";
import getTreeSelector from "../shadowDomUtils/getTreeSelector";

async function isElementReferencedByAriaLabel(element:ElementHandle, page:Page): Promise<boolean> {
  let id = await getElementAttribute(element,"id");
  let treeSelector = await getTreeSelector(element);
  let referencedByAriaLabel =await page.$(`[aria-labelledby="${id}"]`+treeSelector);
  return referencedByAriaLabel!== null;
} 

export default isElementReferencedByAriaLabel;
