'use strict';
import { QWElement } from "@qualweb/qw-element";

function elementHasOnePixel(elementQW: QWElement): boolean {
  if (!elementQW) {
    throw Error('Element is not defined');
  }
  const height = elementQW.getElementStyleProperty( 'height','');
  const background = elementQW.getElementStyleProperty( 'background-color','');
  let parent = elementQW.getElementParent();
  let parentBackGround;
  if(parent){
    parentBackGround = elementQW.getElementStyleProperty( 'background-color','');
  }
return !!height && height.replace(" ","") === "1px" && (parentBackGround === background || background === "transparent");
}

export default elementHasOnePixel;
