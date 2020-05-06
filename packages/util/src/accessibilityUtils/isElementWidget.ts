'use strict';

import {widgetRoles} from "./constants";
import getElementRoleAName = require("./getElementRoleAName");
import {QWPage} from '@qualweb/qw-page';
import {QWElement} from '@qualweb/qw-element';

function isElementWidget(elementQW: QWElement, pageQW: QWPage): boolean {
  let role = getElementRoleAName(elementQW, pageQW, "");
  return role !== null && (widgetRoles.indexOf(role) >= 0);
}

export default isElementWidget;
