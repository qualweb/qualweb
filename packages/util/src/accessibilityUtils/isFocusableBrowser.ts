import type { QWElement } from '@qualweb/qw-element';

function isFocusableBrowser(element: QWElement): boolean {
  element.focusElement();
  const focused = window.qwPage.getFocusedElement();
  return element.getElementSelector() === focused?.getElementSelector();
}

export default isFocusableBrowser;
