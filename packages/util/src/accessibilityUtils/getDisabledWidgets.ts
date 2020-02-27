'use strict';

import {ElementHandle, Page} from "puppeteer";
import isElementWidget from './isElementWidget';
import getElementAttribute from '../domUtils/getElementAttribute';
import getElementParent from '../domUtils/getElementParent'
import getElementTagName from '../domUtils/getElementTagName'

async function getDisabledWidgets(page:Page): Promise<ElementHandle[]> {
  let elements = await page.$$('*');
  let disabledElements:ElementHandle[] = [];
  let isWidget, disable, ariaDisable, parent, parentTag;
  for(let element of elements){
    isWidget = await isElementWidget(element,page);
    disable = (await getElementAttribute(element, 'disabled')) !== null;
    ariaDisable = (await getElementAttribute(element, 'aria-disabled')) !== null;
    parent = await getElementParent(element);
    if(parent && !(disable || ariaDisable)){
      parentTag = await getElementTagName(parent);
      if(parentTag === "label"){
        parent = await getElementParent(parent);
        disable = (await getElementAttribute(parent, 'disabled')) !== null;
        ariaDisable = (await getElementAttribute(parent, 'aria-disabled')) !== null;
      }
    }
    if(isWidget && (disable || ariaDisable)){
      disabledElements.push(element);
    }
  }
  return disabledElements;
}

export default getDisabledWidgets;