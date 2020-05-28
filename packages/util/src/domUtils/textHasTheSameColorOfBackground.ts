'use strict';
import { QWElement } from "@qualweb/qw-element";

function textHasTheSameColorOfBackground(elementQW: QWElement): boolean {
  if (!elementQW) {
    throw Error('Element is not defined');
  }
  const color = elementQW.getElementStyleProperty( 'color','');
  const background = elementQW.getElementStyleProperty( 'background-color','');
  let text = elementQW.getElementText();
  if(text)
    text = text.trim();
return color === background && !!text;
}

export default textHasTheSameColorOfBackground;
