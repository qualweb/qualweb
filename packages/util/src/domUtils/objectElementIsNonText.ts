import image from './image.json';
import video from './video.json';
import audio from './audio.json';

function objectElementIsNonText(element: typeof window.qwElement): boolean {
  const data = element.getElementAttribute('data');
  let result = false;
  if (data) {
    const splitted = data.split('.');
    if (splitted.length > 1) {
      const extension = splitted[splitted.length - 1];
      result = image.includes(extension) || video.includes(extension) || audio.includes(extension);
    }
  }
  return result;
}

export default objectElementIsNonText;
