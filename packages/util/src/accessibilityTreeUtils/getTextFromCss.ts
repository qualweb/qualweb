'use strict';

import {DomElement} from "htmlparser2";
import {getElementStyleProperty} from "../domUtils/domUtils";

function getTextFromCss(element: DomElement, textContent: string): string {

  let before = getElementStyleProperty(element, "computed-style-before", "content");
  let after = getElementStyleProperty(element, "computed-style-after", "content");

  return before + textContent + after;
}

export = getTextFromCss;
