'use strict';

import { QWPage } from '@qualweb/qw-page';
import { QWElement } from '@qualweb/qw-element';
//fixme
function isFocusableBrowser(page: QWPage, element: QWElement): boolean {
  //await element.focus();
  //const snapshot = await page.accessibility.snapshot({ root: element });
  return true;//snapshot && snapshot.focused !== undefined;
}

export default isFocusableBrowser;
