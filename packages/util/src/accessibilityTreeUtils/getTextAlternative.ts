'use strict';

import {DomElement} from "htmlparser2";
import getTrimmedText from './getTrimmedText';
import {trim} from 'lodash';
const stew = new (require('stew-select')).Stew();

function getTextAlternative(id: string, element: DomElement, processedHTML: DomElement[]): string | undefined {
  if (!element.attribs)
    return undefined;

  let alt = element.attribs["alt"];
  let title = element.attribs["title"];
  let value = element.attribs["value"];
  let placeHolder = element.attribs["placeholder"];
  let labelContent, caption, figcaption, legend;

  if (id) {
    labelContent = stew.select(processedHTML, 'label[for="' + id + '"]');
  }
  if (element.name === 'table') {
    caption = stew.select(element, 'caption');
  }
  if (element.name === 'figure') {
    figcaption = stew.select(element, 'figcaption');
  }
  if (element.name === 'fieldset') {
    legend = stew.select(element, 'legend');
  }
  
  if (alt !== undefined && trim(alt) !== "")
    return alt;
  else if (title !== undefined && trim(title) !== "")
    return title;
  else if (labelContent && labelContent.length !== 0)
    return getTrimmedText(labelContent[0]);
  else if (caption && caption.length !== 0)
    return getTrimmedText(caption[0]);
  else if (value && trim(value) !== "")
    return value;
  else if (figcaption && figcaption.length !== 0)
    return getTrimmedText(figcaption[0]);
  else if (legend && legend.length !== 0)
    return getTrimmedText(legend[0]);
  else if (placeHolder && trim(placeHolder) !== "")
    return placeHolder;
  else
    return undefined;
}

export = getTextAlternative;
