'use strict';

import {controlRoles } from "./constants";
import { QWPage } from '@qualweb/qw-page';
import { QWElement } from '@qualweb/qw-element';
import { AccessibilityUtils } from "@qualweb/util";

function isElementControl(elementQW: QWElement, pageQW: QWPage): boolean{
  let role = AccessibilityUtils.getElementRoleAName(elementQW,pageQW,"");
  return role!==null && controlRoles.indexOf(role) >= 0;
}
export default isElementControl;
