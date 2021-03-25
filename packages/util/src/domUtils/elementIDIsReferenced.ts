'use strict';
import { QWPage } from '@qualweb/qw-page';
import { QWElement } from '@qualweb/qw-element';

function elementIDIsReferenced(elementQW: QWElement, pageQW: QWPage, id: string, attribute: string): boolean {
  if (!elementQW || !pageQW) {
    throw Error('Element is not defined');
  }
  let result: boolean;
  try {
    result = pageQW.getElement('[' + attribute + `="${id}"]`, elementQW) !== null;
  } catch {
    result = false;
  }
  return result;
}

export default elementIDIsReferenced;
