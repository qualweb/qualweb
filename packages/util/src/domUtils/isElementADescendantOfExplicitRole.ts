'use strict';

import { ElementHandle, Page } from 'puppeteer';
import getElementParent from './getElementParent';
import getElementTagName from './getElementTagName';
import getElementAttribute from './getElementAttribute';

async function isElementADescendantOfExplicitRole(element: ElementHandle, page: Page, names: string [], roles: string[]): Promise<boolean> {
  if (!element) {
    throw Error('Element is not defined');
  }
  let parent = await getElementParent(element);
  let result = false;
  let sameRole, sameName;

  if (parent !== null) {
    let parentName = await getElementTagName(parent);
    let parentRole = await getElementAttribute(parent, "role");


    if (parentName !== null) {
      sameName = names.includes(parentName);
    }
    if (parentRole !== null) {
      sameRole = roles.includes(parentRole);
    }
    result = sameName || sameRole;
    if (!result) {
      return await isElementADescendantOfExplicitRole(parent, page, names, roles);
    } else {
      return result;
    }
  } else {
    return result;
  }
}

export default isElementADescendantOfExplicitRole;