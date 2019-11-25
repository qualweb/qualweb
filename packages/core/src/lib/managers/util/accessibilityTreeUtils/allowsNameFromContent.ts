'use strict';

import { ElementHandle } from 'puppeteer';
import { nameFromContentRoles, nameFromContentElements } from "./constants";
import getElementName = require('../domUtils/getElementName');
import getElementAttribute = require('../domUtils/getElementAttribute');


function allowsNameFromContent(element: ElementHandle): boolean {

  let role, name;
  name = await getElementName(element);

  role = await getElementAttribute(element,"role"):


  return nameFromContentRoles.indexOf(role) >= 0 || nameFromContentElements.indexOf(name) >= 0;
}

export = allowsNameFromContent;
