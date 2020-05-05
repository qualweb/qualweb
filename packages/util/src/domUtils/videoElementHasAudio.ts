'use strict';

import getElementProperty from "./getElementProperty";
import { QWElement } from "../qwElement";

async function videoElementHasAudio(elementQW: QWElement): Promise<boolean> {
  if (!elementQW.elementHtml) {
    throw Error('Element is not defined');
  }
  return Number.parseInt(await getElementProperty(elementQW, 'webikitAudioDecodedByteCount')) > 0;
}

export default videoElementHasAudio;