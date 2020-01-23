'use strict';

import { nameFromContentRoles, nameFromContentElements } from "./constants";
import {ElementHandle} from "puppeteer";
import getElementTagName from "../domUtils/getElementTagName";
import getElementAttribute from "../domUtils/getElementAttribute";


async function allowsNameFromContent(element: ElementHandle): Promise<boolean> {

  let role, name;
  name = await getElementTagName(element);
  role = await getElementAttribute(element,"role");


  return role && nameFromContentRoles.indexOf(role) >= 0 || name && nameFromContentElements.indexOf(name) >= 0;
}

export = allowsNameFromContent;
