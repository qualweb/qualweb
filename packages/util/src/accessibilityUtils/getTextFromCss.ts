'use strict';

import { QWElement } from '@qualweb/qw-element';


async function getTextFromCss(elementQW: QWElement, textContent: string): Promise<string> {

  let before = elementQW.getElementStyleProperty( "computed-style-before", "content");
  let after = elementQW.getElementStyleProperty( "computed-style-after", "content");

  return before + textContent + after;
}

export default getTextFromCss;
