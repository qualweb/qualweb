'use strict';

import {DomElement} from 'htmlparser2';
const stew = new (require('stew-select')).Stew();

function getElementById(id: string | undefined, processedHTML: DomElement[]): DomElement[] {
  let element = [];
  if (id)
    element = stew.select(processedHTML, '[id="' + id + '"]');

  return element;
}

export = getElementById;
