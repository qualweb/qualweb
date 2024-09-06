import type { QWElement } from '@qualweb/qw-element';

function textHasTheSameColorOfBackground(element: QWElement): boolean {
  const color = element.getElementStyleProperty('color', '');
  const background = element.getElementStyleProperty('background-color', '');
  let text = element.getElementText();
  if (text) {
    text = text.trim();
  }
  return color === background && !!text;
}

export default textHasTheSameColorOfBackground;
