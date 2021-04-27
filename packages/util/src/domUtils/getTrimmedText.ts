function getTrimmedText(element: typeof window.qwElement): string {
  let text = element.getElementText();

  if (text) {
    text = text.trim();
  } else {
    text = '';
  }
  return text;
}

export default getTrimmedText;
