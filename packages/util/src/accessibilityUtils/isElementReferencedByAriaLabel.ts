'use strict';

import { QWElement,QWPage } from '@qualweb/html-util';
import { AccessibilityUtils } from "..";

//import getTreeSelector from "../shadowDomUtils/getTreeSelector";

async function isElementReferencedByAriaLabel(elementQW: QWElement,  pageQW:QWPage): Promise<boolean> {

  let id = await AccessibilityUtils.domUtils.getElementAttribute(elementQW, "id");
  //let treeSelector = await getTreeSelector(elementQW);
  let result = false;
  if (id !== null) {
    let referencedByAriaLabel = await AccessibilityUtils.domUtils.getElementsInsideDocument(pageQW,`[aria-labelledby*="${id}"]`/* + treeSelector*/);
    let i = 0;
    while(i < referencedByAriaLabel.length){
      let ariaLabelBy = await AccessibilityUtils.domUtils.getElementAttribute(referencedByAriaLabel[i], "aria-labelledby");
      if (ariaLabelBy !== null) {
        let ids = ariaLabelBy.split(" ");
        if (ids.includes(id)) {
          result = true;
        }
      }
      i++;
    }
  }
  return result;
}

export default isElementReferencedByAriaLabel;
