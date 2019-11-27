'use strict';

function isElementReferencedByAriaLabel(id: string, document:Document): boolean {
  let refrencedByAriaLabel = document.querySelector(`[aria-labelledby="${id}"]`);
  return refrencedByAriaLabel!== null;
}

export = isElementReferencedByAriaLabel;
