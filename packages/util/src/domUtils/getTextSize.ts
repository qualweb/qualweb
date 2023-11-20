import pixelWidth from 'string-pixel-width';

function getTextSize(font: string, fontSize: number, bold: boolean, italic: boolean, text: string): number {
  //firefox fix
  if (font === 'serif') {
    font = 'times new roman';
  } else if (font === 'sans-serif') {
    font = 'arial';
  }
  try {
    //@ts-ignore
    return pixelWidth(text, { font: font, size: fontSize, bold: bold, italic: italic });
  } catch (err) {
    return -1;
  }
}

export default getTextSize;
