'use strict';

import {DomElement} from "htmlparser2";

function isElementWidget(element: DomElement): boolean {

  let widgetElements = ['a', 'button', 'input', 'meter', 'output', 'progress', 'select', 'td', 'textarea', 'li', 'option'];
  let widgetRoles = ["button", "checkbox", "gridcell", "link", "menuitem", "menuitemcheckbox", "menuitemradio", "option", "progressbar", "radio", "scrollbar", "searchbox", "separator", "slider", "spinbutton", "switch", "tab", "tabpanel", "textbox", "treeitem"];

  if (element.attribs === undefined)
    return false;

  let name = '';
  let role = element.attribs["role"];
  if (element.name)
    name = element.name;

  return widgetRoles.indexOf(role) >= 0 || widgetElements.indexOf(name) >= 0;
}

export = isElementWidget;
