'use strict';

import getElementStyleProperty from './getElementStyleProperty';
import { QWElement } from "../qwElement";

async function isElementHiddenByCSSAux(elementQW: QWElement): Promise<boolean> {
  if (!elementQW.elementHtml) {
    throw Error('Element is not defined');
  }

  let visibility;
  let displayNone;
  const display = await getElementStyleProperty(elementQW,  'display','');
  displayNone = display ? display.trim() === 'none' : false;
  const visibilityATT = await getElementStyleProperty(elementQW, 'visibility','');
  visibility = visibilityATT ? visibilityATT.trim() === 'collapse' || visibilityATT.trim() === 'hidden' : false;


return visibility || displayNone;
}

export default isElementHiddenByCSSAux;
