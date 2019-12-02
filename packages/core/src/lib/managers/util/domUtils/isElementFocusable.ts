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
  let tabIndexExists = false;

  const hasAttributes = await elementHasAttributes(element);
  const tabindex = await getElementAttribute(element, 'tabindex');

  if (hasAttributes) {
    tabIndexExists = tabindex !== null;
  }

  if (hasAttributes) {
    disabled = (await getElementAttribute(element, 'disabled')) !== null;
    hidden = (await element.boundingBox()) === null;
    focusableByDefault = await isElementFocusableByDefault(element);

    if (tabindex && !isNaN(parseInt(tabindex, 10))) {
      tabIndexLessThanZero = parseInt(tabindex, 10) < 0;
    }
  }
  if (focusableByDefault) {
    return !(disabled || hidden || tabIndexLessThanZero);
  } else {
    return tabIndexExists ? !tabIndexLessThanZero : false;
  }
}

export = isElementFocusable;
