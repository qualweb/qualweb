'use strict';

import { QWPage } from '@qualweb/qw-page';
import { QWElement } from '@qualweb/qw-element';
import getElementRole from '../accessibilityUtils/getElementRole';

function isElementADescendantOf(elementQW: QWElement, pageQW: QWPage, names: string [], roles: string[]): boolean {
  if (!elementQW || !pageQW) {
    throw Error('Element is not defined');
  }
  let parent = elementQW.getElementParent();
  let result = false;
  let sameRole, sameName;

  if (parent !== null) {
    let parentName = parent.getElementTagName();
    let parentRole = getElementRole(parent, pageQW);


    if (parentName !== null) {
      sameName = names.includes(parentName);
    }
    if (parentRole !== null) {
      sameRole = roles.includes(parentRole);
    }
    result = sameName || sameRole;
    if (!result) {
      return isElementADescendantOf(parent, pageQW, names, roles);
    } else {
      return result;
    }
  } else {
    return result;
  }
}

export default isElementADescendantOf;
