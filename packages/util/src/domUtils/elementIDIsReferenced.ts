'use strict';

import { Page, ElementHandle } from 'puppeteer';
import getElementAttribute = require('./getElementAttribute');
import getTreeSelector = require('../shadowDomUtils/getTreeSelector');

async function elementIDIsReferenced(page:Page,element: ElementHandle,atrribute:string): Promise<boolean> {
  let id = await getElementAttribute(element,"id");
  let treeSelector = await getTreeSelector(element);
  return(await page.$('['+atrribute+`="${id}"]`+treeSelector))!== null;
}

export = elementIDIsReferenced;