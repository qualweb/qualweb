'use strict';
import { ElementHandle } from "puppeteer";
import getElementAttribute from "../domUtils/getElementAttribute";
import getElementTagName from '../domUtils/getElementTagName';

async function getDefaultName(element: ElementHandle): Promise<string> {
  let name = await getElementTagName(element);
  if (!name)
    name = '';
  let type;
  let result = "";

  if (name === "input") {
    type = await getElementAttribute(element, "type");;
  }

  /*if (type === "image") {
    result = "image";
  } */ if (type === "submit") {
    result = "Reset";
  } else if (type === "reset") {
    result = "Reset";
  }

  return result;
}

export default getDefaultName;
