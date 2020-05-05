
'use strict';

import isElementHiddenByCSSAux from './isElementHiddenByCSSAux';
import getElementAttribute from './getElementAttribute';
import getElementParent from "./getElementParent";
import getElementTagName from './getElementTagName';
import { QWElement } from "../qwElement";

async function isElementHidden(elementQW: QWElement): Promise<boolean> {
  if (!elementQW.elementHtml) {
    throw Error('Element is not defined');
  }
  const name = await getElementTagName(elementQW);
  const type = await getElementAttribute(elementQW, "type")
  let typeHidden = name === "input" && type === "hidden";
  const ariaHidden = await getElementAttribute(elementQW, 'aria-hidden') === 'true';
  const hidden = await getElementAttribute(elementQW, 'hidden') !== null;
  const cssHidden = await isElementHiddenByCSSAux(elementQW);
  const parent = await getElementParent(elementQW);
  let parentHidden = false;
  if (parent) {
    parentHidden = await isElementHidden(parent);
  }

  return cssHidden || hidden || ariaHidden || parentHidden || typeHidden;
}

export default isElementHidden;
