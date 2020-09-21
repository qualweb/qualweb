'use strict';

import {widgetRoles} from "./constants";
import {QWPage} from '@qualweb/qw-page';
import {QWElement} from '@qualweb/qw-element';
import { AccessibilityUtils } from "@qualweb/util";

function isElementWidget(elementQW: QWElement, pageQW: QWPage): boolean {
  let role = AccessibilityUtils.getElementRoleAName(elementQW, pageQW, "");
  return role !== null && (widgetRoles.indexOf(role) >= 0);
}

export default isElementWidget;
