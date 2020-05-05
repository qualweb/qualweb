'use strict';

import { QWPage } from '@qualweb/qw-page';
import { QWElement } from '@qualweb/qw-element';
import isElementWidget from './isElementWidget';



async function getDisabledWidgets(pageQW: QWPage): Promise<QWElement[]> {
  let elements = pageQW.getElements( '*');
  let disabledElements: QWElement[] = [];
  let isWidget, disable, ariaDisable, parent, parentTag;
  for (let element of elements) {
    isWidget = await isElementWidget(element, pageQW);
    disable = (element.getElementAttribute( 'disabled')) !== null;
    ariaDisable = (element.getElementAttribute( 'aria-disabled')) !== null;
    parent = element.getElementParent();
    if (parent && !(disable || ariaDisable)) {
      parentTag = element.getElementTagName();
      if (parentTag === "label") {
        parent = element.getElementParent();
        disable = (element.getElementAttribute( 'disabled')) !== null;
        ariaDisable = (element.getElementAttribute( 'aria-disabled')) !== null;
      }
    }
    if (isWidget && (disable || ariaDisable)) {
      disabledElements.push(element);
    }
  }
  return disabledElements;
}

export default getDisabledWidgets;