'use strict';
import { QWPage } from '@qualweb/qw-page';
import { QWElement } from '@qualweb/qw-element';

function elementIDIsReferenced(pageQW: QWPage, elementQW: QWElement, id: string, attribute: string): boolean {
  if (!elementQW || !pageQW) {
    throw Error('Element is not defined');
  }
  let treeSelector = elementQW.getTreeSelector();
  let result;
  try {
    result = (pageQW.getElement('[' + attribute + `="${id}"]` + treeSelector)) !== null;
  }
  catch{
    result = false;
  }
  return result;
}

export default elementIDIsReferenced;
