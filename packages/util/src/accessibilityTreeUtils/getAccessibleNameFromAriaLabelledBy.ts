'use strict';

import {DomElement} from "htmlparser2";
import {getElementById} from "../domUtils/domUtils";
import getAccessibleName = require("./getAccessibleName");

function getAccessibleNameFromAriaLabelledBy(ariaLabelId: string, processedHTML: DomElement[]): string | undefined{
  let ListIdRefs = ariaLabelId.split(" ");
  let result: string | undefined;
  let accessNameFromId: string | undefined;

  for (let id of ListIdRefs) {
    accessNameFromId = getAccessibleName(getElementById(id, processedHTML)[0], processedHTML, true);
    if (accessNameFromId) {
      if (result) {
        result += accessNameFromId;
      } else {
        result = accessNameFromId;
      }
    }
  }

  return result;
}

export = getAccessibleNameFromAriaLabelledBy;
