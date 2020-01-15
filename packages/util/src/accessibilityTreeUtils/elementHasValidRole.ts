'use strict';
import { ElementHandle, Page } from "puppeteer";
import roles from './roles.json';
import getElementRole from "./getElementRole";

async function elementHasValidRole(element: ElementHandle,page:Page): Promise<boolean> {

  let role = await getElementRole(element,page);
  let result = false;
  if (role !== null)
    result = Object.keys(roles).includes(role);

  return result;
}

export = elementHasValidRole;
