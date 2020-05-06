'use strict';

import { QWElement } from "@qualweb/qw-element";

async function videoElementHasAudio(elementQW: QWElement): Promise<boolean> {
  if (!elementQW) {
    throw Error('Element is not defined');
  }
  return Number.parseInt(elementQW.getElementProperty('webikitAudioDecodedByteCount')) > 0;
}

export default videoElementHasAudio;