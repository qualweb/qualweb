'use strict';

import {DomElement} from "htmlparser2";

function hasRolePresentationOrNone(element: DomElement): boolean {
  return !!element.attribs && (element.attribs["role"] === "none" || element.attribs["role"] === "presentation");
}

export = hasRolePresentationOrNone;
