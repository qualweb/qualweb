'use strict';

import {DomElement, DomUtils} from "htmlparser2";
import {trim} from 'lodash';

function getTrimmedText(element: DomElement): string {
  return trim(DomUtils.getText(element));
}

export = getTrimmedText;
