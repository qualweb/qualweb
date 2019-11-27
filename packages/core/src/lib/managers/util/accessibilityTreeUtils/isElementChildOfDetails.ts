'use strict';

import { Element } from 'htmlparser2';

function isElementChildOfDetails(element: Element): boolean {
  return !!element.parent && element.parent.name === "details";
}

export = isElementChildOfDetails;
