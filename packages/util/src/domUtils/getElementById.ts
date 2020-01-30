'use strict';


import { Page, ElementHandle } from 'puppeteer';
import getTreeSelector from '../shadowDomUtils/getTreeSelector';

async function getElementById(page: Page, element:ElementHandle,id:string): Promise<ElementHandle | null> {
  if (!element) {
    throw new Error('Invalid id');
  }
  let treeSelector = await getTreeSelector(element);
  return page.$(`#${id}`+treeSelector);
}

export default getElementById;
