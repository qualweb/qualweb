'use strict';

import { QWPage } from '@qualweb/qw-page';
import { QWElement } from '@qualweb/qw-element';

function isElementReferencedByAriaLabel(elementQW: QWElement, pageQW: QWPage): boolean {
  const id = elementQW.getElementAttribute('id');
  let result = false;
  try {
    if (id !== null) {
      const referencedByAriaLabel = pageQW.getElements(`[aria-labelledby~="${id}"]`, elementQW);
      let i = 0;
      while (i < referencedByAriaLabel.length) {
        const ariaLabelBy = referencedByAriaLabel[i].getElementAttribute('aria-labelledby');
        if (ariaLabelBy !== null) {
          const ids = ariaLabelBy.split(' ');
          if (ids.includes(id)) {
            result = true;
          }
        }
        i++;
      }
    }
  } catch {}
  return result;
}

export default isElementReferencedByAriaLabel;
