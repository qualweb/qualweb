'use strict';

import { QWElement,QWPage } from '@qualweb/html-util';
import isElementWidget from './isElementWidget';
import { AccessibilityUtils } from "..";



async function getDisabledWidgets(pageQW:QWPage): Promise<QWElement[]> {
  let elements = await AccessibilityUtils.domUtils.getElementsInsideDocument(pageQW,'*');
  let disabledElements:QWElement[] = [];
  let isWidget, disable, ariaDisable, parent, parentTag;
  for(let element of elements){
    isWidget = await isElementWidget(element,pageQW);
    disable = (await AccessibilityUtils.domUtils.getElementAttribute(element, 'disabled')) !== null;
    ariaDisable = (await AccessibilityUtils.domUtils.getElementAttribute(element, 'aria-disabled')) !== null;
    parent = await AccessibilityUtils.domUtils.getElementParent(element);
    if(parent && !(disable || ariaDisable)){
      parentTag = await AccessibilityUtils.domUtils.getElementTagName(parent);
      if(parentTag === "label"){
        parent = await AccessibilityUtils.domUtils.getElementParent(parent);
        disable = (await AccessibilityUtils.domUtils.getElementAttribute(parent, 'disabled')) !== null;
        ariaDisable = (await AccessibilityUtils.domUtils.getElementAttribute(parent, 'aria-disabled')) !== null;
      }
    }
    if(isWidget && (disable || ariaDisable)){
      disabledElements.push(element);
    }
  }
  return disabledElements;
}

export default getDisabledWidgets;