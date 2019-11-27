'use strict';

import getElementAttributeDocument = require("../domUtils/getElementAttributeDocument");
import getElementNameDocument = require("../domUtils/getElementNameDocument");



function getDefaultName(element: Element): string {
  let name = getElementNameDocument(element);
  let type;
  let result = "";

  if ( name === "input") {
    type = getElementAttributeDocument(element, "type");;
  }

  /*if (type === "image") {
    result = "image";
  } */ if (type === "submit") {
    result = "reset";
  } else if (type === "reset") {
    result = "reset";
  }

  return result;
}

export = getDefaultName;
