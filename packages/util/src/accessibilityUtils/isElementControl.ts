'use strict';

import {controlRoles } from "./constants";
import {ElementHandle, Page} from "puppeteer";
import getElementRoleAName from "./getElementRoleAName";
async function isElementControl(element: ElementHandle,page:Page): Promise<boolean> {

  let role = await getElementRoleAName(element,page,"");

  return role!==null && controlRoles.indexOf(role) >= 0;
}

export default isElementControl;
