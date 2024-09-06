import type { QWElement } from '@qualweb/qw-element';

function videoElementHasAudio(element: QWElement): boolean {
  return parseInt(element.getElementProperty('webkitAudioDecodedByteCount')) > 120;
}

export default videoElementHasAudio;
