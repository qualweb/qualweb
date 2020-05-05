'use strict';

import { QWElement } from '@qualweb/html-util';
import { AccessibilityUtils } from "..";


async function getTextFromCss(elementQW: QWElement, textContent: string): Promise<string> {

  let before = await AccessibilityUtils.domUtils.getElementStyleProperty(elementQW, "computed-style-before", "content");
  let after = await AccessibilityUtils.domUtils.getElementStyleProperty(elementQW, "computed-style-after", "content");

  return before + textContent + after;
}

export default getTextFromCss;
