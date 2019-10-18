'use strict';

import {DomElement} from "htmlparser2";
const stew = new (require('stew-select')).Stew();

function isElementReferencedByAriaLabel(id: string, processedHTML: DomElement[], element: DomElement): boolean {

  let refrencedByAriaLabel = stew.select(processedHTML, `[aria-labelledby="${id}"]`);

  return refrencedByAriaLabel.length !== 0;

}

export = isElementReferencedByAriaLabel;
