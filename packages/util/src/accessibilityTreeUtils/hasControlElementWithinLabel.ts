'use strict';

import {DomElement} from "htmlparser2";
import getLabel from './getLabel';

const stew = new (require('stew-select')).Stew();

function hasControlElementWithinLabel(id: string, element: DomElement, processedHTML: DomElement[]): boolean {
  let label = getLabel(id, element, processedHTML);
  if (!label)
    label = element;

  let hasControlWithinLabel = stew.select(label, `[role="spinbutton"],[role="slider"],[role="scrollbar"],role="progressbar"],[role="textbox"],[role="button"],[role="combobox"],[role="listbox"],[role="range"],button,select,textarea,input[type="text"]`);
  return hasControlWithinLabel.length > 0;
}

export = hasControlElementWithinLabel;
