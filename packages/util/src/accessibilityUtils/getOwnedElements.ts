'use strict';

import { QWPage } from '@qualweb/qw-page';
import { QWElement } from '@qualweb/qw-element';
import getAriaOwner from './getAriaOwner';
import { AccessibilityUtils } from '@qualweb/util';
//elementQW isInAT
function getOwnedElements(elementQW: QWElement, pageQW: QWPage): QWElement[] {
  let children = elementQW.getElementChildren();
  let result: QWElement[] = [];
  let ariaOwnedElements = getAriaOwnedElements(elementQW, pageQW);
  result.push(...ariaOwnedElements);
  for (let child of children) {
    result.push(...getOwnedElementsAux(child, pageQW, elementQW.getElementSelector()));
  }
  return result;
}
function getOwnedElementsAux(elementQW: QWElement, pageQW: QWPage, ownerSelector: string): QWElement[] {
  let ariaOwner = getAriaOwner(elementQW, pageQW);
  if (
    AccessibilityUtils.isElementInAT(elementQW, pageQW) &&
    (!ariaOwner || (!!ariaOwner && ariaOwner.getElementSelector() === ownerSelector))
  ) {
    return [elementQW];
  } else {
    let children = elementQW.getElementChildren();
    let result: QWElement[] = [];
    for (let child of children) {
      result.push(...getOwnedElementsAux(child, pageQW, ownerSelector));
    }
    return result;
  }
}

function getAriaOwnedElements(elementQW: QWElement, pageQW: QWPage): QWElement[] {
  let ariaOwns = elementQW.getElementAttribute('aria-owns');
  let elements: QWElement[] = [];
  if (ariaOwns) {
    let splitted = ariaOwns.split(',');
    for (let id of splitted) {
      let elem = pageQW.getElementByID(id);
      if (!!elem) {
        elements.push(elem);
      }
    }
  }
  return elements;
}

export default getOwnedElements;
