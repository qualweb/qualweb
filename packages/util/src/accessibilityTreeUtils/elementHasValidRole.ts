'use strict';
import { ElementHandle } from "puppeteer";
import { getElementAttribute } from "../domUtils/domUtils";
import { keys } from 'lodash';
import roles from './roles.json';

async function elementHasValidRole(element: ElementHandle): Promise<boolean> {

  let role = await getElementAttribute(element, "role");
  let result = false;
  if (role !== null)
    result = keys(roles).includes(role);

  return result;
}

export = elementHasValidRole;
