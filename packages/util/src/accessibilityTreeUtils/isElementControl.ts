'use strict';

import {DomElement} from "htmlparser2";

function isElementControl(element: DomElement): boolean {

  if (element.attribs === undefined)
    return false;

  let controlRoles = ["textbox", "button", "combobox", "listbox", "range", "progressbar", "scrollbar", "slider", "spinbutton"];
  let role = element.attribs["role"];

  return controlRoles.indexOf(role) >= 0;
}

export = isElementControl;
