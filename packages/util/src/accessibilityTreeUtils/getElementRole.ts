'use strict';
import { getElementAttribute } from "../domUtils/domUtils";
import { ElementHandle, Page } from 'puppeteer';
import getImplicitRole from './getImplicitRole.js';

async function getElementRole(element: ElementHandle, page: Page): Promise<string | null> {
  let explicitRole = await getElementAttribute(element, "role");
  let role = explicitRole;
  if (explicitRole === null) {
    role = await getImplicitRole(element,page);
    }
  return role;
}

export = getElementRole;
