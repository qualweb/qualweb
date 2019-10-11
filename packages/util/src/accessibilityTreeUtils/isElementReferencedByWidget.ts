'use strict';

import {DomElement, DomUtils} from "htmlparser2";
import {getElementById} from "../domUtils/domUtils";
import isElementWidget from './isElementWidget';
import isElementControl from './isElementControl';

const stew = new (require('stew-select')).Stew();

function isElementReferencedByWidget(id: string, element: DomElement, processedHTML: DomElement[]): boolean {
  if (!element.attribs)
    return false;

  let text = DomUtils.getText(element);
  let widget = isElementWidget(element);
  let control = isElementControl(element);
  let parent = element.parent;
  let forAtt = element.attribs["for"];
  let referencedByLabel = stew.select(processedHTML, `label[for="${id}"]`);
  let referencedByAriaLabel = stew.select(processedHTML, `[aria-labelledby="${id}"]`);
  let referenced = getElementById(forAtt, processedHTML);
  let result, isChildWidget, isChildControl = false;

  if (element.children) {
    for (let child of element.children) {
      if (!isChildWidget)
        isChildWidget = isElementWidget(child);
      if (!isChildControl)
        isChildControl = isElementControl(child);
    }
  }

  if (forAtt && referenced) {
    result = isElementWidget(referenced[0]);
  } else if (referencedByAriaLabel.length > 0) {
    result = isElementWidget(referencedByAriaLabel[0]);
  } else if (widget && text && isChildControl || isChildWidget && element.name === "label" && isChildControl ||
    referencedByLabel.length > 0 && isElementWidget || parent && parent.name === "label" && isElementWidget && !control) {
    // caso de AN de control dentro de label
    result = true;
  }

  return result;
}

export = isElementReferencedByWidget;
