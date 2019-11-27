'use strict';

import { trim } from 'lodash';

function getTrimmedText(element: Element): string {
  let text = "";
  let content = element.textContent;
  if (content)
    text = content
  return trim(text);
}

export = getTrimmedText;
