'use strict';

import { ElementHandle } from 'puppeteer';
import getElementAttribute = require('../domUtils/getElementAttribute');

async function elementHasRoleNoneOrPresentation(element: ElementHandle): Promise<boolean> {
  let role = await getElementAttribute(element,"role")
  return !!role && (role === "none" ||role === "presentation");
}

export = elementHasRoleNoneOrPresentation;
