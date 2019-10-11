'use strict';

import {DomElement} from "htmlparser2";
const stew = new (require('stew-select')).Stew();

function isElementReferencedByLabelOrAriaLabel(id: string, element: DomElement, processedHTML: DomElement[]): boolean {

  let referencedByAriaLabel = stew.select(processedHTML, `[aria-labelledby="${id}"]`);
  let referencedByLabel = stew.select(processedHTML, `label[for="${id}"]`);
  let parent = element.parent;

  return (parent && parent.name === "label") || referencedByAriaLabel.length !== 0 || referencedByLabel.length !== 0;
}

export = isElementReferencedByLabelOrAriaLabel;
