function isElementADescendantOf(element: typeof window.qwElement, names: Array<string>, roles: Array<string>): boolean {
  const parent = element.getElementParent();

  if (parent !== null) {
    let sameRole = false;
    let sameName = false;
    const parentName = parent.getElementTagName();
    const parentRole = window.AccessibilityUtils.getElementRole(parent);

    if (parentName !== null) {
      sameName = names.includes(parentName);
    }
    if (parentRole !== null) {
      sameRole = roles.includes(parentRole);
    }

    if (sameName || sameRole) {
      return true;
    }

    return window.DomUtils.isElementADescendantOf(parent, names, roles);
  }

  return false;
}

export default isElementADescendantOf;
