import type { QWElement } from '@qualweb/qw-element';

function getVisibleText(element: QWElement): string {
  const children = element.getElementChildren();
  let text = '';

  if (children.length === 0) {
    text = element.getElementText();
  }
  else {
    for (const child of children) {
      if (window.DomUtils.isElementVisible(child)) {
        text += ' ' + getVisibleText(child);
      }
    }
  }

  return text ? text.trim() : '';
}

export default getVisibleText;
