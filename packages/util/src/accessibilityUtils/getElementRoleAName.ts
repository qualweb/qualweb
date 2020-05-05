'use strict';
import { QWElement,QWPage } from '@qualweb/html-util';
import { AccessibilityUtils } from "..";
import getImplicitRole from './getImplicitRole';


async function getElementRoleAName(elementQW: QWElement, pageQW:QWPage,aName:string|undefined): Promise<string | null> {
  let explicitRole = await AccessibilityUtils.domUtils.getElementAttribute(elementQW, "role");
  let role = explicitRole;
  if (explicitRole === null) {
    role = await getImplicitRole(elementQW,pageQW,aName);
    }
  return role;
}

export = getElementRoleAName;
