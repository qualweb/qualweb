'use strict';

import { nameFromContentRoles, nameFromContentElements } from "./constants";
import {getElementAttribute, getElementName} from "../domUtils/domUtils";
import {ElementHandle} from "puppeteer";


async function allowsNameFromContent(element: ElementHandle): Promise<boolean> {

  let role, name;
  name = await getElementName(element);
  if(name)
    name = name.toLocaleLowerCase();
  role = await getElementAttribute(element,"role");


  return role && nameFromContentRoles.indexOf(role) >= 0 || name && nameFromContentElements.indexOf(name) >= 0;
}

export = allowsNameFromContent;
