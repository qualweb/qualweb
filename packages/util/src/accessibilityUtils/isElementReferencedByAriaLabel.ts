'use strict';

import { QWPage } from '@qualweb/qw-page';
import { QWElement } from '@qualweb/qw-element';


function isElementReferencedByAriaLabel(elementQW: QWElement, pageQW: QWPage): boolean {

  let id = elementQW.getElementAttribute( "id");
  let treeSelector = elementQW.getTreeSelector();
  let result = false;
  try{
  if (id !== null) {
    let referencedByAriaLabel = pageQW.getElements(`[aria-labelledby="${id}"]` + treeSelector);
    let i = 0;
    while(i < referencedByAriaLabel.length){
      let ariaLabelBy = referencedByAriaLabel[i].getElementAttribute( "aria-labelledby");
      if (ariaLabelBy !== null) {
        let ids = ariaLabelBy.split(" ");
        if (ids.includes(id)) {
          result = true;
        }
      }
      i++;
    }
  }}catch{}
  return result;
}

export default isElementReferencedByAriaLabel;
