'use strict';

import { QWPage } from '@qualweb/qw-page';
import { QWElement } from '@qualweb/qw-element';
function isFocusableBrowser(page: QWPage, element: QWElement): boolean {
  element.focusElement();
  let focused = page.getFocusedElement();
  return element.getElementSelector() === focused.getElementSelector();
}

export default isFocusableBrowser;
