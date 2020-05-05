'use strict';

import { nameFromContentRoles, nameFromContentElements } from "./constants";
import { QWElement } from "@qualweb/qw-element";


async function allowsNameFromContent(element: QWElement): Promise<boolean> {

  let role, name;
  name = element.getElementTagName();
  role = element.getElementAttribute("role");


  return role && nameFromContentRoles.indexOf(role) >= 0 || name && nameFromContentElements.indexOf(name) >= 0;
}

export default allowsNameFromContent;
