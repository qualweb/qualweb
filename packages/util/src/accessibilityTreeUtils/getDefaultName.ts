'use strict';
import { ElementHandle } from "puppeteer";
import getElementAttribute from "../domUtils/getElementAttribute";
import getElementName from '../domUtils/getElementName';

async function getDefaultName(element: ElementHandle): Promise<string> {
  let name = await getElementName(element);
  if (name)
    name = name.toLocaleLowerCase();
  let type;
  let result = "";

  if (name === "input") {
    type = await getElementAttribute(element, "type");;
  }

  /*if (type === "image") {
    result = "image";
  } */ if (type === "submit") {
    result = "reset";
  } else if (type === "reset") {
    result = "reset";
  }

  return result;
}

export = getDefaultName;
