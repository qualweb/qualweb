'use strict';

import { Page, ElementHandle } from 'puppeteer';
import getTreeSelector = require('../shadowDomUtils/getTreeSelector');

async function elementIDIsReferenced(page:Page,element: ElementHandle,id:string,atrribute:string): Promise<boolean> {
  let treeSelector = await getTreeSelector(element);
  return(await page.$('['+atrribute+`="${id}"]`+treeSelector))!== null;
}

export = elementIDIsReferenced;