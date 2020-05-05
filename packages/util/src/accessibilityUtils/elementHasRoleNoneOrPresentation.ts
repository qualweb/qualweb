'use strict';
import { QWElement } from '@qualweb/html-util';
import { AccessibilityUtils } from "..";


async function elementHasRoleNoneOrPresentation(elementQW: QWElement): Promise<boolean> {
  let role = await AccessibilityUtils.domUtils.getElementAttribute(elementQW,"role")
  return role!== null && (role === "none" ||role === "presentation");
}

export default elementHasRoleNoneOrPresentation;
