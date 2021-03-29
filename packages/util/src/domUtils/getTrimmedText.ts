function getTrimmedText(elementQW: typeof window.qwElement): string {
  let text = elementQW.getElementText();

  if (text) {
    text = text.trim();
  } else {
    text = '';
  }
  return text;
}

export default getTrimmedText;
