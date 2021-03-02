'use strict';

import { QWElement } from '@qualweb/qw-element';

function videoElementHasAudio(elementQW: QWElement): boolean {
  if (!elementQW) {
    throw Error('Element is not defined');
  }
  return Number.parseInt(elementQW.getElementProperty('webkitAudioDecodedByteCount')) > 0;
}

export default videoElementHasAudio;
