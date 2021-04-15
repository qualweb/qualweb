function isFocusableBrowser(element: typeof window.qwElement): boolean {
  element.focusElement();
  const focused = window.qwPage.getFocusedElement();
  return element.getElementSelector() === focused?.getElementSelector();
}

export default isFocusableBrowser;
