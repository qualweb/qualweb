function getElementRoleAName(element: typeof window.qwElement, aName: string | undefined): string | null {
  const explicitRole = element.getElementAttribute('role');
  let role = explicitRole;
  if (
    explicitRole === null ||
    ((explicitRole === 'none' || explicitRole === 'presentation') &&
      (window.AccessibilityUtils.isElementFocusable(element) ||
        window.AccessibilityUtils.elementHasGlobalARIAPropertyOrAttribute(element)))
  ) {
    const implicitRole = window.AccessibilityUtils.getImplicitRole(element, aName);
    role = implicitRole || explicitRole;
  }
  return role;
}

export = getElementRoleAName;
