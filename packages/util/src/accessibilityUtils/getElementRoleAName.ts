'use strict';
import { QWPage } from '@qualweb/qw-page';
import { QWElement } from '@qualweb/qw-element';
import isElementFocusable from '../domUtils/isElementFocusable';
import elementHasGlobalARIAPropertyOrAttribute from '../domUtils/elementHasGlobalARIAPropertyOrAttribute';
import { AccessibilityUtils } from '@qualweb/util';

function getElementRoleAName(elementQW: QWElement, pageQW: QWPage, aName: string | undefined): string | null {
  let explicitRole = elementQW.getElementAttribute("role");
  let role = explicitRole;
  if (explicitRole === null || ((explicitRole === "none" || explicitRole === "presentation") && (isElementFocusable(elementQW,pageQW) ||elementHasGlobalARIAPropertyOrAttribute(elementQW)))) {
    role = AccessibilityUtils.getImplicitRole(elementQW, pageQW, aName);
  }
  return role;
}

export = getElementRoleAName;
