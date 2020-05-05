'use strict';
import getElementParent from './getElementParent';
import getElementTagName from './getElementTagName';
import getElementAttribute from './getElementAttribute';
import { QWElement } from '../qwElement';
import { QWPage } from '../qwPage';

async function isElementADescendantOfExplicitRole(elementQW: QWElement, pageQW: QWPage, names: string [], roles: string[]): Promise<boolean> {
  if (!elementQW.elementHtml || !pageQW.document) {
    throw Error('Element is not defined');
  }
  let parent = await getElementParent(elementQW);
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
      return await isElementADescendantOfExplicitRole(parent, pageQW, names, roles);
    } else {
      return result;
    }
  } else {
    return result;
  }
}

export default isElementADescendantOfExplicitRole;