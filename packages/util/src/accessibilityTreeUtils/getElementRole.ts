'use strict';
import { ElementHandle, Page } from 'puppeteer';
import getImplicitRole from './getImplicitRole';
import getElementAttribute from '../domUtils/getElementAttribute';

async function getElementRole(element: ElementHandle, page: Page): Promise<string | null> {
  let explicitRole = await getElementAttribute(element, "role");
  let role = explicitRole;
  if (explicitRole === null) {
    role = await getImplicitRole(element,page);
    }
  return role;
}

export = getElementRole;
