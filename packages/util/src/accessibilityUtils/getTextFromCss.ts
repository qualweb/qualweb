'use strict';

import { QWElement } from '@qualweb/qw-element';

function getTextFromCss(elementQW: QWElement, textContent: string): string {
  const before = elementQW.getElementStyleProperty('computed-style-before', 'content');
  const after = elementQW.getElementStyleProperty('computed-style-after', 'content');

  return before + textContent + after;
}

export default getTextFromCss;
