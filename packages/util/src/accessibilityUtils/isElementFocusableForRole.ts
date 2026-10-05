import type { QWElement } from '@qualweb/qw-element';

/** Include programmatic focus when resolving ARIA role semantics. */
function isElementFocusableForRole(element: QWElement): boolean {
  if (window.AccessibilityUtils.isElementFocusable(element)) return true;

  // The existing helper checks keyboard navigation and excludes negative
  // tabindex and editing hosts. ARIA role semantics also depend on these.
  const tabindex = element.getElementAttribute('tabindex');
  const isEditingHost = element.getElementProperty('isContentEditable') === 'true' &&
    element.getElementParent()?.getElementProperty('isContentEditable') !== 'true';
  return (
    (isEditingHost || (tabindex !== null && !Number.isNaN(parseInt(tabindex, 10)))) &&
    !element.elementHasAttribute('disabled') &&
    !window.DomUtils.isElementHiddenByCSS(element)
  );
}

export default isElementFocusableForRole;
