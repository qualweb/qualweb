'use strict';


import { Page, ElementHandle } from 'puppeteer';
import getElementAttribute = require('./getElementAttribute');
import getTreeSelector = require('../shadowDomUtils/getTreeSelector');

async function getElementById(page: Page, element:ElementHandle): Promise<ElementHandle | null> {
  if (!element) {
    throw new Error('Invalid id');
  }
  let treeSelector = await getTreeSelector(element);
  let id = await getElementAttribute(element,"id");
  return page.$(`#${id}`+treeSelector);
}

export = getElementById;
