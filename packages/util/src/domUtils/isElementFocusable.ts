'use strict';

import { ElementHandle } from 'puppeteer';
import isElementFocusableByDefault from './isElementFocusableByDefault';
import elementHasAttributes from './elementHasAttributes';
import getElementAttribute from './getElementAttribute';

async function isElementFocusable(element: ElementHandle): Promise<boolean> {
  let disabled = false;
  let hidden = false;
  let focusableByDefault = false;
  let tabIndexLessThanZero = false;
  let tabIndexExistsAndIsNumber = false;

  const hasAttributes = await elementHasAttributes(element);
  const tabindex = await getElementAttribute(element, 'tabindex');

  if (hasAttributes) {
    tabIndexExistsAndIsNumber = tabindex !== null && !isNaN(parseInt(tabindex, 10));
    disabled = (await getElementAttribute(element, 'disabled')) !== null;
    hidden = (await element.boundingBox()) === null;
    focusableByDefault = await isElementFocusableByDefault(element);

    if (tabindex && tabIndexExistsAndIsNumber) {
      tabIndexLessThanZero = parseInt(tabindex, 10) < 0;
    }
  }
  if (focusableByDefault) {
    return !(disabled && hidden && tabIndexLessThanZero);
  } else {
    return tabIndexExistsAndIsNumber ? !tabIndexLessThanZero : false;
  }
}

export default isElementFocusable;
