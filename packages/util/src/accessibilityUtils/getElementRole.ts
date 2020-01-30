'use strict';
import { ElementHandle, Page } from 'puppeteer';

import getAccessibleName from './getAccessibleName';
import getElementRoleAName from './getElementRoleAName';

async function getElementRole(element: ElementHandle, page: Page): Promise<string | null> {
  let aName = await getAccessibleName(element, page);
  
  return await getElementRoleAName(element,page,aName);
}

export = getElementRole;
