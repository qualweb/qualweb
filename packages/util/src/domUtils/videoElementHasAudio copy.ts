function videoElementHasAudio(element: typeof window.qwElement): boolean {
  return Number.parseInt(element.getElementProperty('webkitAudioDecodedByteCount')) > 0;
}

export default videoElementHasAudio;
