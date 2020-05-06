'use strict';

import { QWElement } from "@qualweb/qw-element";

function areElementsInTheSameTree(elements: QWElement[]): boolean {

  let attribute = elements[0].getElementAttribute("shadowTree");
  let i = 1;
  let result = true;
  while (i < elements.length && result) {
    result = attribute === elements[i].getElementAttribute("shadowTree");
  }

  return result;
}

export default areElementsInTheSameTree;
