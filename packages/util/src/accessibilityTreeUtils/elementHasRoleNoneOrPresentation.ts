'use strict';

import {DomElement} from "htmlparser2";

function elementHasRoleNoneOrPresentation(element: DomElement): boolean {
  return !!element.attribs && (element.attribs["role"] === "none" || element.attribs["role"] === "presentation");
}

export = elementHasRoleNoneOrPresentation;
