'use strict';

import { QWElement } from '@qualweb/qw-element';
import image from './image.json';
import video from './video.json';
import audio from './audio.json';

function objectElementisNonText(elementQW: QWElement): boolean {
  if (!elementQW) {
    throw Error('Element is not defined');
  }
  let data = elementQW.getElementAttribute('data');
  let result = false;
  if(!!data){
    let splitted = data.split(".");
    if(splitted.length > 1){
      let extension= splitted[splitted.length-1]
      result = image.includes(extension)|| video.includes(extension)|| audio.includes(extension);
    }   
  }
  return result;
}

export default objectElementisNonText;
