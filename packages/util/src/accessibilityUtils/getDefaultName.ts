'use strict';

import { QWElement } from '@qualweb/html-util';
import { AccessibilityUtils } from "..";


async function getDefaultName(elementQW: QWElement): Promise<string> {
  let name = await AccessibilityUtils.domUtils.getElementTagName(elementQW);
  if (!name)
    name = '';
  let type;
  let result = "";

  if (name === "input") {
    type = await AccessibilityUtils.domUtils.getElementAttribute(elementQW, "type");;
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
