'use strict';

import { ElementHandle } from 'puppeteer';

import getElementSelector from './getElementSelector';
import getTreeSelector from '../shadowDomUtils/getTreeSelector';

async function getElementChildren(element: ElementHandle): Promise<ElementHandle[]> {
  const selector = await getElementSelector(element);
  let treeSelector = await getTreeSelector(element);
  return element.$$(selector + ' > *'+treeSelector);
}

export default getElementChildren;