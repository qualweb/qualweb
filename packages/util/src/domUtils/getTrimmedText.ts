import type { QWElement } from '@qualweb/qw-element';

function getTrimmedText(element: QWElement): string {
  let text = element.getElementText();

  if (text) {
    text = text.trim();
  } else {
    text = '';
  }
  return text;
}

export default getTrimmedText;
