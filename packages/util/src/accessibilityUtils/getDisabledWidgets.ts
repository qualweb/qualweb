'use strict';

import { QWPage } from '@qualweb/qw-page';
import { QWElement } from '@qualweb/qw-element';
import { AccessibilityUtils } from '@qualweb/util';

function getDisabledWidgets(pageQW: QWPage): QWElement[] {
  let elements = pageQW.getElements('*');
  let disabledElements: QWElement[] = [];
  let isWidget, disable, ariaDisable, parent, parentTag;
  for (let element of elements) {
    isWidget = AccessibilityUtils.isElementWidget(element, pageQW);
    disable = (element.getElementAttribute( 'disabled')) !== null;
    ariaDisable = (element.getElementAttribute( 'aria-disabled')) !== null;
    parent = element.getElementParent();
    if (parent && !(disable || ariaDisable)) {
      parentTag = parent.getElementTagName();
      if (parentTag === "label") {
        parent = parent.getElementParent();
        disable = (parent.getElementAttribute( 'disabled')) !== null;
        ariaDisable = (parent.getElementAttribute( 'aria-disabled')) !== null;
      }
    }
    if (isWidget && (disable || ariaDisable)) {
      disabledElements.push(element);
    }
  }
  return disabledElements;
}

export default getDisabledWidgets;
