'use strict';

import {DomElement} from "htmlparser2";

function allowsNameFromContent(element: DomElement): boolean {
  if (element.attribs === undefined)
    return false;

  let nameFromContentRoles = ["button", "cell", "checkbox", "columnheader", "gridcell", "heading", "link", "menuitem", "menuitemcheckbox", "menuitemradio", "option", "radio", "row", "rowgroup", "rowheader", "switch", "tab", "tooltip", "tree", "treeitem"];

  let role = element.attribs.role;

  return nameFromContentRoles.indexOf(role) >= 0;
}

export = allowsNameFromContent;
