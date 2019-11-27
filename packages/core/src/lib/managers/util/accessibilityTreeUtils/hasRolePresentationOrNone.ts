'use strict';

import getElementAttributeDocument = require("../domUtils/getElementAttributeDocument");

function hasRolePresentationOrNone(element: Element): boolean {
  let role = getElementAttributeDocument(element, "role");
  return  role === "none" ||role === "presentation";
}

export = hasRolePresentationOrNone;
