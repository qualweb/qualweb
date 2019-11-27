'use strict';

import { widgetRoles, widgetElements } from "./constants";
import getElementAttributeDocument = require("../domUtils/getElementAttributeDocument");
import getElementNameDocument = require("../domUtils/getElementNameDocument");

function isElementWidgetDocument(element: Element): boolean {

  let name;
  let role;
  role = getElementAttributeDocument(element,"role");
  name = getElementNameDocument(element);

  return widgetRoles.indexOf(role) >= 0 || widgetElements.indexOf(name) >= 0;
}

export = isElementWidgetDocument;
