'use strict';

import {ElementHandle, Page} from "puppeteer";
import isElementWidget from './isElementWidget';
import getElementAttribute from '../domUtils/getElementAttribute';

async function getDisabledWidgets(page:Page): Promise<ElementHandle[]> {
  let elements = await page.$$('*');
  let disabledElements:ElementHandle[] = [];
  let isWidget;
  let disable;
  let ariaDisable;
  for(let element of elements){
    isWidget = await isElementWidget(element,page);
    disable = (await getElementAttribute(element, 'disabled')) !== null;
    ariaDisable = (await getElementAttribute(element, 'aria-disabled')) !== null;
    if(isWidget && (disable || ariaDisable)){
      disabledElements.push(element);
    }
  }
  return disabledElements;
}

export default getDisabledWidgets;