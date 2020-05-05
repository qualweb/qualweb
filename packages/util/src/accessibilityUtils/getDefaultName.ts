'use strict';

import { QWElement } from '@qualweb/qw-element';

async function getDefaultName(elementQW: QWElement): Promise<string> {
  let name = elementQW.getElementTagName();
  if (!name)
    name = '';
  let type;
  let result = "";

  if (name === "input") {
    type = elementQW.getElementAttribute( "type");;
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
