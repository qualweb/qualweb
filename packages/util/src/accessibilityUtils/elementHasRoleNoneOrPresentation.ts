'use strict';
import { QWElement } from "@qualweb/qw-element";


function elementHasRoleNoneOrPresentation(elementQW: QWElement): boolean {
  let role = elementQW.getElementAttribute("role");
  return role!== null && (role === "none" ||role === "presentation");
}

export default elementHasRoleNoneOrPresentation;
