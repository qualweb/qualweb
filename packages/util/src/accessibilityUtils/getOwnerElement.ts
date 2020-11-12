'use strict';

import { QWPage } from '@qualweb/qw-page';
import { QWElement } from '@qualweb/qw-element';
import getAriaOwner from './getAriaOwner';
import { AccessibilityUtils } from '@qualweb/util';

function getOwnerElement(elementQW: QWElement, pageQW: QWPage): QWElement | null {
  const ariaOwner = getAriaOwner(elementQW, pageQW);
  let ownerElement;

  if (ariaOwner) {
    ownerElement = ariaOwner;
  } else {
    let parent = elementQW.getElementParent();
    while (!!parent && !ownerElement) {
      if (AccessibilityUtils.isElementInAT(parent, pageQW)) ownerElement = parent;
      parent = parent.getElementParent();
    }
  }
  return ownerElement;
}

export default getOwnerElement;
