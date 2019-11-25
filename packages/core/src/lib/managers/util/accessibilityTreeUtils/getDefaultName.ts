'use strict';

import { ElementHandle } from 'puppeteer';

function getDefaultName(element: ElementHandle): string {
  let name = element.name;
  let type;
  let result = "";

  if (element.attribs && name === "input") {
    type = element.attribs["type"];
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
