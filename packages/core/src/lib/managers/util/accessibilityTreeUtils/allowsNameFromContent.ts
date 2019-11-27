'use strict';

import { nameFromContentRoles, nameFromContentElements } from "./constants";
import getElementNameDocument = require('../domUtils/getElementNameDocument');
import getElementAttributeDocument = require("../domUtils/getElementAttributeDocument");


function allowsNameFromContent(element: Element): boolean {

  let role, name;
  name = getElementNameDocument(element);

  role = getElementAttributeDocument(element,"role");


  return nameFromContentRoles.indexOf(role) >= 0 || nameFromContentElements.indexOf(name) >= 0;
}

export = allowsNameFromContent;
