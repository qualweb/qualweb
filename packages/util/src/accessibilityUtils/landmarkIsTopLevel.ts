function landmarkIsTopLevel(element: typeof window.qwElement): boolean {
  const landmarks = ['application', 'banner', 'contentinfo', 'main', 'complementary', 'form', 'navigation', 'region'];
  let parent = element.getElementParent();
  const nodeRole = window.AccessibilityUtils.getElementRole(element);

  while (parent) {
    const role = window.AccessibilityUtils.getElementRole(parent);
    if (role && landmarks.includes(role) && !(role === 'main' && nodeRole === 'complementary')) {
      return false;
    }
    parent = parent.getElementParent();
  }
  return true;
}

export default landmarkIsTopLevel;
