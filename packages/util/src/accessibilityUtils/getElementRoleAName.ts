'use strict';
import { ElementHandle, Page } from 'puppeteer';
import getImplicitRole from './getImplicitRole';
import getElementAttribute from '../domUtils/getElementAttribute';

async function getElementRoleAName(element: ElementHandle, page: Page,aName:string|undefined): Promise<string | null> {
  let explicitRole = await getElementAttribute(element, "role");
  let role = explicitRole;
  if (explicitRole === null) {
    role = await getImplicitRole(element,page,aName);
    }
  return role;
}

export = getElementRoleAName;
