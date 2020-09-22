'use strict';

import { QWPage } from '@qualweb/qw-page';
import { QWElement } from '@qualweb/qw-element';
import { AccessibilityUtils } from '@qualweb/util';

function getAriaOwner(elementQW: QWElement, pageQW: QWPage): QWElement | null {
  let id = elementQW.getElementAttribute("id");
  let ariaOwns = pageQW.getElements('[aria-owns]', elementQW);
  let index = 0;
  let ariaOwner;
  while (id && index < ariaOwns.length && !!ariaOwns) {
    let ariaElement = ariaOwns[index];
    let ariaOwnsAtribute = ariaElement.getElementAttribute("aria-owns")
    if (!!ariaOwnsAtribute) {
      let idArray = ariaOwnsAtribute.split(" ");
      if (idArray.includes(id) && AccessibilityUtils.isElementInAT(ariaElement,pageQW)) {
        ariaOwner = ariaElement;
      }
    }
    index++;
  }
  return ariaOwner;
}

export default getAriaOwner;
