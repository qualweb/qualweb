import type { QWPage } from '@packages/qw-page/src';
import type { QWElement } from '@packages/qw-element/src';
import DomUtils from './domUtils/domUtils';
import AccessibilityUtils from './accessibilityUtils/accessibilityUtils';

declare global {
  interface Window {
    qwPage: QWPage;
    qwElement: QWElement;
    DomUtils: typeof DomUtils;
    AccessibilityUtils: typeof AccessibilityUtils;
    disabledWidgets: QWElement[];
  }
}

window.DomUtils = DomUtils;
window.AccessibilityUtils = AccessibilityUtils;
window.disabledWidgets = AccessibilityUtils.getDisabledWidgets();

export { DomUtils, AccessibilityUtils };
