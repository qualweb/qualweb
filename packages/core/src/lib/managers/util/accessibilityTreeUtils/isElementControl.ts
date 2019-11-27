'use strict';

import { Element } from 'htmlparser2';
import {controlRoles } from "./constants";

function isElementControl(element: Element): boolean {

  if (element.attribs === undefined)
    return false;

  let role = element.attribs["role"];

  return controlRoles.indexOf(role) >= 0;
}

export = isElementControl;
