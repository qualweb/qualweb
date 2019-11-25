'use strict';

import {ElementHandle, DomUtils} from "htmlparser2";
import {trim} from 'lodash';

function getTrimmedText(element: ElementHandle): string {
  return trim(DomUtils.getText(element));
}

export = getTrimmedText;
