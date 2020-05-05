'use strict';

import {controlRoles } from "./constants";
import { QWElement,QWPage } from '@qualweb/html-util';
import getElementRoleAName from "./getElementRoleAName";
async function isElementControl(elementQW: QWElement,  pageQW:QWPage): Promise<boolean>{
  let role = await getElementRoleAName(elementQW,pageQW,"");
  return role!==null && controlRoles.indexOf(role) >= 0;
}
export default isElementControl;
