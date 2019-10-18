'use strict';

import {DomElement} from "htmlparser2";


function allowsNameFromContent(element: DomElement): boolean {

  let role,name;
  name = element.name;
  let nameFromContentElements = ["button","h1","h2","h3","h4","h5","h6","a","link","listitem","option","menuitem","option","tr","text"];

  if (element.attribs !== undefined)
      role = element.attribs["role"];


  let nameFromContentRoles = ["button", "cell", "checkbox", "columnheader", "gridcell", "heading", "link", "menuitem", "menuitemcheckbox", "menuitemradio", "option", "radio", "row", "rowgroup", "rowheader", "switch", "tab", "tooltip", "tree", "treeitem"];

  return nameFromContentRoles.indexOf(role) >= 0|| nameFromContentElements.indexOf(name) >= 0;
}
export = allowsNameFromContent;
