import DomUtils from './domUtils/domUtils';
import AccessibilityUtils from './accessibilityUtils/accessibilityUtils';

window.DomUtils = DomUtils;
window.AccessibilityUtils = AccessibilityUtils;
window.disabledWidgets = AccessibilityUtils.getDisabledWidgets();

export { DomUtils, AccessibilityUtils };
