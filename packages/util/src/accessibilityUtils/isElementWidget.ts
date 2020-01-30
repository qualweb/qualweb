'use strict';

import { widgetRoles, widgetElements } from "./constants";
import {ElementHandle} from "puppeteer";
import getElementAttribute from "../domUtils/getElementAttribute";
import getElementTagName from '../domUtils/getElementTagName';

async function isElementWidget(element: ElementHandle): Promise<boolean> {

  let role = await getElementAttribute(element,"role");
  let name = await getElementTagName(element);
  if(!name)
    name = '';

  return role!==null && (widgetRoles.indexOf(role) >= 0) || name !== '' && (widgetElements.indexOf(name) >= 0);
}

export default isElementWidget;
