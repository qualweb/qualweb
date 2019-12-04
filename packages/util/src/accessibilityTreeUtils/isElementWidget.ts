'use strict';

import { widgetRoles, widgetElements } from "./constants";
import {ElementHandle} from "puppeteer";
import {getElementAttribute, getElementName} from "../domUtils/domUtils";

async function isElementWidget(element: ElementHandle): Promise<boolean> {

  let role = await  getElementAttribute(element,"role");
  let name = await  getElementName(element);
  if(name)
    name = name.toLocaleLowerCase();

  return role!==null && (widgetRoles.indexOf(role) >= 0) || name!== null && (widgetElements.indexOf(name) >= 0);
}

export = isElementWidget;
