'use strict';

import { nameFromContentRoles, nameFromContentElements } from "./constants";
import getElementAttributeDocument = require("../domUtils/getElementAttributeDocument");
import {getElementAttribute, getElementName} from "../domUtils/domUtils";
import {ElementHandle} from "puppeteer";


async function allowsNameFromContent(element: ElementHandle): boolean {

  let role, name;
  name = await getElementName(element);
  role = await getElementAttribute(element,"role");


  return role && nameFromContentRoles.indexOf(role) >= 0 || name && nameFromContentElements.indexOf(name) >= 0;
}

export = allowsNameFromContent;
