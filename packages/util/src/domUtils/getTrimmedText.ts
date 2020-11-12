'use strict';

import { QWElement } from '@qualweb/qw-element';
function getTrimmedText(elementQW: QWElement): string {
  if (!elementQW) {
    throw Error('Element is not defined');
  }
  let text = elementQW.getElementText();

  if (text) {
    text = text.trim();
  } else {
    text = '';
  }
  return text;
}

export default getTrimmedText;
