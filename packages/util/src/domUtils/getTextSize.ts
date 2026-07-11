import pixelWidth from 'string-pixel-width';

function getTextSize(font: string, fontSize: number, bold: boolean, italic: boolean, text: string): number {
  //firefox fix
  if (font === 'serif') {
    font = 'times new roman';
  } else if (font === 'sans-serif') {
    font = 'arial';
  } else if (font === 'times') {
    // Chromium reports the default serif font as "Times", which
    // string-pixel-width doesn't know but treats as Times New Roman.
    font = 'times new roman';
  }
  try {
    //@ts-ignore
    return pixelWidth(text, { font: font, size: fontSize, bold: bold, italic: italic });
  } catch (err) {
    return -1;
  }
}

export default getTextSize;
