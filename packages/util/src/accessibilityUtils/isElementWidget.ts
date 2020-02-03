'use strict';

import { widgetRoles } from "./constants";
import {ElementHandle, Page} from "puppeteer";
import getElementRoleAName = require("./getElementRoleAName");

async function isElementWidget(element: ElementHandle,page:Page): Promise<boolean> {

  let role = await getElementRoleAName(element,page,"");


  return role!==null && (widgetRoles.indexOf(role) >= 0);
}

export default isElementWidget;
