function isElementADescendantOfExplicitRole(
  element: typeof window.qwElement,
  names: Array<string>,
  roles: Array<string>
): boolean {
  const parent = element.getElementParent();

  if (parent !== null) {
    let sameRole = false;
    let sameName = false;
    const parentName = parent.getElementTagName();
    const parentRole = parent.getElementAttribute('role');

    if (parentName !== null) {
      sameName = names.includes(parentName);
    }
    if (parentRole !== null) {
      sameRole = roles.includes(parentRole);
    }

    if (sameName || sameRole) {
      return true;
    }

    return window.DomUtils.isElementADescendantOfExplicitRole(parent, names, roles);
  }

  return false;
}

export default isElementADescendantOfExplicitRole;
