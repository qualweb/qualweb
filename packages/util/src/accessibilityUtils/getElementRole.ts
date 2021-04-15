function getElementRole(element: typeof window.qwElement): string | null {
  const aName = window.AccessibilityUtils.getAccessibleName(element);
  return window.AccessibilityUtils.getElementRoleAName(element, aName);
}

export default getElementRole;
