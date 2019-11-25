'use strict';

import { ElementHandle } from 'puppeteer';
import {controlRoles } from "./constants";

function isElementControl(element: ElementHandle): boolean {

  if (element.attribs === undefined)
    return false;

  let role = element.attribs["role"];

  return controlRoles.indexOf(role) >= 0;
}

export = isElementControl;
