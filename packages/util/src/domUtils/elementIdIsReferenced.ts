import type { QWElement } from '@qualweb/qw-element';
function elementIdIsReferenced(element: QWElement, id: string, attribute: string): boolean {
  let result: boolean;
  try {
    result = window.qwPage.getElement('[' + attribute + `="${id}"]`, element) !== null;
  } catch {
    result = false;
  }
  return result;
}

export default elementIdIsReferenced;
