'use strict';

import {DomElement} from "htmlparser2";

function isElementChildOfDetails(element: DomElement): boolean {
  return !!element.parent && element.parent.name === "details";
}

export = isElementChildOfDetails;
