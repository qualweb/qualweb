function getDisabledWidgets(): Array<typeof window.qwElement> {
  const elements = window.qwPage.getElements('*');
  const disabledElements = new Array<typeof window.qwElement>();
  let disable, ariaDisable, parent, parentTag;
  for (const element of elements) {
    const isWidget = window.AccessibilityUtils.isElementWidget(element);
    disable = element.getElementAttribute('disabled') !== null;
    ariaDisable = element.getElementAttribute('aria-disabled') !== null;
    parent = element.getElementParent();
    if (parent && !(disable || ariaDisable)) {
      parentTag = parent.getElementTagName();
      if (parentTag === 'label') {
        parent = parent.getElementParent();
        disable = parent.getElementAttribute('disabled') !== null;
        ariaDisable = parent.getElementAttribute('aria-disabled') !== null;
      }
    }
    if (isWidget && (disable || ariaDisable)) {
      disabledElements.push(element);
    }
  }
  return disabledElements;
}

export default getDisabledWidgets;
