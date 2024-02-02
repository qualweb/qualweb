function videoElementHasAudio(element: typeof window.qwElement): boolean {
  return parseInt(element.getElementProperty('webkitAudioDecodedByteCount')) > 120;
}

export default videoElementHasAudio;
