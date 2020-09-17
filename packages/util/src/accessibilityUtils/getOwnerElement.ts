'use strict';

import { QWPage } from '@qualweb/qw-page';
import { QWElement } from '@qualweb/qw-element';
import getAriaOwner from './isElementAriaOwned';
import isElementInAT from './isElementInAT';

function getOwnerElement(elementQW: QWElement, pageQW: QWPage): QWElement | null {
  let ariaOwner = getAriaOwner(elementQW, pageQW);
  let ownerElement;

  if (ariaOwner) {
    ownerElement = ariaOwner;
  } else {
    let parent = elementQW.getElementParent();
    while (!!parent && !!ownerElement) {
      if (isElementInAT(parent, pageQW))
        ownerElement = parent;
      parent = parent.getElementParent();
    }
  }
  return ownerElement;
}

export default getOwnerElement;
