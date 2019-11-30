'use strict';

import { ElementHandle } from 'puppeteer';

import getElementSelector from './getElementSelector';

async function getElementChildren(element: ElementHandle): Promise<ElementHandle[]> {
  const selector = await getElementSelector(element);
  return element.$$(selector + ' > *');
}

export = getElementChildren;