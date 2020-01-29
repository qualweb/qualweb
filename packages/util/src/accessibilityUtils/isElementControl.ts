'use strict';

import {controlRoles } from "./constants";
import {ElementHandle} from "puppeteer";
import getElementAttribute from "../domUtils/getElementAttribute";
async function isElementControl(element: ElementHandle): Promise<boolean> {

  let role = await getElementAttribute(element,"role");

  return role!==null && controlRoles.indexOf(role) >= 0;
}

export default isElementControl;
