'use strict';

import { widgetRoles } from "./constants";
import { QWElement,QWPage } from '@qualweb/html-util';
import getElementRoleAName = require("./getElementRoleAName");

async function isElementWidget(elementQW: QWElement,  pageQW:QWPage): Promise<boolean> {
  let role = await getElementRoleAName(elementQW,pageQW,"");
  return role!==null && (widgetRoles.indexOf(role) >= 0);
}

export default isElementWidget;
